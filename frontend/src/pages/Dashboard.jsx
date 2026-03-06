import { useEffect, useState } from 'react';
import { getCustomers } from '../services/customerService';
import { getTemplates } from '../services/pricingService';
import { getOrders } from '../services/orderService';

export default function Dashboard() {
  const [stats, setStats] = useState({ customers: 0, templates: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [customers, templates, orders] = await Promise.all([
          getCustomers(),
          getTemplates(),
          getOrders(),
        ]);
        const revenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
        setStats({ customers: customers.length, templates: templates.length, orders: orders.length, revenue });
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  const statItems = [
    { label: 'Total Customers', value: stats.customers, color: '#2563eb' },
    { label: 'Pricing Templates', value: stats.templates, color: '#7c3aed' },
    { label: 'Total Orders', value: stats.orders, color: '#059669' },
    { label: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, color: '#d97706' },
  ];

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>
      <div className="card-grid">
        {statItems.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 12, fontSize: 15, fontWeight: 600 }}>Quick Overview</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Welcome to the EMT & B2B Pricing Management System. Use the sidebar to manage customers,
          configure pricing templates, and track orders.
        </p>
      </div>
    </div>
  );
}
