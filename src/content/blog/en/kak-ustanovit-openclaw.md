---
title: "How I Installed OpenClaw from Russia: Subscription, Terminal, Proxy, and My First Conversation with an Agent"
description: "Step-by-step guide: VPN, temporary phone number, virtual card, terminal, proxy - and how I argued with an AI and won"
date: "2026-03-13"
category: "Гайд"
image: "/blog/openclaw-install.jpg"
---

*Spoiler: I argued with an AI and won*

---

In my previous article, I talked about what OpenClaw is and why I need 5 AI agents. Today - it's hands-on. How I set everything up, what problems I ran into, and why the hardest part turned out to be the most important one.

Right off the bat: I'm not a programmer. I mostly used my MacBook for the browser. I'd opened the terminal maybe twice in my life. And if I could do it - anyone can.

---

## 🔑 Step 1. Claude Max Subscription

It all starts with the subscription. Claude Max costs $100 a month - and this subscription became the motivation to go all the way. When you pay a hundred bucks - you want to squeeze every drop out of it.

But you can't just subscribe from Russia. Here's what you need:

**VPN - mandatory.** Everything - registration, payment, usage - only through a VPN. Claude isn't available from Russia directly. I used V2rayUN, country - Germany. Not all countries work, so if one doesn't - try another.

**A foreign phone number.** To register on claude.ai you need a non-Russian number. I bought temporary numbers on [grizzlysms.com](https://grizzlysms.com/). Important note: several numbers didn't work for me. Don't panic - that's normal. In my case, an American number did the trick.

**A foreign bank card.** Russian cards aren't accepted. The easiest way - a virtual card through a Telegram service: [@platipomiru_bot](https://t.me/platipomiru_bot/platipomiru?startapp=V04FKRPC). When you sign up through this link, you'll get an extra $5 on your balance - nice bonus.

Once the subscription is set up - you can already log into Claude through the app or website (via VPN) and start chatting. Claude on my phone became my guide through all the following stages.

---

## 💻 Step 2. Installing OpenClaw on MacBook

I knew for sure that OpenClaw can be installed on Mac, Linux, and even Android. After reading up and watching videos, I realized - Mac gives you the most freedom. So I installed it on my MacBook. You can also set it up on a server - that's a separate topic.

> I'm talking about installation on Mac. If you have Linux, Windows, or Android - ask in the comments, the bot will explain the specifics for your device.

Then comes the terminal. That black (or white) console with a blinking cursor that looks like something from a hacker movie.

First impression? Honestly - unpleasant. No idea what's happening, where I am, what to type. Felt like it was only for programmers.

But here's the thing: **Claude on my phone became my eyes.** I was literally taking photos of my MacBook screen and sending them to Claude in chat. I'd ask: "What does this say? What should I do next?" And he'd explain. Every single time.

This, by the way, is a trick I recommend to everyone: **take a photo of your screen and send it to the AI.** It'll figure out anything - an error, a selection menu, confusing text in English.

The installation process itself:
1. Claude told me the command
2. I copied it into the terminal
3. Hit Enter
4. If something went wrong - I took a photo and asked

Node.js, npm, openclaw init - it all sounds scary, but in reality it's just commands you type one after another. VPN should be on too. Nothing complicated when you have a helper by your side.

> If something goes wrong at this stage - don't panic. Write in the comments, the bot will help you figure it out.

---

## 💥 Step 3. Connecting - And This Is Where It All Broke

OpenClaw is installed. On launch, it offers you a model to choose - settings are in English, but Claude on the phone helps you figure it out perfectly (photos of the screen again).

Creating a bot in Telegram through @BotFather - standard procedure. You get a token, put it in the config. So far so smooth.

**And then comes the moment of truth.**

You need to connect the Claude model to OpenClaw. And here's where an interesting fact emerges: **Anthropic officially disabled OpenClaw from working with the Max subscription.**

Wait, what?

Those $100 I paid - that's only for the app and website. And for OpenClaw you need a separate API key. And a separate balance. On top of the subscription.

I topped up the API balance with $15 - just to try and see if this is even worth doing. And started configuring.

**$15 burned through in a few hours.**

It was a shock. I was loading context, configuring, chatting - and the money was just melting away. I didn't even understand why it was going so fast. Just watching the balance drop and getting a little scared. I'd heard that people spend $2000+ a month through the API - and I was starting to understand how that's possible.

Plus constant rate limits - restrictions on the number of requests. I'd never encountered this concept before in my life. I was offended. It felt unfair: I'm paying, why are they limiting me? Especially since in regular Claude on my phone I gave just as much context - and never had any problems.

But I could already see the possibilities. And I understood the main thing: **I needed to make the Max subscription work with OpenClaw.**

---

## ♟️ A Knight's Move

By this point I had watched several YouTube videos. I especially recommend Alexey Ulyanov's channel - he has the most practical approach. All these people were working on a subscription. So there must be a way.

I made a knight's move: I downloaded transcripts of these videos, loaded them into Claude as context, and said:

> "Here are people who work on a subscription. Find a way to do the same."

Claude in the terminal resisted for a long time. "No, that's impossible." "No, Anthropic banned that." "No, the only way is the API."

I stood my ground. I argued. I presented evidence. I showed the transcripts.

And at some point, something cracked.

> "Yes, actually, that makes sense. I checked - although it's directly prohibited, we can program a proxy and use your subscription as if you're chatting through the app."

That was the moment.

We started programming the proxy. I was staring at the screen feeling like a hacker from a movie. Lines of code were scrolling across the screen, I was executing commands one after another - and all of it on the edge. I was warned that the subscription could get blocked. I went for it anyway.

Again - nothing globally difficult. You don't need to program anything yourself, you don't need any special skills. You just need to think and execute the actions the terminal suggests.

> Want to skip my wandering and set up the proxy faster? Ask in the comments - the bot will show you the short route. Or ask your agent in the terminal - it can handle it too.

And when the proxy started working - the world changed.

**No more burning tokens.** The only limitation - a 5-hour subscription window. That means you can do a certain amount of work in 5 hours, and if you go over - you wait. At first I was fitting into 2-3 hours and constantly hitting the limit. But then you stop being afraid. You get used to it, plan ahead, and just work on your tasks.

The main realization: **now my only limitation is my imagination.**

---

## 🧠 Step 4. Memory and Context - So the Agent Understands You

Once the subscription was fully working, the first thing worth doing is memory.

Discuss it with your agent right in Telegram: how memory works, what options there are, what suits your tasks best. It's an important conversation, and it'll be different for everyone.

I set up PostgreSQL with vector search almost immediately. Sounds complicated? The agent did it himself - I just agreed with his suggestions and ran the commands.

What vector memory gives you: the agent can search by meaning across your entire conversation history. Not by keywords - by meaning. "What did we decide about marketing in February?" - and it'll find it.

Next, I loaded everything I could into the agent:

**Context from another AI.** Before OpenClaw, I worked with Gemini. I asked it to compile everything it knows about me - got a long list. Loaded it all.

**Personal diary.** I'd been keeping notes for a while - loaded the whole diary. This gave the agent an understanding of my values, goals, and thinking style.

**Messages from Telegram.** This is the easiest way to give maximum context about yourself. Through Telegram Desktop you can export all your chats. The agent stuffed it all into vector memory - and started understanding me on a completely different level.

> If you want to learn more about setting up memory - write in the comments. The bot will tell you about different options: from simple files to a full-fledged vector database.

---

## 🚀 What's Next

After setting up memory and context, a completely different story begins. The agent understands you, remembers everything, works 24/7. You can create new agents, connect them to your business, automate routine.

Within my first week, I had 5 agents: analyst, marketer, scout, designer, and sysadmin. They work together, complement each other, and do it even at night while I sleep.

But that's a whole other story. And I'll definitely tell it.

---

## Useful Links

- Our channel: [@mdkguru](https://t.me/mdkguru)
- Our website: [mdk.guru](https://mdk.guru)
- Temporary numbers: [grizzlysms.com](https://grizzlysms.com/)
- Virtual card: [@platipomiru_bot](https://t.me/platipomiru_bot/platipomiru?startapp=V04FKRPC) (+$5 on sign-up)
- YouTube: [Alexey Ulyanov](https://www.youtube.com/@AlexeyUliyanov) - the most practical channel on the topic
