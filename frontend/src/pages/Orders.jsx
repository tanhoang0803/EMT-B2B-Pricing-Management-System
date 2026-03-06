import { useEffect, useState } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../services/orderService';
import { getCustomers } from '../services/customerService';

const STATUS_BADGE = { pending: 'badge-yellow', confirmed: 'badge-green', cancelled: 'badge-red' };
const emptyForm = { customer_id: '', total_price: '', status: 'pending', notes: '' };

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    const [o, c] = await Promise.all([getOrders(), getCustomers()]);
    setOrders(o);
    setCustomers(c);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setError(''); setModal(true); };
  const openEdit = (o) => { setForm({ customer_id: o.customer_id, total_price: o.total_price, status: o.status, notes: o.notes || '' }); setEditing(o.id); setError(''); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) await updateOrder(editing, form);
      else await createOrder(form);
      setModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving order');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this order?')) return;
    await deleteOrder(id);
    load();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Orders</h2>
        <button className="btn btn-primary" onClick={openCreate}>+ New Order</button>
      </div>

      <div className="card">
        {orders.length === 0 ? (
          <div className="empty-state"><p>No orders yet.</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>ID</th><th>Customer</th><th>Total Price</th><th>Status</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.customer?.name || '-'}</td>
                    <td>${parseFloat(o.total_price).toFixed(2)}</td>
                    <td><span className={`badge ${STATUS_BADGE[o.status] || 'badge-gray'}`}>{o.status}</span></td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-outline btn-sm" onClick={() => openEdit(o)}>Edit</button>{' '}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(o.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Order' : 'New Order'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}>&times;</button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer *</label>
                <select value={form.customer_id} onChange={e => setForm({...form, customer_id: e.target.value})} required>
                  <option value="">-- Select Customer --</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Total Price *</label><input type="number" step="0.01" value={form.total_price} onChange={e => setForm({...form, total_price: e.target.value})} required /></div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={3} /></div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
