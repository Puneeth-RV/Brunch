import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, Clock, ChefHat, CheckCircle2 } from 'lucide-react';

const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error('Failed to load order', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    // Poll every 5 seconds for live status
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 size={32} className="spinner" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  if (!order) {
    return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Order not found</div>;
  }

  const steps = [
    { status: 'Pending', icon: <Clock size={24} />, label: 'Order Placed' },
    { status: 'Preparing', icon: <ChefHat size={24} />, label: 'Preparing Food' },
    { status: 'Ready', icon: <CheckCircle2 size={24} />, label: 'Ready to Pickup' }
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);
  // Completed/Cancelled fallbacks
  const isActive = order.status !== 'Completed' && order.status !== 'Cancelled';

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/student/orders" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem', width: 'fit-content' }}>
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.25rem' }}>Order Token</h2>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '2px', lineHeight: 1 }}>
            {order._id.substring(order._id.length - 4).toUpperCase()}
          </div>
          <span className={`badge badge-${order.status.toLowerCase()}`} style={{ marginTop: '1rem' }}>
            {order.status}
          </span>
        </div>

        {isActive && (
          <div style={{ position: 'relative', padding: '2rem 0', margin: '2rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
              {steps.map((step, index) => {
                const isCompleted = currentStepIndex >= index;
                const isCurrent = currentStepIndex === index;
                
                return (
                  <div key={step.status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '33%', position: 'relative' }}>
                    <div style={{ 
                      width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isCompleted ? 'var(--primary)' : 'var(--surface-2)',
                      color: isCompleted ? 'white' : 'var(--text-muted)',
                      border: `2px solid ${isCompleted ? 'var(--primary)' : 'var(--border)'}`,
                      boxShadow: isCurrent ? '0 0 0 4px rgba(139,26,26,0.1)' : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      {step.icon}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--text)' : 'var(--text-muted)', textAlign: 'center' }}>
                      {step.label}
                    </span>
                    
                    {/* Connecting line */}
                    {index < steps.length - 1 && (
                      <div style={{ 
                        position: 'absolute', top: '1.5rem', left: '60%', width: '100%', height: '2px',
                        background: currentStepIndex > index ? 'var(--primary)' : 'var(--border)',
                        zIndex: -1, transform: 'translateY(-50%)', transition: 'all 0.3s ease'
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1rem' }}>Order Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {order.items?.map(item => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600, background: 'var(--surface-2)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{item.quantity}x</span>
                  {item.name}
                </span>
                <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div style={{ height: '1px', background: 'var(--border)', margin: '1rem 0' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>
            <span>Total Paid</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
