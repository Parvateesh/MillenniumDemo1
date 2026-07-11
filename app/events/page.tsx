import ComingSoon from '@/components/ComingSoon';

export const metadata = { title: 'Events — Millennium Bowl' };

export default function EventsPage() {
  return (
    <ComingSoon
      icon="🎉"
      pageTitle="Events Calendar"
      pageDesc="Trivia nights, cosmic bowl specials, holiday lock-ins, and more — all in one place. We're putting the finishing touches on the calendar now."
      launchDate="August 2026"
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
