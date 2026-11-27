import type { Reply } from '@/lib/millie-answers';
import { PHONE_TEL } from '@/lib/millie/facts';

// A row of quick-reply buttons. Calls and links are real links so they work with one tap on phones.
export default function QuickReplies({ replies, onPick }: { replies: Reply[]; onPick: (r: Reply) => void }) {
  if (!replies.length) return null;
  return (
    <div className="millie-chips millie-replies">
      {replies.map((r, i) => {
        if (r.call) {
          return <a key={i} className="millie-chip millie-chip-call" href={PHONE_TEL}>{r.label}</a>;
        }
        if (r.href) {
          const external = r.href.startsWith('http');
          return (
            <a key={i} className="millie-chip" href={r.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {r.label}
            </a>
          );
        }
        return (
          <button key={i} type="button" className={r.tool === 'party' || r.topic === 'birthday' ? 'millie-chip millie-chip-pink' : 'millie-chip'} onClick={() => onPick(r)}>
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
