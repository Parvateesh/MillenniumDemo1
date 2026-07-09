'use client';

import { useState, useEffect } from 'react';

type LaneStatus = 'open' | 'reserved' | 'maintenance';
type Lane = { id: string; number: number; status: LaneStatus; notes: string };

const STATUS_COLORS: Record<LaneStatus, string> = {
  open: 'lane-open',
  reserved: 'lane-reserved',
  maintenance: 'lane-maintenance',
};

const STATUS_LABELS: Record<LaneStatus, string> = {
  open: '✅ Open',
  reserved: '🎳 Reserved',
  maintenance: '🔧 Maintenance',
};

export default function LanesPage() {
  const [lanes, setLanes] = useState<Lane[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/lanes');
    setLanes(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateLane(lane: Lane, status: LaneStatus, notes?: string) {
    setSaving(lane.id);
    await fetch('/api/lanes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lane.id, status, notes: notes ?? lane.notes }),
    });
    setSaving(null);
    load();
  }

  const counts = { open: 0, reserved: 0, maintenance: 0 };
  lanes.forEach(l => counts[l.status]++);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">🎿 Lane Management</h1>
          <p className="admin-page-sub">All 32 lanes · Real-time status</p>
        </div>
      </div>

      <div className="lane-summary">
        <div className="lane-summary-item open">✅ Open <strong>{counts.open}</strong></div>
        <div className="lane-summary-item reserved">🎳 Reserved <strong>{counts.reserved}</strong></div>
        <div className="lane-summary-item maintenance">🔧 Maintenance <strong>{counts.maintenance}</strong></div>
      </div>

      {loading ? (
        <div className="admin-loading">Loading lanes…</div>
      ) : (
        <div className="lanes-grid">
          {lanes.map(lane => (
            <div key={lane.id} className={`lane-card ${STATUS_COLORS[lane.status]} ${saving === lane.id ? 'lane-saving' : ''}`}>
              <div className="lane-number">Lane {lane.number}</div>
              <div className="lane-status-label">{STATUS_LABELS[lane.status]}</div>
              {lane.notes && <div className="lane-notes">{lane.notes}</div>}
              <div className="lane-actions">
                {(['open', 'reserved', 'maintenance'] as LaneStatus[]).map(s => (
                  <button
                    key={s}
                    className={`lane-btn ${s === lane.status ? 'active' : ''}`}
                    onClick={() => updateLane(lane, s)}
                    disabled={saving === lane.id}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
