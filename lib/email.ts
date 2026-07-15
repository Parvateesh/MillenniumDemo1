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

const UNSUBSCRIBE_FOOTER = `
  <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0" />
  <p style="font-size:11px;color:#555;margin:0;line-height:1.6">
    You received this email because you submitted a form at
    <a href="https://millenniumbowllr.com" style="color:#555">millenniumbowllr.com</a>.<br />
    To stop receiving emails, reply with "UNSUBSCRIBE" or email
    <a href="mailto:info@millenniumbowllr.com" style="color:#555">info@millenniumbowllr.com</a>.<br />
    Millennium Bowl · 7200 Counts Massie Rd, North Little Rock, AR 72113 · (501) 791-9150
  </p>`;

function wrap(title: string, body: string, includeUnsubscribe = false) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:Inter,sans-serif;background:#0a0118;color:#fff;padding:32px;margin:0">
  <div style="max-width:520px;margin:0 auto;background:#120a28;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px">
    <div style="font-family:'Bowlby One',cursive;font-size:22px;color:#ff2e93;margin-bottom:4px">Millennium Bowl</div>
    <h2 style="margin:0 0 24px;font-size:18px;font-weight:700">${title}</h2>
    <table style="width:100%;border-collapse:collapse">${body}</table>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0" />
    <p style="font-size:12px;color:#666;margin:0">millenniumbowllr.com · (501) 791-9150</p>
    ${includeUnsubscribe ? UNSUBSCRIBE_FOOTER : ''}
  </div>
</body>
</html>`;
}

export async function sendContactNotification(fields: {
  name: string; email: string; phone?: string; message: string;
}) {
  await Promise.all([
    // Staff notification
    getResend().emails.send({
      from: FROM,
      to: TO,
      subject: `New Contact Form — ${fields.name}`,
      html: wrap('New Contact Form Submission', table({
        Name:    fields.name,
        Email:   fields.email,
        Phone:   fields.phone,
        Message: fields.message,
      })),
    }),
    // Customer confirmation
    getResend().emails.send({
      from: FROM,
      to: fields.email,
      subject: `We got your message — Millennium Bowl`,
      html: wrap(
        `Thanks, ${fields.name}!`,
        `<tr><td style="padding:8px 0;color:#ccc;line-height:1.7">
          We received your message and will get back to you within 1 business day.<br /><br />
          In the meantime, feel free to call us at <strong>(501) 791-9150</strong> or
          visit us at <strong>7200 Counts Massie Rd, North Little Rock, AR 72113</strong>.
        </td></tr>`,
        true,
      ),
    }),
  ]);
}

export async function sendLeagueNotification(fields: {
  name: string; email: string; phone?: string;
  skill?: string; nights?: string; teamPref?: string;
}) {
  await Promise.all([
    // Staff notification
    getResend().emails.send({
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
    }),
    // Customer confirmation
    getResend().emails.send({
      from: FROM,
      to: fields.email,
      subject: `League sign-up received — Millennium Bowl`,
      html: wrap(
        `You&apos;re on the list, ${fields.name}!`,
        `<tr><td style="padding:8px 0;color:#ccc;line-height:1.7">
          We received your league interest form. Our league coordinator will reach out
          within 2 business days to confirm your spot and night.<br /><br />
          <strong>Questions?</strong> Call us at <strong>(501) 791-9150</strong> or stop by
          <strong>7200 Counts Massie Rd, North Little Rock, AR 72113</strong>.
        </td></tr>`,
        true,
      ),
    }),
  ]);
}

export async function sendWaitlistNotification(fields: {
  name: string; email: string;
}) {
  await Promise.all([
    // Staff notification
    getResend().emails.send({
      from: FROM,
      to: TO,
      subject: `New Lane Waitlist Signup — ${fields.name}`,
      html: wrap('New Lane Waitlist Signup', table({
        Name:  fields.name,
        Email: fields.email,
      })),
    }),
    // Customer confirmation
    getResend().emails.send({
      from: FROM,
      to: fields.email,
      subject: `You&apos;re on the waitlist — Millennium Bowl`,
      html: wrap(
        `Got it, ${fields.name}!`,
        `<tr><td style="padding:8px 0;color:#ccc;line-height:1.7">
          You&apos;re on our lane waitlist. We&apos;ll reach out as soon as a spot opens up.<br /><br />
          <strong>Want to check availability now?</strong> Call us at <strong>(501) 791-9150</strong>.<br />
          Millennium Bowl · 7200 Counts Massie Rd, North Little Rock, AR 72113
        </td></tr>`,
        true,
      ),
    }),
  ]);
}
