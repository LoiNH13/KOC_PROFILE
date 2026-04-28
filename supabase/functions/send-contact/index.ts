import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createTransport } from 'npm:nodemailer@6.9.13'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS })
  }

  try {
    const { name, email, message, lang, notifyEmails } = await req.json()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
      })
    }

    const gmailUser = Deno.env.get('GMAIL_USER')
    const gmailPass = Deno.env.get('GMAIL_APP_PASSWORD')

    if (!gmailUser || !gmailPass) {
      return new Response(JSON.stringify({ error: 'GMAIL_USER or GMAIL_APP_PASSWORD not set' }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
      })
    }

    const recipients: string[] = Array.isArray(notifyEmails) && notifyEmails.length > 0
      ? notifyEmails
      : [gmailUser]

    const subject = lang === 'vi'
      ? `\uD83D\uDCE9 Tin nh\u1EAFn m\u1EDBi t\u1EEB ${name}`
      : `\uD83D\uDCE9 New message from ${name}`

    const labelName = lang === 'vi' ? 'T\u00EAn' : 'Name'
    const labelSent = lang === 'vi' ? 'G\u1EEDi qua kimngan.daily' : 'Sent via kimngan.daily'

    const html = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h2 style="margin:0 0 16px">${subject}</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#888;width:100px">${labelName}</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:12px;white-space:pre-wrap">${message}</div>
        <p style="margin-top:16px;font-size:12px;color:#aaa">${labelSent} &bull; ${new Date().toISOString()}</p>
      </div>
    `

    const transporter = createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    })

    await transporter.sendMail({
      from: `kimngan.daily <${gmailUser}>`,
      to: recipients.join(', '),
      replyTo: email,
      subject,
      html,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    })

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
