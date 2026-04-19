import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import {
  ShoppingCart, Plus, Minus, Package, Trash2,
  ArrowLeft, ChevronRight, Truck, Shield, Clock
} from 'lucide-react';

export function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <div className="corp-shell min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF4D2E] to-[#E83A20] rounded-xl flex items-center justify-center shadow-[0_6px_16px_rgba(255,77,46,0.35)]">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white leading-none block">Ultratech Cement</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#FF8C42] font-medium">Madurai Dealer</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-[#8B919D] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Continue Shopping</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-[1360px] px-6 py-10 lg:px-12 lg:py-14">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-[#FF4D2E]/15 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-7 h-7 text-[#FF4D2E]" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">Your Cart</h1>
            <p className="text-[#8B919D] text-sm mt-1">
              {cartCount === 0 ? 'No items yet' : `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart`}
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="corp-panel p-12 sm:p-16 text-center max-w-xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 bg-white/5 rounded-3xl flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-[#5A6474]" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-3">Your cart is empty</h2>
            <p className="text-[#8B919D] mb-8 max-w-sm mx-auto">
              Browse our premium cement products and add items to your cart to get started.
            </p>
            <Link
              to="/#products"
              className="btn-primary inline-flex items-center gap-2"
            >
              Browse Products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="corp-panel p-5 sm:p-6 flex gap-5 group hover:border-[#FF4D2E]/20 transition-all"
                >
                  {/* Image */}
                  <div className="w-24 h-28 sm:w-32 sm:h-36 rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display font-bold text-lg text-white">{item.name}</h3>
                          <p className="text-xs text-[#5A6474] mt-0.5">{item.description}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-[#5A6474] hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-[#FF4D2E]/15 text-[#FF4D2E] px-2.5 py-1 rounded-full font-medium">
                          {item.badge}
                        </span>
                        <span className="text-xs text-[#5A6474]">Grade: {item.grade}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-[#C0C7D4]" />
                        </button>
                        <span className="text-sm font-bold w-8 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#C0C7D4]" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-display font-black text-xl text-[#FF4D2E]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-[#5A6474]">₹{item.price}/bag × {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:sticky lg:top-24 h-fit space-y-5">
              <div className="corp-panel p-6 sm:p-8">
                <h3 className="font-display font-bold text-xl text-white mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-[#8B919D] truncate mr-3">{item.name} × {item.quantity}</span>
                      <span className="text-white font-semibold flex-shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B919D]">Subtotal</span>
                    <span className="text-white font-medium">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B919D]">Delivery</span>
                    <span className="text-emerald-400 font-medium">
                      {cartTotal >= 25000 ? 'Free' : 'Calculated at checkout'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 mt-4 pt-4 flex items-center justify-between">
                  <span className="font-display font-bold text-white text-lg">Total</span>
                  <span className="font-display font-black text-2xl text-[#FF4D2E]">₹{cartTotal.toLocaleString()}</span>
                </div>

                <Link
                  to="/checkout"
                  className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
                >
                  <ChevronRight className="w-4 h-4" /> Proceed to Checkout
                </Link>

                <Link
                  to="/#products"
                  className="w-full flex items-center justify-center gap-2 mt-3 py-3 rounded-xl text-sm font-medium text-[#8B919D] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: 'Genuine' },
                  { icon: Truck, text: 'Same day' },
                  { icon: Clock, text: 'Fast reply' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 py-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <item.icon className="w-4 h-4 text-[#FF4D2E]" />
                    <span className="text-xs text-[#8B919D]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
