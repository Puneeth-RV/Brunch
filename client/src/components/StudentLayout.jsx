import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UtensilsCrossed, ShoppingCart, ClipboardList, LogOut } from 'lucide-react';

const StudentLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { path: '/student/menu', icon: <UtensilsCrossed size={20} />, label: 'Menu' },
    { path: '/student/cart', icon: <ShoppingCart size={20} />, label: 'My Cart' },
    { path: '/student/orders', icon: <ClipboardList size={20} />, label: 'My Orders' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Top Nav */}
      <nav style={{
        background: 'var(--primary)',
        boxShadow: '0 2px 12px rgba(139,26,26,0.3)',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="/logo.png" alt="Brunch" style={{ height: '34px', width: '34px', objectFit: 'contain' }} />
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.25rem' }}>Brunch</span>
            </div>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                    color: location.pathname === item.path ? 'var(--gold)' : 'rgba(255,255,255,0.8)',
                    background: location.pathname === item.path ? 'rgba(212,160,23,0.15)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>

            {/* User + Logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', display: 'none' }} className="user-name">
                Hi, {user?.name?.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                title="Logout"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, fontFamily: 'Inter, sans-serif'
                }}
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div style={{
        display: 'flex', position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--primary)', zIndex: 50, boxShadow: '0 -2px 12px rgba(139,26,26,0.3)'
      }} className="mobile-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '0.75rem 0.5rem', textDecoration: 'none',
              color: location.pathname === item.path ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
              fontSize: '0.65rem', fontWeight: 600, gap: '0.3rem',
              borderTop: location.pathname === item.path ? '2px solid var(--gold)' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '1.5rem 1rem 5rem 1rem' }}>
        <Outlet />
      </main>

      <style>{`
        @media (min-width: 640px) {
          .mobile-nav { display: none !important; }
          .desktop-nav { display: flex !important; }
          .user-name { display: block !important; }
        }
        @media (max-width: 639px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default StudentLayout;
