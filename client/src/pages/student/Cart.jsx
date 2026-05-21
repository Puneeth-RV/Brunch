import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Minus, Plus, Trash2, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (itemId, change) => {
    const newCart = cart.map(item => {
      if (item._id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item._id !== itemId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success('Item removed');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    
    try {
      const orderItems = cart.map(item => ({
        foodItem: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const { data } = await axios.post('/api/orders', {
        items: orderItems,
        totalAmount: calculateTotal()
      });

      localStorage.removeItem('cart');
      setCart([]);
      toast.success('Order placed successfully!');
      navigate(`/student/orders/${data._id}`);
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
        <div style={{ background: 'var(--surface-2)', padding: '2rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          <ShoppingBag size={48} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven't added any food yet.</p>
        <button onClick={() => navigate('/student/menu')} className="btn-primary">
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>My Cart</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="lg:flex-row">
        {/* Cart Items */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map(item => (
            <div key={item._id} className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', margin: '0 0 0.25rem 0' }}>{item.name}</h3>
                <div style={{ color: 'var(--gold)', fontWeight: 800 }}>₹{item.price}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <button onClick={() => updateQuantity(item._id, -1)} style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontWeight: 600, width: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)} style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={() => removeItem(item._id)} style={{ padding: '0.5rem', color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ width: '100%', maxWidth: '380px' }} className="lg:w-96">
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '80px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Platform Fee</span>
                <span>₹0</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1rem' }}
            >
              {isSubmitting ? <><Loader2 size={18} className="spinner" /> Processing...</> : <>Place Order <ArrowRight size={18} /></>}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .lg\\:flex-row { flex-direction: row !important; }
          .lg\\:w-96 { width: 384px !important; }
        }
      `}</style>
    </div>
  );
};

export default Cart;
