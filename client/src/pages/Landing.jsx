import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Smartphone, CheckCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Navbar */}
      <nav style={{
        background: 'var(--primary)',
        boxShadow: '0 2px 12px rgba(139,26,26,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/logo.png" alt="Brunch Logo" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.5px' }}>Brunch</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s'
              }}>Log in</Link>
              <Link to="/signup" style={{
                background: 'var(--gold)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.2s'
              }}>Sign up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        padding: '5rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <img src="/logo.png" alt="Brunch" style={{ height: '80px', width: '80px', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '1rem' }}>
            Welcome to <span style={{ color: 'var(--gold)' }}>Brunch</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Skip the queue. Pre-order your meals from the college canteen, track status in real-time, and pick up when it's ready.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--gold)', color: 'white', textDecoration: 'none',
              fontWeight: 700, fontSize: '1rem', padding: '0.875rem 2rem',
              borderRadius: 'var(--radius)', boxShadow: '0 4px 16px rgba(212,160,23,0.4)',
              transition: 'all 0.2s'
            }}>
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'transparent', color: 'white', textDecoration: 'none',
              fontWeight: 600, fontSize: '1rem', padding: '0.875rem 2rem',
              borderRadius: 'var(--radius)', border: '2px solid rgba(255,255,255,0.4)',
              transition: 'all 0.2s'
            }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
          Why Brunch?
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1rem' }}>
          A smarter way to eat at your college canteen
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { icon: <Smartphone size={28} />, title: 'Order Anywhere', desc: 'Browse the full menu and place your order right from your phone before class even ends.' },
            { icon: <Clock size={28} />, title: 'Track Real-Time', desc: 'Get live updates as your order goes from Pending → Preparing → Ready for pickup.' },
            { icon: <CheckCircle size={28} />, title: 'Easy Pickup', desc: 'Just show your token number at the counter when your food is ready. No waiting in line!' }
          ].map((f, i) => (
            <div key={i} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex', padding: '1rem',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                borderRadius: 'var(--radius)', color: 'white', marginBottom: '1rem'
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'var(--primary)', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>© 2025 Brunch — Smart Canteen Pre-Order System</p>
      </div>
    </div>
  );
};

export default Landing;
