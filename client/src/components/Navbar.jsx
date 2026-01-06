import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isActive = (path) => location.pathname === path;
  const isMobile = windowWidth <= 768;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10000,
      backgroundColor: isScrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
      boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 60px',
        height: isMobile ? '60px' : '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '10px' }}>
          <div style={{
            width: isMobile ? '36px' : '40px',
            height: isMobile ? '36px' : '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: isMobile ? '14px' : '18px'
          }}>
            IW
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', color: '#1f2937' }}>InnerWear</div>
            {!isMobile && <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '-2px' }}>Premium Store</div>}
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              to="/"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: isActive('/') ? '#6366f1' : 'transparent',
                color: isActive('/') ? '#ffffff' : '#4b5563'
              }}
            >
              Products
            </Link>

            <Link
              to="/cart"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                backgroundColor: isActive('/cart') ? '#6366f1' : 'transparent',
                color: isActive('/cart') ? '#ffffff' : '#4b5563',
                position: 'relative'
              }}
            >
              <FiShoppingCart style={{ width: '18px', height: '18px' }} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px'
                }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              to="/cart"
              style={{
                position: 'relative',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FiShoppingCart style={{ width: '22px', height: '22px', color: '#4b5563' }} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px'
                }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMobileMenuOpen ? (
                <FiX style={{ width: '24px', height: '24px', color: '#4b5563' }} />
              ) : (
                <FiMenu style={{ width: '24px', height: '24px', color: '#4b5563' }} />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none',
              backgroundColor: isActive('/') ? '#6366f1' : '#f3f4f6',
              color: isActive('/') ? '#ffffff' : '#4b5563'
            }}
          >
            Products
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isActive('/cart') ? '#6366f1' : '#f3f4f6',
              color: isActive('/cart') ? '#ffffff' : '#4b5563'
            }}
          >
            <FiShoppingCart style={{ width: '18px', height: '18px' }} />
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
