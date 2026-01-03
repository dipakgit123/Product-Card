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
    gstRate,
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <FiShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            <FiArrowLeft />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <button
            onClick={handleClearCart}
            className="text-red-500 hover:text-red-700 font-medium flex items-center gap-2 transition-colors"
          >
            <FiTrash2 />
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item._id}-${item.selectedSize}`}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-6 flex gap-4 sm:gap-6 animate-fadeIn"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        Size: <span className="font-medium">{item.selectedSize}</span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        Category: <span className="font-medium">{item.category}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.selectedSize, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.selectedSize, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">₹{item.price} each</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>GST ({(gstRate * 100).toFixed(0)}%)</span>
                  <span className="font-medium">₹{gstAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-indigo-600">₹{total.toLocaleString()}</span>
                </div>

                <div className="bg-indigo-50 rounded-lg p-3 mt-4">
                  <p className="text-sm text-indigo-700">
                    <span className="font-semibold">GST Breakdown:</span>
                    <br />
                    CGST (9%): ₹{(gstAmount / 2).toLocaleString()}
                    <br />
                    SGST (9%): ₹{(gstAmount / 2).toLocaleString()}
                  </p>
                </div>
              </div>

              <button className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all">
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="w-full mt-3 flex items-center justify-center gap-2 text-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors"
              >
                <FiArrowLeft />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
