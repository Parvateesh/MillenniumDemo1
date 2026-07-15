import { Resend } from 'resend';

const TO   = 'info@millenniumbowllr.com';
const FROM = process.env.RESEND_FROM_EMAIL ?? 'Millennium Bowl <onboarding@resend.dev>';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

type Fields = Record<string, string | number | boolean | null | undefined>;

function table(fields: Fields) {
  return Object.entries(fields)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#888;white-space:nowrap">${k}</td><td style="padding:6px 0"><strong>${v}</strong></td></tr>`)
    .join('');
}

function wrap(title: string, body: string) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:Inter,sans-serif;background:#0a0118;color:#fff;padding:32px;margin:0">
  <div style="max-width:520px;margin:0 auto;background:#120a28;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px">
    <div style="font-family:'Bowlby One',cursive;font-size:22px;color:#ff2e93;margin-bottom:4px">Millennium Bowl</div>
    <h2 style="margin:0 0 24px;font-size:18px;font-weight:700">${title}</h2>
    <table style="width:100%;border-collapse:collapse">${body}</table>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0" />
    <p style="font-size:12px;color:#666;margin:0">Sent from your website · millenniumbowllr.com</p>
  </div>
</body>
</html>`;
}

export async function sendContactNotification(fields: {
  name: string; email: string; phone?: string; message: string;
}) {
  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `New Contact Form — ${fields.name}`,
    html: wrap('New Contact Form Submission', table({
      Name:    fields.name,
      Email:   fields.email,
      Phone:   fields.phone,
      Message: fields.message,
    })),
  });
}

export async function sendLeagueNotification(fields: {
  name: string; email: string; phone?: string;
  skill?: string; nights?: string; teamPref?: string;
}) {
  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `New League Interest — ${fields.name}`,
    html: wrap('New League Sign-Up', table({
      Name:        fields.name,
      Email:       fields.email,
      Phone:       fields.phone,
      'Skill Level': fields.skill,
      'Preferred Night(s)': fields.nights,
      'Solo or Team':      fields.teamPref,
    })),
  });
}

export async function sendWaitlistNotification(fields: {
  name: string; email: string;
}) {
  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `New Lane Waitlist Signup — ${fields.name}`,
    html: wrap('New Lane Waitlist Signup', table({
      Name:  fields.name,
      Email: fields.email,
    })),
  });
}
