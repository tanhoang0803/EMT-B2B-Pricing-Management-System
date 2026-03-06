import { useEffect, useState } from 'react';
import { getTemplates, createTemplate, deleteTemplate, generatePricingTable, getPricingEntries, deletePricingEntry } from '../services/pricingService';
import { getGroups } from '../services/customerService';

const PRICE_TYPES = ['meal_package', 'government', 'enterprise', 'individual', 'customer_group', 'custom'];
const emptyTemplate = { template_name: '', price_type: 'enterprise', description: '' };

export default function Pricing() {
  const [templates, setTemplates] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyTemplate);
  const [selected, setSelected] = useState(null);
  const [entries, setEntries] = useState([]);
  const [genModal, setGenModal] = useState(false);
  const [genForm, setGenForm] = useState({ template_id: '', customer_group_id: '', products: [{ product_name: '', price: '' }] });
  const [error, setError] = useState('');

  const load = async () => {
    const [t, g] = await Promise.all([getTemplates(), getGroups()]);
    setTemplates(t);
    setGroups(g);
    setLoading(false);
  };

  const loadEntries = async (templateId) => {
    const e = await getPricingEntries(templateId);
    setEntries(e);
    setSelected(templateId);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createTemplate(form);
      setModal(false);
      setForm(emptyTemplate);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this template?')) return;
    await deleteTemplate(id);
    if (selected === id) setSelected(null);
    load();
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await generatePricingTable(genForm);
      setGenModal(false);
      if (selected === parseInt(genForm.template_id)) loadEntries(selected);
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  const addProduct = () => setGenForm({ ...genForm, products: [...genForm.products, { product_name: '', price: '' }] });
  const updateProduct = (i, field, val) => {
    const p = [...genForm.products];
    p[i][field] = val;
    setGenForm({ ...genForm, products: p });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Pricing Templates</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline" onClick={() => setGenModal(true)}>Generate Table</button>
          <button className="btn btn-primary" onClick={() => { setForm(emptyTemplate); setError(''); setModal(true); }}>+ New Template</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card">
          <h3 style={{ marginBottom: 14, fontSize: 15, fontWeight: 600 }}>Templates</h3>
          {templates.length === 0 ? (
            <div className="empty-state"><p>No templates yet.</p></div>
          ) : (
            templates.map((t) => (
              <div key={t.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ cursor: 'pointer' }} onClick={() => loadEntries(t.id)}>
                  <div style={{ fontWeight: 500, color: selected === t.id ? 'var(--primary)' : 'inherit' }}>{t.template_name}</div>
                  <span className="badge badge-blue" style={{ marginTop: 4 }}>{t.price_type}</span>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 14, fontSize: 15, fontWeight: 600 }}>
            {selected ? 'Pricing Entries' : 'Select a template to view entries'}
          </h3>
          {selected && (
            entries.length === 0 ? (
              <div className="empty-state"><p>No entries. Generate a pricing table first.</p></div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Product</th><th>Price</th><th>Group</th><th></th></tr></thead>
                  <tbody>
                    {entries.map((e) => (
                      <tr key={e.id}>
                        <td>{e.product_name}</td>
                        <td>${parseFloat(e.price).toFixed(2)}</td>
                        <td>{e.customerGroup?.name || '-'}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={async () => { await deletePricingEntry(e.id); loadEntries(selected); }}>X</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>New Pricing Template</h3>
              <button className="modal-close" onClick={() => setModal(false)}>&times;</button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleCreate}>
              <div className="form-group"><label>Template Name *</label><input value={form.template_name} onChange={e => setForm({...form, template_name: e.target.value})} required /></div>
              <div className="form-group">
                <label>Price Type *</label>
                <select value={form.price_type} onChange={e => setForm({...form, price_type: e.target.value})}>
                  {PRICE_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} /></div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {genModal && (
        <div className="modal-overlay" onClick={() => setGenModal(false)}>
          <div className="modal" style={{ width: 560 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Generate Pricing Table</h3>
              <button className="modal-close" onClick={() => setGenModal(false)}>&times;</button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleGenerate}>
              <div className="form-group">
                <label>Template *</label>
                <select value={genForm.template_id} onChange={e => setGenForm({...genForm, template_id: e.target.value})} required>
                  <option value="">-- Select Template --</option>
                  {templates.map(t => <option key={t.id} value={t.id}>{t.template_name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Customer Group</label>
                <select value={genForm.customer_group_id} onChange={e => setGenForm({...genForm, customer_group_id: e.target.value})}>
                  <option value="">-- All Groups --</option>
                  {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 12, fontWeight: 500, fontSize: 13 }}>Products</div>
              {genForm.products.map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                  <input placeholder="Product name" value={p.product_name} onChange={e => updateProduct(i, 'product_name', e.target.value)} required style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 14 }} />
                  <input placeholder="Price" type="number" step="0.01" value={p.price} onChange={e => updateProduct(i, 'price', e.target.value)} required style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 14 }} />
                </div>
              ))}
              <button type="button" className="btn btn-outline btn-sm" onClick={addProduct} style={{ marginBottom: 16 }}>+ Add Product</button>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setGenModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Generate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
