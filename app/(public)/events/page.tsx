import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Events — Millennium Bowl',
  robots: { index: false },
};

export default function EventsPage() {
  return (
    <ComingSoon
      pageTitle="Events"
      pageDesc="Glow Bowl nights, tournaments, trivia, family days, and more. We're locking in the calendar — check back soon."
      icon="🎉"
      launchDate="Soon"
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
