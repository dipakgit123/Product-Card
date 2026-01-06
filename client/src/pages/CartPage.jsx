import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CartPage = () => {
  const {
    items,
    cartCount,
    subtotal,
    gstAmount,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const handleRemove = (item) => {
    removeFromCart(item._id, item.selectedSize);
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  if (items.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        paddingTop: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '100px',
            height: '100px',
            margin: '0 auto 24px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiShoppingBag style={{ width: '48px', height: '48px', color: '#d1d5db' }} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
            Your cart is empty
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
            Start shopping to add items to your cart
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            <FiArrowLeft style={{ width: '16px', height: '16px' }} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
              Shopping Cart
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={handleClearCart}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              backgroundColor: '#ffffff',
              color: '#ef4444',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            <FiTrash2 style={{ width: '14px', height: '14px' }} />
            Clear Cart
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((item) => (
              <div
                key={`${item._id}-${item.selectedSize}`}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  gap: '20px',
                  border: '1px solid #e5e7eb'
                }}
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                />

                {/* Product Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#6b7280' }}>
                        Size: {item.selectedSize} • {item.category}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item)}
                      style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fef2f2',
                        color: '#ef4444',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <FiTrash2 style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '4px' }}>
                      <button
                        onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          opacity: item.quantity <= 1 ? 0.5 : 1
                        }}
                      >
                        <FiMinus style={{ width: '14px', height: '14px' }} />
                      </button>
                      <span style={{ width: '32px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <FiPlus style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p style={{ fontSize: '12px', color: '#9ca3af' }}>₹{item.price.toLocaleString()} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Link */}
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#6366f1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                marginTop: '10px'
              }}
            >
              <FiArrowLeft style={{ width: '14px', height: '14px' }} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb',
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280' }}>Subtotal ({cartCount} items)</span>
                  <span style={{ fontWeight: '600', color: '#1f2937' }}>₹{subtotal.toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280' }}>Shipping</span>
                  <span style={{ fontWeight: '600', color: '#059669' }}>FREE</span>
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px', marginTop: '4px' }}>
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    padding: '12px'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>
                      GST (18%)
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280' }}>
                      <span>CGST (9%)</span>
                      <span>₹{(gstAmount / 2).toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                      <span>SGST (9%)</span>
                      <span>₹{(gstAmount / 2).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>Total</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '22px', fontWeight: '800', color: '#1f2937' }}>
                        ₹{total.toLocaleString()}
                      </span>
                      <p style={{ fontSize: '11px', color: '#9ca3af' }}>Inclusive of all taxes</p>
                    </div>
                  </div>
                </div>
              </div>

              <button style={{
                width: '100%',
                marginTop: '20px',
                padding: '14px',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Proceed to Checkout
              </button>

              <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '12px' }}>
                Secure checkout • Free returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
