'use client';
import { useState, useEffect } from 'react';

type LaneStatus = 'open' | 'reserved' | 'maintenance' | 'glow';
type Lane = { id: string; number: number; status: LaneStatus; notes: string };

function todayLabel() {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function LaneBoard() {
  const [lanes, setLanes] = useState<Lane[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateLabel, setDateLabel] = useState('');

  async function fetchLanes() {
    try {
      const res = await fetch('/api/lanes/public');
      if (res.ok) setLanes(await res.json());
    } catch { /* silent */ }
    setLoading(false);
  }

  useEffect(() => {
    setDateLabel(todayLabel());
    fetchLanes();
    const id = setInterval(fetchLanes, 30_000);
    return () => clearInterval(id);
  }, []);

  const openCount = lanes.filter(l => l.status === 'open').length;
  const glowCount = lanes.filter(l => l.status === 'glow').length;

  // Split into rows of 6
  const rows: Lane[][] = [];
  for (let i = 0; i < lanes.length; i += 6) rows.push(lanes.slice(i, i + 6));

  // Fallback skeleton while loading
  if (loading) {
    return (
      <div className="lane-board">
        <div className="lane-board-header">
          <span className="lane-board-title">Lanes · {dateLabel}</span>
          <span className="live-badge"><span className="live-dot" />Live</span>
        </div>
        <div className="lane-rows">
          {[0, 1, 2, 3].map(r => (
            <div key={r} className="lane-row">
              {[0,1,2,3,4,5].map(c => (
                <div key={c} className="lane-block lane-block--skeleton" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lane-board">
      <div className="lane-board-header">
        <span className="lane-board-title">Lanes · {dateLabel}</span>
        <span className="live-badge">
          <span className="live-dot" />
          Live · {openCount + glowCount} open
        </span>
      </div>

      <div className="lane-rows">
        {rows.map((row, ri) => (
          <div key={ri} className="lane-row">
            {row.map(lane => (
              <div
                key={lane.id}
                className={`lane-block ${
                  lane.status === 'open'        ? 'open'  :
                  lane.status === 'glow'        ? 'glow'  : 'taken'
                }`}
                title={lane.notes || STATUS_LABEL[lane.status]}
              >
                {lane.number}
                {(lane.status === 'open' || lane.status === 'glow') && (
                  <div className="lane-ball" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="lane-board-legend">
        <span className="legend-item"><span className="legend-dot open" />Open</span>
        <span className="legend-item"><span className="legend-dot glow" />Glow Bowl</span>
        <span className="legend-item"><span className="legend-dot taken" />In Use</span>
      </div>
    </div>
  );
}

const STATUS_LABEL: Record<LaneStatus, string> = {
  open: 'Open',
  reserved: 'Reserved',
  maintenance: 'Maintenance',
  glow: 'Glow Bowl',
};
