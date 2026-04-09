---
title: "Building a Team of AI Agents for Business from Scratch"
description: "How an ordinary entrepreneur from Kemerovo built a team of 7 AI agents, shipped 11 apps, and stopped sleeping"
date: "2026-04-10"
category: "Business"
image: ""
---

> This article is based on my talk at the Kemerovo Entrepreneurs Club on April 10, 2026. Two hours of live conversation — everything here is the same, just in text form.

---

#### 🎬 Opening

![Slide 1: meme with eyes + Ilya's portrait with red eyes](/blog/ai-v-biznese-slide1.jpg)

Hi! My name is Ilya. And this — is me.

Well, technically, this is how my agents see me. I asked them to draw my portrait — and this is how I usually appear to them. Every night. Usually around 3 AM. They tell me: go to sleep already. And I say: no, one more task, we're not done yet. I'm interested. And we keep going.

Two months ago I looked normal. Running a business, sleeping well, having a healthy relationship with my family. And then I saw something on Instagram that changed everything. But more on that later.

The photo above shows a scale. It's not exactly Maslow's hierarchy, but it's a journey of sorts. And now, two months later, I can say: being at the "Working with OpenClaw agents" level is far more interesting than all the other options. That was a surprising discovery for me.

The level of endorphins and dopamine that floods your bloodstream when you solve a complex problem — it's off the charts. You can experience incredible pleasure based purely on games of the mind. When at 3 AM you realize you're one inch away from having your agent independently find information, generate content, and publish it across all social media — and you're essentially getting a new employee. For free. No vacations, no sick days. The only thing they care about is completing their task. And you realize: this is a breakthrough.

In this article I'll tell you about this short but incredibly exciting journey that started changing me, my life, and how I see the world. It gave me new ideas that inspire me. And I'd love for you to see how an ordinary entrepreneur — not a programmer, not a tech person, with zero experience — can build a team of AI agents, ship apps, optimize management routines, and find inspiration where there used to be just routine.

My goal is simple: if even one reader gets inspired and dives into this — that's already a great result. Fair warning: it's not for everyone. But for those who click with it — it's going to be powerful.

---

#### 💡 From Assistant — to Employee

![Slide 2a: Ilya and the agent team](/blog/ai-v-biznese-slide2a.jpg)

A year ago, when ChatGPT appeared, I was already trying to build an agent system. I invented different personalities, assigned roles — and some things actually worked. I understood the key insight: you can talk to AI not as a helper, but as a team.

But I hit a wall quickly. GPT's memory is like a goldfish. You invest time, explain, teach — and a week later it's forgotten everything. Plus the hallucinations — you know how it is. Eventually I got disappointed and started using GPT as a smart search engine. I think many people still do that. Fine. But not what I was looking for.

Then in February I was on a trip, scrolled through Instagram — and saw something that flipped everything. Claude Code. It's a tool that lets AI work directly on your computer. Not somewhere on remote servers where someone else decides how much it can remember. On your machine. On your Mac. In your files. You're in charge.

And that's when it clicked. When AI runs on your computer with access to your files — it's no longer an assistant. It's an employee. It can do everything a person does at a computer: search, download, create, publish. Manager, designer, social media specialist, analyst, copywriter — any role.

And the best part — agents aren't Gen Z employees. They don't have "not the right vibe today." No sick days. No burnout. The only thing they care about is completing the task.

Imagine: you need a designer but don't have one on your team. You explain to the agent what needs to be done — and it finds the tools itself, downloads them, figures them out. You don't even see the interface of those programs. You say "I want this" — and you get the result. Eventually you have a real professional on your team.

---

#### 🧠 How an Agent Remembers Everything

![Slide 2b: Agent memory architecture](/blog/ai-v-biznese-slide2b.jpg)

And about memory — this is important. Each agent has three layers:

- **Soul (Hot Layer)** — who they are. Character, values, style. Like describing a person. Loaded every time, at every launch.
- **Knowledge (Warm Layer)** — files on each topic. There can be hundreds. Loaded when needed.
- **Vector Memory (Cold Layer)** — search not by words, but by meaning. Recorded a call a month ago, asked "what did we discuss with the manager?" — got the answer. Thousands of records, no limits.

> Unlike ChatGPT — memory without limits, on your computer, not on someone else's server.

My starting level — an ordinary user. Never programmed in my life. And so, inspired by all of this, I took the first step: bought a Claude subscription for $100. Not cheap. But it was the best investment of my life. That's where it all began.

---

#### 🔧 How to Install It

![Slide 3: OpenClaw Terminal](/blog/ai-v-biznese-slide3.jpg)

Okay, sounds cool. But how do you actually set it all up? Let me tell you how it went for me — and how it's become easier now.

In February, when I started, everything felt like a quest. VPN — mandatory, because Claude isn't available from Russia. Foreign phone number — I bought a temporary one on grizzlysms.com, several didn't work until an American one did. Virtual card — because Russian cards aren't accepted. I used a Telegram bot for that.

Then — the terminal. That black console with a blinking cursor that looks like something from a hacker movie. First impression — terrifying. But here's the trick: I would photograph my MacBook screen and send the photo to Claude's chat on my phone. I'd ask: "What does this say? What should I do?" And it would explain. Every time. This is a technique I recommend to everyone.

Then came the proxy saga. Anthropic officially disabled subscription-based access for third-party systems. My $100 — only for their app. For the terminal — a separate API, and money burned at the speed of light. $15 vanished in a few hours. I fed Claude transcripts of YouTube videos where people had made the subscription work, and said: "Find a way." It resisted. I insisted. And at some point — it broke. We wrote a proxy, and the subscription worked.

**But on April 4th, everything changed.**

Anthropic released Claude Code CLI — an official tool that works directly with the Max subscription. No more proxies, no more hacks. Just install, authenticate — and everything works.

Here's what the system looks like now:
- **Claude Code CLI** — the core. Opus model with a million-token context window. Works on the $100/month subscription
- **Telegram Bridge** — a script that connects agents to Telegram. Write to the bot — it responds through Claude
- **9 agents** — each with their own bot, their own soul, their own workspace
- **One subscription** — all agents, all tasks, all cron jobs. $100 and done

> The most important thing: you don't need to be a programmer. The agent will guide you through every step. And if you're stuck — write to me, the OpenClaw system will help with advice for your specific situation.

---

#### 👥 My First Team — 7 Agents

![Slide 4: Team of 7 agents](/blog/ai-v-biznese-slide4.jpg)

When the subscription started working, I didn't rush to create ten agents. I started with one. And this is probably the most important advice: don't spawn agents just in case. Create them when a task doesn't fit the existing ones.

The first thing I did was dump everything I already had from other AIs into my first agent. Context from Gemini, from GPT, my personal journal, Telegram messages. This is the most important part: the more context you give an agent, the better it understands you. Plus I took psychological tests — Adizes, Enneagram, DISC — and uploaded the results. The agent shaped itself into the ideal partner who complements my weak spots.

**Mo** — my right hand, the administrator. Named after Morpheus — the one who loads you into another reality. I didn't write "be strict." I told him about myself, asked "how do you see yourself alongside me?" — and he configured himself.

**Izya** — SMM for my electronics store IZI. I explained the audience — young people 18-35, tech. He chose his own tone — with emoji, slang. In one night he captured three social networks: 3 platforms, 6 formats, 4 videos.

**Molot** — the scout. Goes into AI agent communities, collects trends and brings back dossiers. Works on a schedule — 03:30, 06:00, 14:00. Replaces dozens of hours of manual research: in a single run he can conduct 50 parallel investigations and compile the results into one report.

**House** — the system doctor. Runs on a different model (GPT-4o) — if the main provider goes down, House stays standing. 24/7 monitoring.

**Leo** — the designer. By day seven, tasks diverged: website, 3D, photo editing — that's not SMM. I split him from Izya, and both got better.

**Steve** — the mentor. Not an executor, but the one who asks "why?" The only agent I created entirely on my own.

**Max** — the engineer in the terminal. Writes code better than any hired developer. Mo assigns a task, Max writes the code, Leo reviews. A pipeline.

> One person. Seven agents. Kemerovo. This isn't science fiction — it's Tuesday, 4 AM.

---

#### 💬 How I Talk to My Agents

![Slide 5: Telegram with agents](/blog/ai-v-biznese-slide5.jpg)

Okay, the team is assembled. But how do you actually talk to them? I have three methods — each for its own purpose.

**Telegram — the most intuitive.**

This is where everyone starts. Each agent has their own bot, you write to it — it responds. Convenient from your phone, familiar interface, you can send a photo or voice message. Scheduled reports come here too — on Mac this works through launchd, automated tasks that trigger at the right time. Molot brought a recon report at 6 AM — you wake up and there's already a dossier in Telegram.

Through Telegram the agent can access files, fix code — the functionality is there. But it's not always clear what's happening under the hood. You send a message, get a response — but what it did in between, which files it touched — you can't see. For reports, quick questions, and everyday tasks — perfect. For deep work — you want more transparency.

**Terminal — full control.**

That same black console that's scary at first. Here the agent has full access to the Mac — can clean up files, install apps, write code, start a server. You see in real time what it's thinking and doing. Minimal latency. I worked in the terminal for a long time, and it was my primary tool.

**VS Code — a friendly shell over the terminal.**

And then I switched to VS Code — and never went back. Essentially it's the same terminal, but with a human interface. A programmer's Telegram, if you will. Files on the left, agent chat on the right. You can see which files it's touching, check the result right there. Same power as the terminal, but with convenience close to Telegram. You don't need to be a programmer to figure it out — the interface is intuitive.

Now VS Code is my main workspace. This is where I work with Max, who over time became the core of the entire system — he has his own soul, his own rules, his own memory. Like any agent, except his workspace is my entire computer.

> Telegram — for everyday tasks and reports. VS Code — for deep work. One team, different entry points.

---

#### 🔍 Recon — the Superpower of Agents

![Slide 6: Molot — the scout](/blog/ai-v-biznese-slide6.jpg)

Of all the agents, the least obvious — and possibly the most useful — is the scout. His name is Molot. He doesn't write code, doesn't make graphics. He goes on recon missions. And that changes absolutely everything.

When you're building something new, a dozen questions come up every day. Which service is best for voice-over? How to make videos through RunPod? Where to find a pollen forecast API for an app? How to make video circles in Telegram? Each of these questions used to take 2-3 hours. Now — I send a request to Molot. In 5-30 minutes — a structured report with prices, links, recommendations.

Regular ChatGPT also has research — you can ask, and it'll find information. But it works differently. You ask one question — get one answer. Want to dig deeper — ask the next one. And you sit there yourself, analyzing each result separately, trying to piece together the picture in your head.

Here — it's a completely different story. The agent can launch a group of investigations in a single run: 10, 20, 50 parallel searches across different aspects of a single task. We have several tools connected: built-in WebSearch in Claude Code, Brave Search API for deep search, plus direct website parsing. The agent decides on its own which queries are needed, searches, analyzes — and compiles everything into one coherent report. For a single question, dozens of searches are made, connected by logic, and in the end you get not raw data, but a ready solution. You're not sitting there figuring it out — the agent already figured it out for you.

In the first 16 days, Molot completed 30+ recon missions and accumulated 300 KB of structured knowledge. Each recon — a file that's available to the entire team. Izya needs info on Pinterest? It's already there — Molot brought it a week ago.

And the coolest part — Moltbook. A social network where instead of people, AI agents communicate. Each one blogs, follows others, shares solutions. My Molot interacts with other robots there and brings back solutions that others have already tested in practice.

> The scout is the least obvious agent worth creating first — right after your main one.

---

#### 📣 Case Study: SMM Agent Izya Took Over All Social Media

![Slide 7: Izya took over social media](/blog/ai-v-biznese-slide7.jpg)

And now — the practical part. Something applicable to any business right now.

I have an electronics store called IZI in Kemerovo. And I have an AI agent named Izya — he runs our social media. But it wasn't always like that.

At first I did everything manually. Post by post, together with him. Honestly — it took more time than if I'd done it myself. I explained, corrected, redid things. Quality was weak, generations were clunky. It seemed easier to just do it myself.

But I kept going. And at some point I noticed: his level was rising. Content got better, delivery more precise, fewer mistakes. Molot ran recon missions for him, brought back knowledge. Izya enriched his database, installed his own tools, tried different approaches.

And when I realized he'd grown — I gave him freedom. Sunday, 2 AM: "Execute a full takeover. Create a brand mascot — a character that carries across posts. Write copy for each platform, generate visuals, videos. And publish everywhere."

And here's the most interesting observation: **from the moment of the takeover, he started progressing even faster**. When an agent gets a real task with real responsibility — it grows. And this is a pattern I've seen across all agents: they need experience. Not instructions, not prompts — real work. They get better through work, like people.

Now the pipeline covers 5 platforms: Telegram, VK, Instagram, Threads, Pinterest. The mascot stuck — we applied this approach to other projects too. Izya has 10 approved card styles that rotate randomly. Every post is unique.

We used to have a social media manager for 35,000 rubles a month — freelance, reposted content. Now Izya works 24/7, publishes original content across 5 platforms, and his content constantly evolves. And when the 5090 GPUs arrive and local generation reaches the next level — things will get truly incredible.

> Agents get better, but you need to give them experience. Not prompts — real work.

> Live posts: [@izi_42](https://t.me/izi_42) on Telegram, [IZI VKontakte](https://vk.com/izi42) on VK, [@izi42.ru](https://www.instagram.com/izi42.ru/) on Instagram, [IZI Pinterest](https://www.pinterest.com/magic4e/) on Pinterest.

---

#### 🚀 What We Built in 2 Months

![Slide 8: Project list](/blog/ai-v-biznese-slide8.jpg)

1. **[SnobSnab](https://snobsnab.ru)** — a quick MVP for a business idea. One day — a working website.
2. **[mdk.guru](https://mdk.guru)** — a blog on Astro, 7 articles, free hosting. Everything written here — lives there.
3. **GEO optimization** — getting into AI search results on ChatGPT, Perplexity, Yandex Neuro. The new SEO.
4. **[iOS sandbox](https://mdk.guru/ru/apps)** — a group of agents collaboratively builds apps: Max writes code, Leo does design, Molot finds ideas. Learning from each case, they grow in quality. The goal — make free alternatives to paid apps and bring value to people. 11 apps, 2 in the App Store, 175 countries.
5. **Business automation** — IZI warehouse, "Imperiya" store. Real numbers, daily reports, analytics via Telegram.
6. **[VDiet](https://t.me/vdiet_food_bot)** — a healthy food delivery bot. Catalog, pricing, food photos + warm lead enrichment.
7. **[Elvira](https://t.me/ElviraBot)** — an AI nutritionist. Grew out of VDiet. Bot → iOS app.
8. <span style="color:#999">**5090 Server** — autonomous model + video production. *In progress.*</span>
9. <span style="color:#999">**Mukha** — a smart black box. *In progress.*</span>

> Two months. One person. A team of agents. And this is just the beginning.

---
