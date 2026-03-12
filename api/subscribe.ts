// Vercel Serverless Function - email subscription via Resend
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://mdk.guru',
        },
      });
    }

    const RESEND_KEY = process.env.RESEND_API_KEY;

    // Add to Resend audience (contacts)
    const audienceRes = await fetch('https://api.resend.com/audiences', {
      method: 'GET',
      headers: { Authorization: `Bearer ${RESEND_KEY}` },
    });
    const audiences = await audienceRes.json();

    let audienceId = audiences?.data?.[0]?.id;

    // Create audience if none exists
    if (!audienceId) {
      const createRes = await fetch('https://api.resend.com/audiences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'MDK.GURU Newsletter' }),
      });
      const created = await createRes.json();
      audienceId = created?.id;
    }

    // Add contact
    if (audienceId) {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
    }

    // Send welcome email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MDK.GURU <onboarding@resend.dev>',
        to: email,
        subject: 'Добро пожаловать в MDK.GURU 🚀',
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0e0e10; color: #fff; padding: 40px; border-radius: 12px;">
            <h1 style="background: linear-gradient(135deg, #9945FF, #14F195); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">MDK.GURU</h1>
            <p>Привет! Спасибо за подписку.</p>
            <p>Один человек. Пять ИИ-агентов. Бесконечные возможности.</p>
            <p>Теперь ты будешь получать новые кейсы и практику по ИИ-агентам.</p>
            <hr style="border: 1px solid #2a2a3e; margin: 24px 0;" />
            <p style="color: #6e6e80; font-size: 14px;">
              <a href="https://t.me/mdkguru" style="color: #9945FF;">Telegram</a> · 
              <a href="https://mdk.guru" style="color: #9945FF;">Сайт</a>
            </p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://mdk.guru',
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://mdk.guru',
      },
    });
  }
}
