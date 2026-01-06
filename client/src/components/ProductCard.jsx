import { useState } from 'react';
import { FiShoppingCart, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');

  // Check if this product with selected size is already in cart
  const cartItem = items.find(
    (item) => item._id === product._id && item.selectedSize === selectedSize
  );
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    toast.success(`${product.name} added to cart!`);
  };

  const handleIncrement = () => {
    updateQuantity(product._id, selectedSize, quantityInCart + 1);
  };

  const handleDecrement = () => {
    if (quantityInCart === 1) {
      removeFromCart(product._id, selectedSize);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(product._id, selectedSize, quantityInCart - 1);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Men: '#3b82f6',
      Women: '#ec4899',
      Kids: '#f59e0b',
      Unisex: '#8b5cf6',
    };
    return colors[category] || '#6b7280';
  };

  const originalPrice = Math.round(product.price * 1.2);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid #f3f4f6'
    }}>
      {/* Image Container */}
      <div style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#f9fafb' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Category Badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: getCategoryColor(product.category),
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: '700',
          padding: '4px 10px',
          borderRadius: '6px'
        }}>
          {product.category}
        </span>

        {/* Discount Badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: '#059669',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: '700',
          padding: '4px 8px',
          borderRadius: '6px'
        }}>
          {discount}% OFF
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Product Name */}
        <h3 style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '6px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          marginBottom: '12px',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.description}
        </p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#1f2937' }}>
            ₹{product.price.toLocaleString()}
          </span>
          <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>
            ₹{originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Size Selection */}
        <div style={{ marginBottom: '14px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
            Size
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  minWidth: '36px',
                  height: '32px',
                  padding: '0 10px',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: selectedSize === size ? 'none' : '1px solid #e5e7eb',
                  backgroundColor: selectedSize === size ? '#6366f1' : '#ffffff',
                  color: selectedSize === size ? '#ffffff' : '#4b5563'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button or Quantity Controls */}
        {quantityInCart > 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f3f4f6',
            borderRadius: '10px',
            padding: '4px'
          }}>
            <button
              onClick={handleDecrement}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: quantityInCart === 1 ? '#fef2f2' : '#ffffff',
                color: quantityInCart === 1 ? '#ef4444' : '#4b5563',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {quantityInCart === 1 ? (
                <FiTrash2 style={{ width: '18px', height: '18px' }} />
              ) : (
                <FiMinus style={{ width: '18px', height: '18px' }} />
              )}
            </button>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1f2937',
              minWidth: '40px',
              textAlign: 'center'
            }}>
              {quantityInCart}
            </span>
            <button
              onClick={handleIncrement}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <FiPlus style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              backgroundColor: product.inStock ? '#6366f1' : '#d1d5db',
              color: '#ffffff'
            }}
          >
            <FiShoppingCart style={{ width: '16px', height: '16px' }} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
