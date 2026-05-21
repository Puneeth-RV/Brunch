import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search, Plus, Loader2 } from 'lucide-react';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  
  const categories = ['All', ...new Set(items.map(item => item.category))];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get('/api/menu');
        setItems(data.filter(item => item.available));
      } catch (error) {
        toast.error('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cItem => cItem._id === item._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${item.name} added to cart`);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });

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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>Today's Menu</h1>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
              <Search size={16} color="var(--text-muted)" />
            </div>
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="hide-scrollbar" style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem' }}>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              padding: '0.4rem 1rem', borderRadius: '999px', whiteSpace: 'nowrap',
              fontSize: '0.875rem', fontWeight: 600, border: '1px solid',
              transition: 'all 0.2s', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              ...(category === c 
                ? { background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' }
                : { background: 'var(--surface)', color: 'var(--text-muted)', borderColor: 'var(--border)' })
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div style={{ 
        display: 'grid', gap: '1.25rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' 
      }}>
        {filteredItems.map(item => (
          <div key={item._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
              <img 
                src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60'} 
                alt={item.name} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{item.name}</h3>
                <span style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '1.125rem' }}>₹{item.price}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.description}
              </p>
              <button
                onClick={() => addToCart(item)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                <Plus size={16} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '4rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No items found matching your criteria.
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

export default Menu;
