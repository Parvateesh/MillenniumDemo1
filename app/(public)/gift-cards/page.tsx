import GiftCardSection, { EGIFT_URL } from '@/components/GiftCardSection';

export const metadata = {
  title: 'Gift Cards & eGift Cards — Millennium Bowl | North Little Rock, AR',
  description: 'Give the gift of strikes. Millennium Bowl gift cards and eGift cards work for bowling, food and good times. Send an eGift card instantly or pick one up at the front desk.',
};

export default function GiftCardsPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Now Available</span>
          <h1><span className="word">Gift</span> <span className="word">Cards</span> <span className="word">Are</span> <span className="word">Here.</span></h1>
          <p className="lede">The easiest gift in North Little Rock. Send an eGift card in under a minute, or grab a physical card next time you&apos;re in.</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href={EGIFT_URL} target="_blank" rel="noopener noreferrer" data-confetti="">Buy an eGift Card <span className="btn-arrow">→</span></a>
            <a className="btn btn-secondary" href="tel:5017919150">Call the Front Desk</a>
          </div>
          <p className="gift-balance-note">Already have a card? <a href={EGIFT_URL} target="_blank" rel="noopener noreferrer">Check your balance online →</a></p>
        </div>
      </section>

      <GiftCardSection showMoreLink={false} />

      <section className="block gift-faq-block">
        <div className="container">
          <div className="section-eyebrow">How It Works</div>
          <h2 className="section-title">Simple As a <span className="accent">Strike</span></h2>
          <div className="experiences">
            <div className="exp-card" data-animate=""><div className="exp-icon">💳</div><h3>Pick an Amount</h3><p>Choose any amount online, or tell us at the front desk. Great for one game or a whole party.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">✉️</div><h3>Send or Wrap</h3><p>eGift cards arrive by email or text with your personal message. Physical cards are ready to wrap.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">🎳</div><h3>Come Bowl</h3><p>Use it on bowling, shoes, food and more at Millennium Bowl. Just hand it over at checkout.</p></div>
          </div>

          <div className="gift-faq" data-animate="">
            <details>
              <summary>What can I use a gift card on?</summary>
              <p>Bowling, shoe rental, food and drinks at Millennium Bowl, 7200 Counts Massie Rd, North Little Rock.</p>
            </details>
            <details>
              <summary>How fast does an eGift card arrive?</summary>
              <p>Right away. Your recipient gets it by email or text as soon as you check out.</p>
            </details>
            <details>
              <summary>Can I buy a physical gift card?</summary>
              <p>Yes. Stop by the front desk any time we&apos;re open and we&apos;ll load one in any amount for you.</p>
            </details>
            <details>
              <summary>Can I check my balance?</summary>
              <p>Yes, online any time. Open our <a href={EGIFT_URL} target="_blank" rel="noopener noreferrer">gift card page</a>, tap <strong>&ldquo;Need to check gift card balance?&rdquo;</strong> and enter your card number (and PIN, if your card has one). You can also ask at the front desk or call <a href="tel:5017919150">(501) 791-9150</a>.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
