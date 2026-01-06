import { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import { FiPackage } from 'react-icons/fi';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    fetchCategories();
    fetchProducts();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [products, selectedCategory, sortOption, searchQuery]);

  // Responsive helpers
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 768;
  const isSmallDesktop = windowWidth <= 1024;

  const getContainerPadding = () => {
    if (isMobile) return '0 16px';
    if (isTablet) return '0 24px';
    if (isSmallDesktop) return '0 40px';
    return '0 60px';
  };

  const getGridColumns = () => {
    if (isMobile) return 'repeat(1, 1fr)';
    if (isTablet) return 'repeat(2, 1fr)';
    return 'repeat(auto-fill, minmax(280px, 1fr))';
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        paddingTop: isTablet ? '80px' : '100px',
        paddingBottom: isTablet ? '30px' : '40px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: getContainerPadding(),
          textAlign: 'center'
        }}>
          {/* Badge */}
          <span style={{
            display: 'inline-block',
            padding: isMobile ? '5px 12px' : '6px 16px',
            backgroundColor: '#eef2ff',
            color: '#6366f1',
            fontSize: isMobile ? '11px' : '13px',
            fontWeight: '600',
            borderRadius: '20px',
            marginBottom: isMobile ? '16px' : '20px'
          }}>
            New Collection 2026
          </span>

          {/* Main Heading */}
          <h1 style={{
            fontSize: isMobile ? '28px' : isTablet ? '36px' : 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: isMobile ? '12px' : '16px',
            lineHeight: '1.2'
          }}>
            Premium <span style={{ color: '#6366f1' }}>Innerwear</span> Collection
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: isMobile ? '0 auto 20px' : '0 auto 30px',
            lineHeight: '1.6',
            padding: isMobile ? '0 10px' : '0'
          }}>
            Discover comfort redefined. Premium quality innerwear for the whole family.
          </p>

          {/* Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section style={{
        paddingTop: isTablet ? '30px' : '40px',
        paddingBottom: isTablet ? '40px' : '60px',
        backgroundColor: '#fafafa'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: getContainerPadding()
        }}>
          {/* Filter Bar */}
          <div style={{ marginBottom: isTablet ? '20px' : '30px' }}>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortOption={sortOption}
              onSortChange={setSortOption}
              productCount={filteredAndSortedProducts.length}
            />
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: getGridColumns(),
              gap: isMobile ? '16px' : isTablet ? '20px' : '30px'
            }}>
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: isMobile ? '40px 20px' : '80px 20px' }}>
              <div style={{
                width: isMobile ? '80px' : '96px',
                height: isMobile ? '80px' : '96px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiPackage style={{
                  width: isMobile ? '36px' : '48px',
                  height: isMobile ? '36px' : '48px',
                  color: '#9ca3af'
                }} />
              </div>
              <h3 style={{
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '12px'
              }}>
                No products found
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#6b7280',
                marginBottom: '24px',
                maxWidth: '400px',
                margin: '0 auto 24px'
              }}>
                We couldn't find any products matching your criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                style={{
                  padding: isMobile ? '10px 20px' : '12px 24px',
                  backgroundColor: '#6366f1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#111827',
        color: '#ffffff',
        padding: isMobile ? '40px 0 24px' : '50px 0 30px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: getContainerPadding()
        }}>
          {/* Main Footer Content */}
          <div style={{
            display: 'flex',
            flexDirection: isTablet ? 'column' : 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: isTablet ? '30px' : '40px',
            marginBottom: isTablet ? '30px' : '40px'
          }}>
            {/* Brand */}
            <div style={{ maxWidth: isTablet ? '100%' : '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '14px'
                }}>
                  IW
                </div>
                <span style={{ fontSize: '18px', fontWeight: '700' }}>InnerWear Store</span>
              </div>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                Premium quality innerwear for the whole family. Comfort meets style.
              </p>
            </div>

            {/* Links */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, auto)',
              gap: isMobile ? '24px' : isTablet ? '40px' : '60px'
            }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Quick Links</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Home', 'Products', 'About Us', 'Contact'].map((link) => (
                    <a key={link} href="#" style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}>{link}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Categories</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Men', 'Women', 'Kids', 'Unisex'].map((link) => (
                    <a key={link} href="#" style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}>{link}</a>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: isMobile ? 'span 2' : 'auto' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Support</h4>
                <div style={{
                  display: isMobile ? 'grid' : 'flex',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'none',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {['FAQ', 'Shipping', 'Returns', 'Size Guide'].map((link) => (
                    <a key={link} href="#" style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}>{link}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ borderTop: '1px solid #374151', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              © 2026 InnerWear Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
