// Turns phone numbers, emails and website names in Millie's answers into tappable links.
import { Fragment } from 'react';

const PATTERN = /(\(\d{3}\) \d{3}-\d{4}|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|millenniumbowl\.square\.site(?:\/[\w/-]*)?|bowl101\.net)/g;

function hrefFor(token: string): string {
  if (/^\(\d{3}\)/.test(token)) return `tel:+1${token.replace(/\D/g, '')}`;
  if (token.includes('@')) return `mailto:${token}`;
  return `https://${token.startsWith('bowl101') ? 'www.' : ''}${token}`;
}

export default function RichText({ text }: { text: string }) {
  const parts = text.split(PATTERN);
  return (
    <>
      {parts.map((p, i) => {
        if (i % 2 === 1) {
          const href = hrefFor(p);
          const external = href.startsWith('https://');
          return (
            <a key={i} className="millie-link" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {p}
            </a>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
