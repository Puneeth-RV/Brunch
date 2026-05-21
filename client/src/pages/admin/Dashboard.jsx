import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Clock, CheckCircle2, IndianRupee, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/api/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order marked as ${newStatus}`);
      fetchStats();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 size={32} className="spinner" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  const statCards = [
    { title: 'Total Orders', value: stats.totalOrders, icon: <ShoppingBag size={24} />, color: 'var(--primary)', bg: 'rgba(139,26,26,0.1)' },
    { title: 'Pending', value: stats.pendingOrders, icon: <Clock size={24} />, color: '#D97706', bg: '#FEF3C7' },
    { title: 'Completed', value: stats.totalOrders - stats.pendingOrders, icon: <CheckCircle2 size={24} />, color: '#065F46', bg: '#D1FAE5' },
    { title: 'Revenue', value: `₹${stats.revenue}`, icon: <IndianRupee size={24} />, color: 'var(--gold-dark)', bg: 'rgba(212,160,23,0.15)' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Overview of today's canteen operations.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {statCards.map((stat, index) => (
          <div key={index} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', margin: 0, lineHeight: 1 }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Live Orders Queue */}
      <div className="card">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>Live Order Queue</h2>
          <span className="badge badge-pending">{stats.pendingOrders} Active</span>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          {(!stats.recentOrders || stats.recentOrders.length === 0) ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '2rem 0' }}>No active orders at the moment.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {stats.recentOrders.map(order => (
                <div key={order._id} style={{ display: 'flex', flexDirection: 'column', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} className="md:flex-row md:items-center md:justify-between">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--primary)' }}>
                        #{order._id.substring(order._id.length - 4).toUpperCase()}
                      </span>
                      <span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span>
                    </div>
                    <div style={{ color: 'var(--text)', fontWeight: 500, marginBottom: '0.25rem' }}>
                      {order.user?.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {order.items.map(item => `${item.quantity}x ${item.menuItem.name}`).join(', ')}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }} className="md:mt-0">
                    {order.status === 'Pending' && (
                      <button onClick={() => updateOrderStatus(order._id, 'Preparing')} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button onClick={() => updateOrderStatus(order._id, 'Ready')} className="btn-gold" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'Ready' && (
                      <button onClick={() => updateOrderStatus(order._id, 'Completed')} style={{ background: '#065F46', color: 'white', padding: '0.5rem 1rem', fontSize: '0.75rem', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: 'pointer' }}>
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .md\\:flex-row { flex-direction: row !important; }
          .md\\:items-center { align-items: center !important; }
          .md\\:justify-between { justify-content: space-between !important; }
          .md\\:mt-0 { margin-top: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
