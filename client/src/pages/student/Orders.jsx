import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowRight, ClipboardList } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/my');
        setOrders(data);
      } catch (error) {
        console.error('Failed to load orders', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 size={32} className="spinner" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
        <div style={{ background: 'var(--surface-2)', padding: '2rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          <ClipboardList size={48} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>No orders yet</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't placed any orders yet.</p>
        <Link to="/student/menu" className="btn-primary" style={{ textDecoration: 'none' }}>
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>My Orders</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map(order => (
          <div key={order._id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.125rem' }}>Order #{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                <span className={`badge badge-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                {new Date(order.createdAt).toLocaleString()}
              </div>

              <div style={{ fontSize: '0.9rem' }}>
                {order.items.map(item => item.menuItem.name).join(', ')}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', gap: '2rem' }} className="sm:mt-0 sm:flex-col sm:align-end sm:gap-0.5rem">
              <div style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '1.25rem' }}>
                ₹{order.totalAmount}
              </div>
              <Link to={`/student/orders/${order._id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>
                View Status <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (min-width: 640px) {
          .sm\\:flex-row { flex-direction: row !important; }
          .sm\\:items-center { align-items: center !important; }
          .sm\\:justify-between { justify-content: space-between !important; }
          .sm\\:mt-0 { margin-top: 0 !important; }
          .sm\\:flex-col { flex-direction: column !important; }
          .sm\\:align-end { align-items: flex-end !important; }
        }
      `}</style>
    </div>
  );
};

export default Orders;
