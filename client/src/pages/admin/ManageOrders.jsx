import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, RefreshCw, Eye } from 'lucide-react';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders');
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredOrders = statusFilter === 'All' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const statuses = ['Pending', 'Preparing', 'Ready', 'Completed'];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 size={32} className="spinner" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="sm:flex-row sm:items-center sm:justify-between">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Manage Orders</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input"
            style={{ minWidth: '150px' }}
          >
            <option value="All">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-primary"
            style={{ padding: '0.5rem' }}
          >
            <RefreshCw size={20} className={refreshing ? 'spinner' : ''} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredOrders.map(order => (
          <div key={order._id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '1.5rem', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: 0 }}>
                      #{order.tokenNumber || order._id.substring(order._id.length - 4).toUpperCase()}
                    </h3>
                    <span className={`badge badge-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                    {new Date(order.createdAt).toLocaleString()} • {order.user?.name || 'Unknown Student'}
                  </p>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold)' }}>
                  ₹{order.totalAmount}
                </div>
              </div>

              <div style={{ padding: '1rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', margin: '1rem 0' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Order Items</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text)' }}>{item.quantity}x {item.menuItem?.name || 'Item deleted'}</span>
                      <span style={{ color: 'var(--text-muted)' }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Update Status</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => updateStatus(order._id, status)}
                      disabled={order.status === status}
                      style={{
                        padding: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        cursor: order.status === status ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        background: order.status === status ? 'var(--primary)' : 'transparent',
                        color: order.status === status ? 'white' : 'var(--text-muted)',
                        borderColor: order.status === status ? 'var(--primary)' : 'var(--border)'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '4rem 1rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border)' }}>
            No orders found matching the selected filter.
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .sm\\:flex-row { flex-direction: row !important; }
          .sm\\:items-center { align-items: center !important; }
          .sm\\:justify-between { justify-content: space-between !important; }
        }
      `}</style>
    </div>
  );
};

export default ManageOrders;
