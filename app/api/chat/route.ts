export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { MILLIE_SYSTEM_PROMPT } from '@/lib/chatbot-knowledge';

const MODEL = process.env.CHATBOT_MODEL ?? 'claude-haiku-5-5';
const FALLBACK = "Sorry, I can't answer right now. Please call us at (501) 791-9150 and we'll be happy to help!";

// Best-effort per-instance rate limit: 20 messages per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

type Msg = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ reply: "You've sent a lot of messages! Please call (501) 791-9150 for more help." });
  }

  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: Msg) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string')
      .slice(-10)
      .map((m: Msg) => ({ role: m.role, content: m.content.slice(0, 800) }));
  } catch {
    return NextResponse.json({ reply: FALLBACK }, { status: 400 });
  }
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ reply: FALLBACK }, { status: 400 });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ reply: FALLBACK });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 300, system: MILLIE_SYSTEM_PROMPT, messages }),
    });
    if (!res.ok) {
      console.error('[chat] anthropic', res.status, await res.text());
      return NextResponse.json({ reply: FALLBACK });
    }
    const data = await res.json();
    const reply = (data?.content ?? [])
      .filter((b: { type: string }) => b.type === 'text')
      .map((b: { text: string }) => b.text)
      .join('')
      .trim();
    return NextResponse.json({ reply: reply || FALLBACK });
  } catch (err) {
    console.error('[chat]', err);
    return NextResponse.json({ reply: FALLBACK });
  }
}
