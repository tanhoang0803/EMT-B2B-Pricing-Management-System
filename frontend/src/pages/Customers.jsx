import { useEffect, useState } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, getGroups } from '../services/customerService';

const emptyForm = { name: '', email: '', phone: '', customer_type: 'Individual', group_id: '' };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    const [c, g] = await Promise.all([getCustomers(), getGroups()]);
    setCustomers(c);
    setGroups(g);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setError(''); setModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, email: c.email || '', phone: c.phone || '', customer_type: c.customer_type, group_id: c.group_id || '' }); setEditing(c.id); setError(''); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) await updateCustomer(editing, form);
      else await createCustomer(form);
      setModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving customer');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this customer?')) return;
    await deleteCustomer(id);
    load();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Customers</h2>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Customer</button>
      </div>

      <div className="card">
        {customers.length === 0 ? (
          <div className="empty-state"><p>No customers yet. Add your first customer.</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Group</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email || '-'}</td>
                    <td>{c.phone || '-'}</td>
                    <td><span className={`badge ${c.customer_type === 'Organization' ? 'badge-blue' : 'badge-green'}`}>{c.customer_type}</span></td>
                    <td>{c.group?.name || '-'}</td>
                    <td>
                      <button className="btn btn-outline btn-sm" onClick={() => openEdit(c)}>Edit</button>{' '}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
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
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Customer' : 'Add Customer'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}>&times;</button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
              <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
              <div className="form-group">
                <label>Type *</label>
                <select value={form.customer_type} onChange={e => setForm({...form, customer_type: e.target.value})}>
                  <option>Individual</option><option>Organization</option>
                </select>
              </div>
              <div className="form-group">
                <label>Group</label>
                <select value={form.group_id} onChange={e => setForm({...form, group_id: e.target.value})}>
                  <option value="">-- No Group --</option>
                  {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
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
