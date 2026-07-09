'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'next/navigation';

type Item = { id: string; name: string; quantity: number; unit: string; price?: string; brand?: string; lowStock: number; notes?: string };

const CATEGORY_META: Record<string, { label: string; icon: string; fields: string[] }> = {
  proshop: { label: 'Pro Shop', icon: '🎳', fields: ['name', 'brand', 'quantity', 'unit', 'price', 'lowStock', 'notes'] },
  kitchen: { label: 'Kitchen',  icon: '🍕', fields: ['name', 'quantity', 'unit', 'lowStock', 'notes'] },
  bar:     { label: 'Bar',      icon: '🍺', fields: ['name', 'brand', 'quantity', 'unit', 'price', 'lowStock', 'notes'] },
};

const BLANK: Omit<Item, 'id'> = { name: '', quantity: 0, unit: 'units', price: '', brand: '', lowStock: 5, notes: '' };

export default function InventoryPage() {
  const { category } = useParams<{ category: string }>();
  const meta = CATEGORY_META[category] ?? { label: category, icon: '📦', fields: ['name', 'quantity', 'unit', 'lowStock', 'notes'] };

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Item, 'id'>>(BLANK);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/inventory/${category}`);
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, [category]);

  function openAdd() { setForm(BLANK); setEditId(null); setShowForm(true); }
  function openEdit(item: Item) { const { id, ...rest } = item; setForm(rest); setEditId(id); setShowForm(true); }
  function closeForm() { setShowForm(false); setEditId(null); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editId) {
      await fetch(`/api/inventory/${category}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...form }) });
    } else {
      await fetch(`/api/inventory/${category}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false);
    closeForm();
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/inventory/${category}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  }

  const lowStockItems = items.filter(i => i.quantity <= i.lowStock);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{meta.icon} {meta.label} Inventory</h1>
          <p className="admin-page-sub">{items.length} items · {lowStockItems.length} low stock</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Item</button>
      </div>

      {lowStockItems.length > 0 && (
        <div className="admin-alert">
          ⚠️ Low stock: {lowStockItems.map(i => i.name).join(', ')}
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Loading…</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">No items yet. Add your first item above.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                {meta.fields.includes('brand') && <th>Brand</th>}
                <th>Qty</th>
                <th>Unit</th>
                {meta.fields.includes('price') && <th>Price</th>}
                <th>Low Stock At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className={item.quantity <= item.lowStock ? 'row-low' : ''}>
                  <td><strong>{item.name}</strong>{item.notes && <span className="row-notes"> — {item.notes}</span>}</td>
                  {meta.fields.includes('brand') && <td>{item.brand || '—'}</td>}
                  <td className="td-qty">{item.quantity}</td>
                  <td>{item.unit}</td>
                  {meta.fields.includes('price') && <td>{item.price || '—'}</td>}
                  <td>{item.lowStock}</td>
                  <td>
                    <span className={`admin-badge ${item.quantity <= item.lowStock ? 'badge-low' : 'badge-ok'}`}>
                      {item.quantity <= item.lowStock ? 'Low' : 'OK'}
                    </span>
                  </td>
                  <td className="td-actions">
                    <button className="admin-btn-sm" onClick={() => openEdit(item)}>Edit</button>
                    <button className="admin-btn-sm danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h2 className="admin-modal-title">{editId ? 'Edit' : 'Add'} Item</h2>
            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="form-group">
                <label>Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              {meta.fields.includes('brand') && (
                <div className="form-group">
                  <label>Brand</label>
                  <input type="text" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
                </div>
              )}
              <div className="admin-form-row">
                <div className="form-group">
                  <label>Quantity *</label>
                  <input type="number" min="0" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))} required />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input type="text" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="units / bottles / pairs…" />
                </div>
              </div>
              <div className="admin-form-row">
                {meta.fields.includes('price') && (
                  <div className="form-group">
                    <label>Price</label>
                    <input type="text" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="$0.00" />
                  </div>
                )}
                <div className="form-group">
                  <label>Alert when below</label>
                  <input type="number" min="0" value={form.lowStock} onChange={e => setForm(f => ({ ...f, lowStock: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <input type="text" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-sm" onClick={closeForm}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
