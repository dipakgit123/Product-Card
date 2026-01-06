import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 480;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: isMobile ? '100%' : '600px',
      margin: '0 auto',
      padding: isMobile ? '0' : '0 20px'
    }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          left: isMobile ? '14px' : '20px',
          color: isFocused ? '#6366f1' : '#9ca3af',
          transition: 'color 0.3s ease'
        }}>
          <FiSearch style={{ width: isMobile ? '18px' : '20px', height: isMobile ? '18px' : '20px' }} />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder={isMobile ? "Search products..." : "Search for products, categories..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            padding: isMobile ? '12px 40px 12px 42px' : '16px 50px 16px 50px',
            borderRadius: isMobile ? '12px' : '16px',
            border: isFocused ? '2px solid #818cf8' : '2px solid #e5e7eb',
            outline: 'none',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '500',
            color: '#374151',
            backgroundColor: 'rgba(255,255,255,0.9)',
            boxShadow: isFocused ? '0 10px 25px rgba(99,102,241,0.15)' : '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease'
          }}
        />

        {/* Clear Button */}
        {value && (
          <button
            onClick={() => onChange('')}
            style={{
              position: 'absolute',
              right: isMobile ? '10px' : '16px',
              width: isMobile ? '28px' : '32px',
              height: isMobile ? '28px' : '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FiX style={{ width: isMobile ? '14px' : '16px', height: isMobile ? '14px' : '16px' }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
