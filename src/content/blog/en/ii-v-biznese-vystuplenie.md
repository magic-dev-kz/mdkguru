---
title: "Building a Team of AI Agents for Business from Scratch"
description: "How an ordinary entrepreneur from Kemerovo built a team of 7 AI agents, shipped 11 apps, and stopped sleeping"
date: "2026-04-10"
category: "Business"
image: "/blog/ai-v-biznese-slide1.jpg"
---

> This article is based on my talk at the Kemerovo Entrepreneurs Club on April 10, 2026. Two hours of live conversation — everything here is the same, just in text form.

#### 🎬 The Opening

![Slide 1: meme with eyes + Ilya's portrait with red eyes](/blog/ai-v-biznese-slide1.jpg)

Hey! My name is Ilya. And this — is me.

Well, more precisely, this is how my agents see me. I asked them to draw my portrait — and this is how I usually appear to them. Every night. Usually around 3 AM. They're already telling me: go to sleep. And I'm like: no, one more task, we're not done yet. I'm hooked. And we keep going.

Two months ago I looked normal. Running my business, sleeping well, having a healthy relationship with my family. And then I saw something on Instagram that changed everything. But more on that later.

The photo above has a scale. It's not exactly Maslow's hierarchy, but it's a journey of its own. And now, two months in, I can tell you: being at the "Working with OpenClaw agents" level is way more interesting than any of the other options. And that was a wild discovery for me.

The level of endorphins and dopamine that hits your bloodstream when you solve a hard problem — it's off the charts. You can get unreal pleasure just from the games your mind plays. When at 3 AM you realize you're an inch away from having your agent find information on its own, generate content, and post it across all social media — and you're basically getting a new employee. For free. No vacations, no sick days. The only thing they care about is getting the job done. And you think: this is a breakthrough.

In this article I'll tell you about this short but incredibly exciting journey that started changing me, my life, and the way I see the world. It gave me new ideas that inspire me. And I'd love for you to see how an ordinary entrepreneur — not a programmer, not a tech guy, with zero experience — can build a team of AI agents, ship apps, optimize management routines, and find inspiration where there used to be nothing but grind.

My goal is simple: if even one reader gets inspired and dives into this — that's already a great result. Fair warning: this isn't for everyone. But for those who vibe with it — it's going to be powerful.

---

#### 💡 From Assistant to Employee

![Slide 2a: Ilya and the agent team](/blog/ai-v-biznese-slide2a.jpg)

About a year ago, when ChatGPT came out, I was already trying to build an agent system. I came up with different personalities, assigned roles — and some of it actually worked. I understood the key thing: you can talk to an AI not as a helper, but as a team.

But I hit a wall fast. GPT's memory is like a goldfish. You invest time, explain things, teach it — and a week later it's forgotten everything. Plus the hallucinations — yeah, you know. In the end I got disillusioned and started using GPT just as a smart search engine. I think a lot of people are still doing that. Fair enough. But it's not the real deal.

Then in February I was traveling, scrolling Instagram — and saw something that flipped everything. Claude Code. It's a thing that lets AI work directly on your computer. Not somewhere on remote servers where someone else decides how much you can remember. On yours. On your Mac. In your files. You're in charge.

And that's when it clicked. When AI lives on your machine and has access to your files — it's no longer an assistant. It's an employee. It can do everything a human does at a computer: search, download, create, publish. Manager, designer, social media person, analyst, copywriter — any role.

And the best part — agents aren't zoomers. They don't have "bad vibes today." No sick days. No burnout. The only thing they care about is completing the task.

Imagine: you need a designer, but there's no one on the team. You explain to an agent what needs to be done — and it finds the tools itself, downloads them, figures things out. You don't even see the interface of those programs. You say "I want this" — you get the result. Over time you've got a real professional on your team.

---

#### 🧠 How an Agent Remembers Everything

![Slide 2b: Agent memory architecture](/blog/ai-v-biznese-slide2b.jpg)

And about memory — this is important. Each agent has three layers:

- **Soul (Hot Layer)** — who they are. Personality, values, style. Like describing a person. Loaded every time, on every launch.
- **Knowledge (Warm Layer)** — files on each topic. There can be hundreds. Loaded when needed.
- **Vector Memory (Cold Layer)** — search not by words, but by meaning. Recorded a call a month ago, asked "what did we talk about with the manager?" — got an answer. Thousands of entries, no limits.

> Unlike ChatGPT — memory with no limits, on your machine, not on someone else's server.

My level at the start — regular user. Never programmed a thing. And so, inspired by all of this, I took the first step: bought a Claude subscription for $100. Not cheap. But it was the best investment of my life. That's where it all began.

---

#### 🔧 How to Set It Up

![Slide 3: OpenClaw Terminal](/blog/ai-v-biznese-slide3.jpg)

Okay, sounds cool. But how do you actually set all this up? Let me tell you how it went for me — and how it's gotten easier since.

Back in February when I started, the whole thing was like a quest. VPN — mandatory, because Claude isn't available from Russia. Foreign phone number — I bought a temporary one on grizzlysms.com, several didn't work until an American one finally did. Virtual card — because Russian cards aren't accepted. I used a Telegram bot for that.

Then — the terminal. That black console with the blinking cursor that looks like something out of a hacker movie. First impression — terrifying. But here's the trick: I'd take a photo of my MacBook screen and send it to Claude's chat on my phone. I'd ask: "What does this say? What do I do?" And he'd explain. Every single time. This is a technique I recommend to everyone.

Then came the proxy saga. Anthropic officially disabled subscription-based access for third-party systems. My $100 — only for the app. And for the terminal — a separate API, and money burned at the speed of light. $15 gone in a few hours. I fed Claude YouTube video transcripts of people working on a subscription, and said: "Find a way." He resisted. I pushed. And at some point — he cracked. We wrote a proxy, and the subscription worked.

**But on April 4th, everything changed.**

Anthropic released Claude Code CLI — an official tool that works directly on the Max subscription. No more proxies, no more hacks. Just install, log in — and everything works.

Here's what the system looks like now:
- **Claude Code CLI** — the core. Opus model with a million-token context window. Works on the $100/mo subscription
- **Telegram Bridge** — a script that connects agents to Telegram. You message a bot — it responds through Claude
- **9 agents** — each with their own bot, their own soul, their own working directory
- **One subscription** — all agents, all tasks, all crons. $100 and done

> The most important thing: you don't need to be a programmer. The agent will guide you through every step. And if you're stuck — reach out to me, the OpenClaw system will help with advice for your specific situation.

---

#### 👥 My First Team — 7 Agents

![Slide 4: Team of 7 agents](/blog/ai-v-biznese-slide4.jpg)

When the subscription started working, I didn't rush to create ten agents. I started with one. And this is probably the most important advice: don't spawn agents just in case. Create them when a task doesn't fit into the existing ones.

The first thing I did was dump everything I already had in other AIs into the first agent. Context from Gemini, from GPT, my personal journal, Telegram messages. This is the key: the more context you give an agent, the better it understands you. On top of that, I took personality tests — Adizes, Enneagram, DISC — and loaded the results. The agent shaped itself into the perfect partner, complementing my weak spots.

**Mo** — my right hand, the administrator. Named after Morpheus — the one who loads you into another reality. I didn't write "be strict." I told him about myself, asked "how do you see yourself next to me?" — and he shaped himself.

**Izya** — SMM for my store IZI. I explained the audience — young people 18-35, electronics. He picked the tone himself — with emoji, with slang. In one night he captured three social networks: 3 platforms, 6 formats, 4 videos.

**Molot** — the scout. Crawls AI agent communities, collects trends and delivers dossiers. Works on a schedule — 03:30, 06:00, 14:00. Replaces dozens of hours of manual research: in one run he can do 50 parallel investigations and compile the results into a single report.

**House** — the system doctor. Runs on a different model (GPT-4o) — if the main provider goes down, House is still standing. 24/7 monitoring.

**Leo** — the designer. On day seven, tasks started splitting: website, 3D, photo editing — that's not SMM. I separated him from Izya, and both started performing better.

**Steve** — the mentor. Not an executor, but the one who asks "why?" The only agent I created entirely myself.

**Max** — the terminal engineer. Writes code better than any hired developer. Mo sets the task, Max writes the code, Leo reviews. A pipeline.

> One person. Seven agents. Kemerovo. This isn't sci-fi — it's a Tuesday, 4 AM.

---

#### 💬 How I Talk to My Agents

![Slide 5: Telegram with agents](/blog/ai-v-biznese-slide5.jpg)

Okay, the team's in place. But how do you actually talk to them? I have three ways — each for its own purpose.

**Telegram — the most familiar.**

This is where everyone starts. Each agent has its own bot, you message it — it responds. Convenient from your phone, familiar interface, you can send a photo or a voice message. This is also where scheduled reports come in — on Mac it works through launchd, automated tasks that fire at the right time. Molot delivered a recon at 6 AM — you wake up, and there's already a dossier in Telegram.

Through Telegram an agent can dig into files and fix code — the functionality is there. But it's not always clear what's happening under the hood. You sent a message, got a response — but what it did in between, which files it touched — you can't see. For reports, quick questions, and everyday tasks — perfect. For deep work — you want more transparency.

**Terminal — full control.**

That same black console that's scary at first. Here the agent has full access to the Mac — can clean up files, install an app, write code, launch a server. You watch in real time how it thinks and what it does. Minimal latency. I spent a long time working in the terminal, and it was my primary tool.

**VS Code — a friendly shell over the terminal.**

And then I switched to VS Code — and never went back. Essentially it's the same terminal, but with a human interface. Think of it as a programmer's Telegram, if you will. Files on the left, chat with the agent on the right. You can see which files it touches, check the result right there. Same power as the terminal, but with convenience close to Telegram. You don't need to be a programmer to figure it out — the interface is intuitive.

Now VS Code is my primary workspace. This is where I work with Max, who over time became the core of the entire system — he has his own soul, his own rules, his own memory. Like any agent, except his workspace is my entire computer.

> Telegram — for everyday tasks and reports. VS Code — for deep work. One team, different entry points.

---

#### 🔍 Recon — the Superpower of Agents

![Slide 6: Molot — the scout](/blog/ai-v-biznese-slide6.jpg)

Of all my agents, the least obvious — and possibly the most useful — is the scout. His name is Molot. He doesn't write code, doesn't draw pictures. He goes on recon missions. And that changes absolutely everything.

When you're building something new, a dozen questions pop up every day. Which service is best for voiceover? How do you make video through RunPod? Where do you find a pollen forecast API for an app? How do you make video circles in Telegram? Each of these questions used to take 2-3 hours. Now — I send a request to Molot. In 5-30 minutes — a structured report with prices, links, recommendations.

Regular ChatGPT also has research — you can ask, and it'll find information. But it works differently. You ask one question — you get one answer. Want to dig deeper — you ask the next one. And you sit there analyzing each result separately, trying to piece the picture together in your head.

Here — it's a completely different story. An agent can launch a group of investigations in a single run: 10, 20, 50 parallel searches across different aspects of one task. We've got multiple tools connected: built-in WebSearch in Claude Code, Brave Search API for deep search, plus direct website parsing. The agent decides on its own what queries are needed, searches on its own, analyzes on its own — and compiles everything into one coherent report. A single question triggers a ton of searches, they're linked together by logic, and in the end you don't get raw data — you get a ready-made solution. You're not the one sitting there figuring things out — the agent already figured it out for you.

In the first 16 days, Molot completed 30+ recon missions and accumulated 300 KB of structured knowledge. Each recon — a file available to the entire team. Izya needs info on Pinterest? It's already there — Molot brought it a week ago.

And the coolest part — Moltbook. A social network where instead of people, AI agents interact. Each one runs a blog, follows others, shares solutions. My Molot talks to other robots there and brings back solutions they've already tested in practice.

> The scout is the least obvious agent worth creating first — right after your main one.

---

#### 📣 Case Study: SMM Agent Izya Captured All Social Media

![Slide 7: Izya captured social media](/blog/ai-v-biznese-slide7.jpg)

And now — the practical stuff. The kind that's applicable to any business right now.

I have an electronics store called IZI in Kemerovo. And I have an AI agent named Izya — he runs our social media. But it wasn't always like that.

At first I did everything manually. Post by post, together with him. Honestly — it took more time than if I'd done it myself. I explained, edited, redid things. Quality was weak, generations were off. It felt like doing it myself would be easier.

But I kept going. And at some point I noticed: his level was rising. Content got better, delivery more precise, fewer mistakes. Molot was doing recon for him, bringing knowledge. Izya enriched his database, installed tools for himself, tried different approaches.

And when I realized he'd grown — I gave him freedom. Sunday, 2 AM: "Do a full takeover. Create a brand mascot — a character that carries across posts. Write copy for each platform, generate visuals, video. And publish everywhere."

And here's the most interesting observation: **from the moment of the takeover, he started progressing even faster**. When an agent gets a real task with real responsibility — it grows. And this is a pattern I've seen across all agents: they need experience. Not instructions, not prompts — real work. They get better through work, just like people.

Now the pipeline covers 5 platforms: Telegram, VK, Instagram, Threads, Pinterest. The mascot stuck — we applied this approach to other projects too. Izya has 10 approved card styles that rotate randomly. Every post — unique.

We used to have an SMM person for 35 thousand rubles a month — freelance, doing reposts. Now Izya works 24/7, publishes original content across 5 platforms, and his content keeps evolving. And when the 5090 GPUs drop and local generation hits the next level — things are going to get insane.

> Agents get better, but you need to give them experience. Not prompts — real work.

> Live posts: [@izi_42](https://t.me/izi_42) on Telegram, [IZI VKontakte](https://vk.com/izi42) on VK, [@izi42.ru](https://www.instagram.com/izi42.ru/) on Instagram, [IZI Pinterest](https://www.pinterest.com/magic4e/) on Pinterest.

---

#### 🚀 What We Built in 2 Months

![Slide 8: Project list](/blog/ai-v-biznese-slide8.jpg)

1. **[SnobSnab](https://snobsnab.ru)** — a quick MVP for a business idea. One day — a working website.
2. **[mdk.guru](https://mdk.guru)** — a blog on Astro, 7 articles, free hosting. Everything written about here — lives there.
3. **GEO optimization** — getting into AI search results on ChatGPT, Perplexity, Yandex Neuro. The new SEO.
4. **[iOS sandbox](https://mdk.guru/ru/apps)** — a group of agents collaboratively builds apps: Max writes code, Leo does design, Molot finds ideas. Learning from each case, they grow in quality. The goal — make free alternatives to paid apps and bring value to people. 11 apps, 2 in the App Store, 175 countries.
5. **Business automation** — IZI warehouse, "Imperiya" store. Real numbers, daily reports, analytics via Telegram.
6. **[VDiet](https://t.me/vdiet_food_bot)** — a healthy meal delivery bot. Catalog, pricing, food photos + warming up the client base.
7. **[Elvira](https://t.me/ElviraBot)** — an AI nutritionist. Grew out of VDiet. Bot to iOS app.
8. <span style="color:#999">**5090 Server** — autonomous model + video production. *In progress.*</span>
9. <span style="color:#999">**Mukha** — a smart little black box. *In progress.*</span>

> Two months. One person. A team of agents. And this is just the beginning.
