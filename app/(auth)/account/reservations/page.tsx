'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { clientAuth } from '@/lib/firebase-client';

type Booking = {
  id: string;
  date: string;
  time: string;
  lanes: string;
  bowlers: string;
  type: string;
  name: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
};

const STATUS_CLASS: Record<string, string> = {
  pending: 'badge-pending',
  confirmed: 'badge-confirmed',
  cancelled: 'badge-cancelled',
};

export default function ReservationsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const token = await clientAuth.currentUser?.getIdToken();
      const res = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setBookings(await res.json());
      setLoading(false);
    })();
  }, [user]);

  const today = new Date().toISOString().split('T')[0];
  const upcoming = bookings.filter(b => b.date >= today);
  const past = bookings.filter(b => b.date < today);

  function formatDate(dateStr: string) {
    const d = new Date(dateStr + 'T12:00:00');
    return {
      month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: d.getDate(),
    };
  }

  function BookingCard({ booking, isPast }: { booking: Booking; isPast: boolean }) {
    const { month, day } = formatDate(booking.date);
    return (
      <div className={`reservation-card ${isPast ? 'past' : 'upcoming'}`}>
        <div className="reservation-date">
          <div className="reservation-date-month">{month}</div>
          <div className="reservation-date-day">{day}</div>
        </div>
        <div className="reservation-details">
          <div className="reservation-type">{booking.type || 'Lane Reservation'}</div>
          <div className="reservation-meta">
            <span>⏰ {booking.time}</span>
            <span>🎳 {booking.lanes}</span>
            <span>👥 {booking.bowlers} bowlers</span>
            {booking.notes && <span>📝 {booking.notes}</span>}
          </div>
        </div>
        <div>
          <span className={`admin-badge ${STATUS_CLASS[booking.status] ?? 'badge-pending'}`}>
            {STATUS_LABEL[booking.status] ?? 'Pending'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="hero hero-xs hero-contact">
        <div className="hero-content">
          <span className="hero-tag">My Account</span>
          <h1><span className="word">My</span> <span className="word">Reservations</span></h1>
        </div>
      </section>

      <section className="block">
        <div className="container">
          {loading ? (
            <div className="admin-loading">Loading reservations…</div>
          ) : bookings.length === 0 ? (
            <div className="reservations-empty">
              <p>No reservations yet.</p>
              <Link href="/book" className="btn btn-primary">🎳 Book a Lane →</Link>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h2 className="section-title" style={{ marginBottom: '1rem' }}>Upcoming</h2>
                  {upcoming.map(b => <BookingCard key={b.id} booking={b} isPast={false} />)}
                </div>
              )}
              {past.length > 0 && (
                <div>
                  <h2 className="section-title" style={{ marginBottom: '1rem' }}>Past</h2>
                  {past.map(b => <BookingCard key={b.id} booking={b} isPast />)}
                </div>
              )}
            </>
          )}

          <div style={{ marginTop: '2rem' }}>
            <Link href="/account" className="btn btn-ghost">← Back to Account</Link>
          </div>
        </div>
      </section>
    </>
  );
}
