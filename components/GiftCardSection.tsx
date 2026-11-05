import Image from 'next/image';
import Link from 'next/link';

export const EGIFT_URL = 'https://millenniumbowl.square.site/s/gift-cards';

export default function GiftCardSection({ showMoreLink = true }: { showMoreLink?: boolean }) {
  return (
    <section className="block gift-section" id="gift-cards">
      <div className="container">
        <div className="gift-grid">
          <div className="gift-card-visual" data-animate="">
            <span className="gift-ribbon">NEW 🎁</span>
            <span className="gift-sparkle s1">✦</span>
            <span className="gift-sparkle s2">✦</span>
            <span className="gift-sparkle s3">✧</span>
            <div className="gift-card-tilt">
            <Image
              src="/gift-card.webp"
              alt="Millennium Bowl gift card"
              width={1200}
              height={748}
              sizes="(max-width: 900px) 90vw, 560px"
            />
            <span className="gift-shine" aria-hidden="true" />
            </div>
          </div>
          <div className="gift-copy">
            <div className="section-eyebrow">New at Millennium Bowl</div>
            <h2 className="section-title">Give the Gift of <span className="accent">Strikes</span></h2>
            <p className="gift-lede">Bowling, food and good times, all on one card. Perfect for birthdays, holidays, teachers, coaches, league teammates or just because.</p>

            <div className="gift-amounts" aria-label="Popular eGift card amounts">
              {['$25', '$50', '$100', 'Any amount'].map((a) => (
                <a key={a} className="gift-amount" href={EGIFT_URL} target="_blank" rel="noopener noreferrer">{a}</a>
              ))}
            </div>

            <div className="gift-option" data-animate="">
              <div className="gift-option-text">
                <h3>📱 eGift Cards</h3>
                <p>Choose any amount, add a personal message and send it by email or text in seconds.</p>
              </div>
              <a className="btn btn-primary" href={EGIFT_URL} target="_blank" rel="noopener noreferrer" data-confetti="">
                Buy an eGift Card <span className="btn-arrow">→</span>
              </a>
            </div>

            <div className="gift-option gift-option-alt" data-animate="">
              <div className="gift-option-text">
                <h3>🎁 Gift Cards</h3>
                <p>Pick up a physical gift card at our front desk, in any amount and ready to wrap.</p>
              </div>
              <a className="btn btn-secondary" href="tel:5017919150">Call (501) 791-9150</a>
            </div>

            <p className="gift-more">
              {showMoreLink && (<><Link href="/gift-cards">Gift card details &amp; FAQ →</Link><span className="gift-more-sep">·</span></>)}
              <a href={EGIFT_URL} target="_blank" rel="noopener noreferrer">Check your balance →</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
