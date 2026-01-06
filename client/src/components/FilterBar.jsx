import { useState, useEffect } from 'react';
import { FiChevronDown, FiFilter } from 'react-icons/fi';

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  productCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 600;

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  const selectedSortLabel = sortOptions.find((opt) => opt.value === sortOption)?.label || 'Sort';

  // Mobile Layout
  if (isMobile) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #e5e7eb'
      }}>
        {/* Top Row - Count and Sort */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
            {productCount} Products
          </span>

          {/* Sort Dropdown */}
          <div style={{ position: 'relative', zIndex: 9999 }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              <span>{selectedSortLabel}</span>
              <FiChevronDown
                style={{
                  width: '14px',
                  height: '14px',
                  transition: 'transform 0.2s',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)'
                }}
              />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  right: 0,
                  minWidth: '160px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  zIndex: 9999
                }}>
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: sortOption === option.value ? '#eef2ff' : '#ffffff',
                        color: sortOption === option.value ? '#6366f1' : '#4b5563'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Category Pills - Scrollable */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: isSelected ? '#6366f1' : '#f3f4f6',
                  color: isSelected ? '#ffffff' : '#4b5563',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      padding: '14px 20px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Left Side - Category Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
          {productCount} Products
        </span>
        <div style={{ width: '1px', height: '20px', backgroundColor: '#e5e7eb' }}></div>
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: isSelected ? '#6366f1' : '#f3f4f6',
                color: isSelected ? '#ffffff' : '#4b5563'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Right Side - Sort Dropdown */}
      <div style={{ position: 'relative', zIndex: 9999 }}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '500',
            color: '#374151',
            cursor: 'pointer'
          }}
        >
          <span>Sort: {selectedSortLabel}</span>
          <FiChevronDown
            style={{
              width: '14px',
              height: '14px',
              transition: 'transform 0.2s',
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)'
            }}
          />
        </button>

        {isDropdownOpen && (
          <>
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
              onClick={() => setIsDropdownOpen(false)}
            />
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              right: 0,
              minWidth: '180px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              zIndex: 9999
            }}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: sortOption === option.value ? '#eef2ff' : '#ffffff',
                    color: sortOption === option.value ? '#6366f1' : '#4b5563'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
