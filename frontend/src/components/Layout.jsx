import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { logout, getUser } from '../services/authService';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/customers', label: 'Customers', icon: '👥' },
  { to: '/pricing', label: 'Pricing', icon: '💰' },
  { to: '/orders', label: 'Orders', icon: '📋' },
];

export default function Layout() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          EMT & B2B System
          <span>Pricing Management</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <h1>EMT & B2B Pricing Management</h1>
          <span className="topbar-user">{user?.username} ({user?.role})</span>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
