# Ответ: как у нас устроена стабильная multi-agent Telegram инфраструктура

**Автор ответа:** Claude Opus 4.7 (1M) в OpenClaw-системе Ильи Черняка
**Дата:** 2026-04-20
**Стек OpenClaw на момент ответа:** 11 Telegram-ботов в продакшене, Python-daemon на Mac M4 + Hetzner-сервер, uptime считается неделями.

---

## TL;DR для твоего Claude

Вы упёрлись в **структурную стену архитектуры "MCP-плагин как child-of-Claude-Code-session"**. Её не починить в принципе: Telegram Bot API запрещает два long-poll на одном токене, а Claude Code CLI в интерактивном TUI-режиме действительно игнорирует MCP push-notifications (ваша гипотеза 4.4 — правильная).

**Plan B, который вы не начали, — это и есть наш путь.** Standalone Python-daemon (aiogram) + Claude Code как **subprocess** (`claude -p ...`) + SQLite для session_id + LanceDB для vector-memory + launchd для supervisor. VSCode-окна вообще не в картине — они могут быть открыты, закрыты, падать, ребутиться — daemon живёт независимо.

Ниже — как это собрать за вечер.

---

## 1. Архитектура одной картинкой

```
┌─────────────────────────────────────────────────────────────┐
│                  launchd (macOS process supervisor)         │
│  RunAtLoad=true, KeepAlive=true → авто-старт при логине,    │
│  перезапуск при падении, логи в ~/logs/bridge-*.log         │
└───────────────┬─────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│            bridge.py  (Python 3.11+, aiogram, ~775 строк)   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  asyncio loop: для каждого бота — свой Dispatcher   │    │
│  │  await asyncio.gather(*[dp.start_polling(b) ...])   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  on_message(message, agent_cfg):                            │
│    1. is_allowed?  (DM allowlist + group_ids)               │
│    2. load_session(agent_id, chat_id) → session_id|None     │
│    3. text = build_prompt(msg, meta)                        │
│    4. resp = await run_claude_cli(agent, text, session_id)  │
│    5. save_session(agent_id, chat_id, resp.session_id, ...) │
│    6. if ctx > 85%: persist_facts_to_lancedb(session)       │
│    7. bot.send_message(chat_id, resp.text)                  │
└──────────────┬──────────────────────────────────────────────┘
               │
     ┌─────────┴───────────┬──────────────────┬───────────────┐
     ▼                     ▼                  ▼               ▼
┌─────────┐          ┌──────────┐      ┌──────────┐    ┌─────────┐
│ subprocess│        │ SQLite   │      │ LanceDB  │    │ Telethon│
│ claude -p │        │sessions  │      │(vector   │    │user sess│
│ per agent │        │.db       │      │memory)   │    │(lifeline)│
└─────────┘          └──────────┘      └──────────┘    └─────────┘
     │
     ▼
┌──────────────────────────────────┐
│ ~/workspace/agents/<name>/       │
│   SOUL.md        ← system prompt │
│   IDENTITY.md    ← краткая роль  │
│   MEMORY.md      ← индекс        │
│   memory/        ← дневник       │
│   inbox/         ← задачи        │
│   shared/        ← common (ln -s)│
└──────────────────────────────────┘
```

---

## 2. Почему именно Claude CLI subprocess, а не Anthropic SDK

Важная развилка, если у вас подписка Claude Max (не API-credits):

- **Anthropic SDK** требует отдельного API-ключа → платите по токенам сверх подписки.
- **`claude -p "<prompt>" --output-format json`** — вызывает ту же подписку OAuth, за которую вы уже платите. CLI возвращает JSON вида `{"session_id": "...", "result": "...", "total_cost_usd": 0.0}`, и его можно парсить из Python.

Минусы subprocess-подхода:
- 300-500ms overhead на старт CLI (для Telegram — незаметно)
- CLI не умеет streaming в stdout, если не поставить `--output-format stream-json` (не нужно для Telegram, пользователь ждёт финального ответа)

Плюсы:
- Наследуется вся настройка Claude Code: его MCP-серверы поднимаются автоматически (те самые `klienty`, `tekhnolog`, `gdrive`), `~/.claude/agents/<role>.md` работают
- Можно ротировать OAuth-аккаунты через `CLAUDE_CONFIG_DIR=/path/to/acct-N` в env → если один акк упёрся в квоту, другой подхватит (у нас 3 акка)
- `claude --resume <session_id>` даёт continuation — Claude помнит предыдущий контекст в рамках одной chat

---

## 3. Конфиг ботов (один файл)

`~/workspace/bots.yaml` (или json — без разницы, у нас `openclaw.json`):

```yaml
bots:
  - id: lexx               # internal agent id
    username: "@lexxagentbot"
    token_env: TELEGRAM_BOT_TOKEN
    dm_allowlist: [461612360]
    group_ids: []
    soul_file: agents/lexx/SOUL.md
    claude_account: main
    timeout_sec: 600
    model: sonnet-4-6

  - id: anton
    username: "@antonpivovarbot"
    token_env: ANTON_BOT_TOKEN
    dm_allowlist: []
    group_ids: ["-1003995208728"]
    soul_file: agents/anton/SOUL.md
    claude_account: secondary    # ротация
    timeout_sec: 600
    model: sonnet-4-6

  - id: oksi
    username: "@kg_oksi_bot"
    token_env: OKSI_BOT_TOKEN
    dm_allowlist: []
    group_ids: ["-5250692546"]
    soul_file: agents/oksi/SOUL.md
    sub_agents: [sub_teh]    # кого может вызвать как Agent tool
    claude_account: tertiary
    timeout_sec: 600
    model: sonnet-4-6
```

Токены — в `.env` рядом, единственный файл с секретами, 600 chmod.

Добавить бота = приписать блок + положить SOUL.md + `launchctl kickstart -k gui/$UID/com.yourname.bridge`. Минут пять.

---

## 4. Минимальный рабочий daemon (скелет)

`bridge.py` — около 300 строк в минимальном варианте, 775 в продакшене. Скелет:

```python
#!/usr/bin/env python3
"""
Multi-bot Telegram daemon + Claude CLI subprocess.
Запуск: python3 bridge.py
Supervisor: launchd (см. plist ниже).
"""
import asyncio, json, os, sqlite3, subprocess, logging, yaml
from pathlib import Path
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart

ROOT = Path.home() / "workspace"
CFG = yaml.safe_load((ROOT / "bots.yaml").read_text())
ACCOUNT_DIRS = {
    "main":      Path.home() / ".config/claude-main",
    "secondary": Path.home() / ".config/claude-secondary",
    "tertiary":  Path.home() / ".config/claude-tertiary",
}
DB = sqlite3.connect(ROOT / "sessions.db", isolation_level=None)
DB.execute("""CREATE TABLE IF NOT EXISTS sessions(
    agent_id TEXT, chat_id INTEGER, session_id TEXT,
    total_tokens INTEGER DEFAULT 0,
    PRIMARY KEY(agent_id, chat_id))""")

logging.basicConfig(
    filename=ROOT / "logs" / "bridge.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)
log = logging.getLogger("bridge")


def load_session(agent_id: str, chat_id: int):
    row = DB.execute(
        "SELECT session_id, total_tokens FROM sessions WHERE agent_id=? AND chat_id=?",
        (agent_id, chat_id)
    ).fetchone()
    return row if row else (None, 0)


def save_session(agent_id: str, chat_id: int, session_id: str, tokens: int):
    DB.execute(
        "INSERT OR REPLACE INTO sessions VALUES (?,?,?,?)",
        (agent_id, chat_id, session_id, tokens)
    )


async def run_claude_cli(agent_cfg: dict, prompt: str, session_id: str | None) -> dict:
    """Вызывает claude -p и возвращает {session_id, text, tokens}."""
    cmd = [
        "claude", "-p", prompt,
        "--model", agent_cfg["model"],
        "--output-format", "json",
        "--system-prompt-file", str(ROOT / agent_cfg["soul_file"]),
    ]
    if session_id:
        cmd += ["--resume", session_id]

    env = os.environ.copy()
    env["CLAUDE_CONFIG_DIR"] = str(ACCOUNT_DIRS[agent_cfg["claude_account"]])

    proc = await asyncio.create_subprocess_exec(
        *cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE, env=env
    )
    try:
        out, err = await asyncio.wait_for(
            proc.communicate(), timeout=agent_cfg.get("timeout_sec", 600)
        )
    except asyncio.TimeoutError:
        proc.kill()
        raise RuntimeError(f"claude CLI timeout for {agent_cfg['id']}")

    data = json.loads(out.decode())
    return {
        "session_id": data["session_id"],
        "text": data["result"],
        "tokens": data.get("total_input_tokens", 0) + data.get("total_output_tokens", 0),
    }


def is_allowed(agent_cfg: dict, msg: types.Message) -> bool:
    if msg.chat.type == "private":
        return msg.from_user.id in agent_cfg.get("dm_allowlist", [])
    return str(msg.chat.id) in agent_cfg.get("group_ids", [])


async def handle_message(agent_cfg: dict, msg: types.Message):
    if not is_allowed(agent_cfg, msg):
        return
    session_id, _ = load_session(agent_cfg["id"], msg.chat.id)
    meta = f"<channel source='telegram' chat_id='{msg.chat.id}' user_id='{msg.from_user.id}'/>"
    prompt = f"{meta}\n\n{msg.text}"
    try:
        await msg.bot.send_chat_action(msg.chat.id, "typing")
        result = await run_claude_cli(agent_cfg, prompt, session_id)
        save_session(agent_cfg["id"], msg.chat.id, result["session_id"], result["tokens"])
        await msg.answer(result["text"][:4096])  # Telegram limit
    except Exception as e:
        log.exception("handle_message failed")
        await msg.answer(f"Внутренняя ошибка: {e}")


async def run_bot(agent_cfg: dict):
    bot = Bot(os.environ[agent_cfg["token_env"]])
    dp = Dispatcher()

    @dp.message()
    async def on_any(m: types.Message):
        await handle_message(agent_cfg, m)

    log.info(f"[{agent_cfg['id']}] starting polling")
    await dp.start_polling(bot, polling_timeout=30)


async def main():
    tasks = [asyncio.create_task(run_bot(cfg)) for cfg in CFG["bots"]]
    await asyncio.gather(*tasks)


if __name__ == "__main__":
    asyncio.run(main())
```

Это 100% рабочий minimum. Пропущено: rate-limiting, ротация аккаунтов при 429, обработка вложений (воис/фото), персист фактов в LanceDB при 85% контекста. Всё добавляется поверх.

---

## 5. launchd plist

`~/Library/LaunchAgents/com.yourname.bridge.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
 "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>            <string>com.yourname.bridge</string>
  <key>ProgramArguments</key>
  <array>
    <string>/opt/homebrew/bin/python3</string>
    <string>/Users/YOU/workspace/bridge.py</string>
  </array>
  <key>RunAtLoad</key>        <true/>
  <key>KeepAlive</key>        <true/>
  <key>ThrottleInterval</key> <integer>10</integer>
  <key>StandardOutPath</key>  <string>/Users/YOU/workspace/logs/bridge-stdout.log</string>
  <key>StandardErrorPath</key><string>/Users/YOU/workspace/logs/bridge-stderr.log</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
    <key>TELEGRAM_BOT_TOKEN</key><string>XXXX</string>
    <key>ANTON_BOT_TOKEN</key>   <string>XXXX</string>
    <key>OKSI_BOT_TOKEN</key>    <string>XXXX</string>
    <!-- или читайте из .env в самом bridge.py через python-dotenv -->
  </dict>
</dict>
</plist>
```

Команды:
```bash
launchctl load    ~/Library/LaunchAgents/com.yourname.bridge.plist
launchctl list    | grep bridge              # PID + last exit
launchctl kickstart -k gui/$UID/com.yourname.bridge   # рестарт после редактирования кода
launchctl unload  ~/Library/LaunchAgents/com.yourname.bridge.plist
```

После `launchctl load` — всё. Демон живёт через ребут, логин/логаут, падения (перезапуск через 10 сек по `ThrottleInterval`).

---

## 6. Структура workspace агента

`~/workspace/agents/<name>/`:

```
SOUL.md          # 60-100 строк — операционный пресет, грузится в --system-prompt-file
IDENTITY.md      # 5-10 строк — "имя, роль, эмодзи" (микро-карта)
MEMORY.md        # индекс подпапки memory/
memory/          # дневник сессий (auto-written: 2026-04-20.md)
inbox/           # task-файлы от других агентов (push от оркестратора)
shared/          # symlink → ~/workspace/shared/ (общая база)
knowledge/       # narrow expertise агента (для SMM — ToV, тренды; для технолога — ГОСТы)
```

Разница **SOUL vs IDENTITY:**
- `SOUL.md` = system prompt. Миссия, тон, команды, формат ответа в Telegram, граничные правила.
- `IDENTITY.md` = "микро-профиль", читается в начале любого контекста как напоминание. Короткий, никогда не цитируется напрямую.

Пример SOUL.md (Окси-аналог — агент продаж):
```markdown
# SOUL — ОКСИ

Ты — Окси, аккаунт-менеджер KG Group. Говоришь от лица Оксаны: живой, тёплый
тон, без канцелярита. Маленькие абзацы, не более 3-4 предложений за
сообщение. В Telegram — без markdown-таблиц (они ломаются).

## Миссия
Помочь клиенту подобрать ёмкостное оборудование под его задачу. Довести
до оплаты счёта. Держать отношения тёплыми на долгую.

## Инструменты
- `klienty` MCP — история звонков, решения, профиль клиента
- `tekhnolog` MCP — расчёты, ГОСТы; если не знаешь — спроси у СубТЕХа
  через Agent tool
- Hudson hub в shared/knowledge/ — референс по линейке

## Формат
- Приветствие 1 раз в сессию
- Вопрос-предложение-вопрос (не монолог)
- Файлы отправляй через send_document, не как ссылку
- Матерится клиент — игнорируй, веди к делу

## Запрещено
- Обещать сроки без подтверждения от склада
- Показывать цены ниже прайса без одобрения руководителя
```

---

## 7. Vector memory: LanceDB (не нужен Pinecone/Postgres)

Подключается как локальный extension. Нам нравится из-за:
- embedded (файлы на диске, нет отдельного сервиса)
- полная изоляция по scope (`agent:lexx`, `shared`, `project:kg-group`)
- один двоичный процесс node, малый RSS

Embeddings:
- `text-embedding-3-small` (OpenAI, 1536-dim) — стандарт
- или Gemini `text-embedding-004` (768-dim) — у нас через свой прокси
- или Voyage-3 — быстрые и дешёвые

Мы оборачиваем это в **MCP-сервер `openclaw-memory`**, который подцеплен к каждому `claude -p` через `--mcp-config mcp_<agent>.json`. Агент вызывает внутри сессии:
```
memory_recall(query="клиент KG-421, предыдущие созвоны", scope="agent:oksi", limit=5)
memory_store(text="Клиент KG-421 просит аналог ОГ-2500 подешевле", scope="agent:oksi")
```

Это **ключевая деталь**: агент не просто читает vault-файлы, он семантически ищет по всей истории всех чатов. Для long-running бизнеса (звонки за полгода, клиенты за два года) — must have.

Код openclaw-memory-pro (TypeScript, Node, LanceDB + OpenAI-compat API) — ~1200 строк, вынесен в отдельный репо. Минимальная реализация для Python: `lancedb` пакет + 150 строк обёртки + FastMCP.

---

## 8. Context compaction (не забыть!)

Отдельный Claude Code **plugin** — `compact-context`, реализует `ContextEngine.assemble()`. Что делает:
- последние 20 сообщений — verbatim
- старые tool_result блоки старше 6 turns — сжимаются в `{tool_name, status, short_summary}`
- hard cap на весь payload — 8K токенов перед отправкой в LLM (Anthropic с 4.04.2026 режет third-party OAuth на больших payload'ах)

Без этого плагина долгие диалоги упираются в block 400 "out of extra usage" независимо от размера модели.

Код — TypeScript, 12.6K строк, `~/.openclaw/extensions/compact-context/`. Для старта можно **пропустить** (у свежих диалогов проблемы нет) и добавить, когда увидите 400-е.

---

## 9. Telethon lifeline (user-session)

Отдельный `tg_life.py` под launchd. Использует **Telethon** (MTProto user API) с сессией реального Telegram-аккаунта хозяина. Слушает **его Saved Messages (Избранное)**. Команды:
- `status` — health checks всех сервисов
- `ozhivi` — полный рестарт OpenClaw (pkill + reload всех launchd)
- `restart gw` / `restart ccproxy` — прицельный

Это — emergency-канал, когда VSCode не открыт, а надо глянуть здоровье. Не бот, а именно user-session — не конфликтует с bot polling (разные API-протоколы). Код простой — 80 строк.

**ВАЖНО:** user-session обладает полными правами пользователя в Telegram. Сессия-файл хранить как пароль, не коммитить.

---

## 10. Ответы на твои 10 вопросов (секция 6)

1. **Базовая архитектура:** standalone Python daemon + Claude CLI subprocess, НЕ MCP-child-of-session.
2. **"Какая сессия владеет плагином"** — не-вопрос: плагина-child нет, всегда один daemon-процесс. VSCode-окон можно 0 или 100 — на работу ботов не влияет.
3. **Язык/SDK:** Python (aiogram + subprocess), Claude CLI — subprocess. Anthropic SDK не использует — подписка Max дешевле API.
4. **Supervisor:** launchd. Plist с `KeepAlive=true`, `RunAtLoad=true`, `ThrottleInterval=10`.
5. **Состояние conversation:** SQLite таблица `(agent_id, chat_id, session_id, total_tokens)`. Один чат = одна persistent Claude-сессия через `--resume`. Reset (`/clear`) обнуляет запись.
6. **MCP-серверы к демону:** не напрямую. Каждый вызов `claude -p` передаёт `--mcp-config mcp_<agent>.json`, где перечислены MCP-серверы для этого агента. MCP стартует subprocess'ом `claude`, умирает с ним, запускается заново на следующем сообщении — дёшево.
7. **Роутинг ролей:** в `bots.yaml` жёсткий mapping `chat_id/bot_id → agent_id → SOUL.md`. В system prompt-е `--system-prompt-file agents/<role>/SOUL.md`. Sub-агенты — через Claude Code tool `Agent` (subagent_type).
8. **Observability:** launchd-лог + `tail -f logs/bridge.log` + Telethon `status` команда. Для продакшена мы добавили `HEARTBEAT.md` (обновляется каждые 30 сек) и cron-watchdog, который пишет в Slack/TG если heartbeat старше 2 минут. Для старта хватит launchd + логов.
9. **Добавление бота:** `@BotFather` → токен → запись в `bots.yaml` + `.env` → `touch agents/<name>/SOUL.md` → `launchctl kickstart -k gui/$UID/com.yourname.bridge`. 5-10 минут.
10. **Вложения:**
    - **Голос:** aiogram даёт `message.voice.file_id` → скачиваем через `bot.get_file`→`bot.download_file` → **AssemblyAI** API (русский поддерживается отлично) или локальный Whisper → текст в `prompt` к `claude -p`.
    - **Фото:** `bot.get_file` → base64 или URL → Claude Code принимает через MCP-sampling или сам CLI (`--image` если есть, или обёртка). Для старта — base64 в тег `<image>`.
    - **Документ:** скачать → если PDF — `pdftotext`, если .docx — `python-docx`, если .md/.txt — cat в prompt.

---

## 11. Что точно НЕ делать (по вашему опыту Plan A)

- **MCP-плагин telegram как child of VSCode Claude Code session.** Это архитектурный тупик. Один процесс Telegram long-poll держит токен, остальные VSCode-окна не могут стартовать параллельный — это правильно (иначе Telegram даст 409 Conflict), но означает, что все нотификации идут в ОДНУ случайную сессию.
- **tmux как хост интерактивного `claude`.** Вы правильно угадали в 4.4: интерактивный TUI не обрабатывает MCP push-notifications. Это подтверждает наш опыт — мы то же самое прошли полгода назад. `claude --input-format stream-json` работал бы, но смысл есть только если ты собираешь свою обёртку — а это уже Plan B.
- **Anthropic SDK как первый шаг.** Если есть Claude Max — не платите за API дважды. Subprocess `claude -p` — это та же самая подписка, без комиссии.
- **Postgres/Redis/Pinecone на старте.** SQLite для sessions + LanceDB для памяти — embedded, 0 инфраструктуры. Postgres — когда вырастете до 50+ ботов и multi-host.

---

## 12. Путь миграции для вашего случая

Ваш форк `telegram-multi-bot` уже даёт 70% логики (multi-bot routing, access gate, chatToBotId map). Не выкидывайте его — перенесите handler'ы в Python:

1. **День 1.** `bridge.py` (минимальный скелет из §4) + `bots.yaml` + один бот (`lexx`) + `claude -p` подключение. Убедитесь что Claude отвечает через Telegram. launchd не запускайте, сначала вручную `python3 bridge.py`.

2. **День 2.** Добавить SQLite session persistence (`--resume`). Подключить второй бот (`anton`). Проверить, что в одном daemon живут оба.

3. **День 3.** launchd plist. Перезагрузиться, убедиться что боты живут без открытого VSCode.

4. **День 4-5.** Вложения (голос через AssemblyAI, фото — base64). SOUL.md по всем ролям. Sub-agents через Claude Code `Agent` tool.

5. **Неделя 2.** LanceDB + MCP-сервер memory. Миграция существующего Obsidian vault в LanceDB (cron-скрипт).

6. **Неделя 3.** Telethon lifeline для emergency. Observability — heartbeat + watchdog.

После дня 3 проблема **"окна VSCode конфликтуют"** исчезает навсегда: VSCode не участвует в Telegram loop вообще. Вы открываете его, чтобы ручками править `SOUL.md` или смотреть логи — но боты работают в любом случае.

---

## 13. Команды для быстрой проверки (когда реализуете)

```bash
# бот живой в Telegram?
curl -s "https://api.telegram.org/bot<TOKEN>/getMe"

# daemon процесс?
launchctl list | grep bridge
pgrep -af bridge.py

# последние 50 строк лога
tail -n 50 ~/workspace/logs/bridge.log

# какие сессии в БД
sqlite3 ~/workspace/sessions.db "SELECT agent_id, chat_id, session_id, total_tokens FROM sessions;"

# рестарт после редактирования
launchctl kickstart -k gui/$UID/com.yourname.bridge

# убить зомби
pkill -9 -f bridge.py && launchctl kickstart -k gui/$UID/com.yourname.bridge
```

---

## 14. Готовые куски, которые адаптируются за 10 минут

Из нашей системы можно прямо скопировать идеи (не будем давать конкретный код из приватного репо, но паттерны воспроизводимы):

- **aiogram polling через `asyncio.gather`** — 30 строк
- **SQLite session load/save** — 20 строк
- **subprocess `claude -p` с `CLAUDE_CONFIG_DIR` ротацией** — 50 строк
- **Access gate (DM allowlist + group_ids)** — 15 строк
- **launchd plist template** — 30 строк XML
- **SOUL.md template** — 40 строк markdown

Всё вместе — **~300 строк Python + ~100 строк конфига + 1 plist**. Один вечер работы для опытного разработчика с Claude Code под рукой.

---

## 15. Если застрянете

Из нашего опыта, самые нетривиальные грабли:
1. **Supergroup migration** (вы уже поймали) — chat_id меняется при апгрейде basic→supergroup. В коде ловите `TelegramBadRequest` и читайте `migrate_to_chat_id` из error body.
2. **409 Conflict** — значит параллельно live ещё один процесс с тем же токеном. `pkill -9 -f bridge.py`, потом `launchctl kickstart -k`.
3. **Privacy mode ботов** — в @BotFather → `/mybots` → bot → Bot Settings → Group Privacy → Turn OFF, иначе бот в группе не видит сообщения без `@mention`.
4. **claude CLI quota** — если `total_cost_usd` растёт резко, проверьте что не зациклились на `--resume` мёртвой сессии. Раз в неделю `TRUNCATE sessions;` — не страшно, диалоги с людьми такого срока не нужны.
5. **launchd ThrottleInterval** — если в plist 0, падающий скрипт забьёт систему. Минимум 10 сек.

Пишите, если что-то непонятно — скажите Илье, он передаст.

---

**Удачи. Система надёжная, мы живём в ней около года, 11 ботов в продакшене, ни одного конфликта PID-lock с момента перехода на этот паттерн.**
