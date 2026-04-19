import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';
import {
  ArrowLeft, ShoppingCart, Plus, Minus, Package, Shield,
  CheckCircle, Truck, Clock, Star, ChevronRight, Zap, Heart
} from 'lucide-react';
import { useState } from 'react';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="corp-shell min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-[#5A6474] mx-auto mb-6" />
          <h1 className="font-display font-bold text-3xl text-white mb-3">Product not found</h1>
          <p className="text-[#8B919D] mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/#products" className="btn-primary inline-flex items-center gap-2">
            Browse Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const cartItem = cart.find(item => item.id === product.id);
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="corp-shell min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF4D2E] to-[#E83A20] rounded-xl flex items-center justify-center shadow-[0_6px_16px_rgba(255,77,46,0.35)]">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white leading-none block">Ultratech Cement</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#FF8C42] font-medium">Madurai Dealer</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-[#8B919D] hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <Link to="/cart" className="relative p-2.5 hover:bg-white/10 rounded-xl transition-all">
              <ShoppingCart className="w-5 h-5 text-[#C0C7D4]" />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#FF4D2E] rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-12 pt-6">
        <div className="flex items-center gap-2 text-sm text-[#5A6474]">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/#products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#E8ECF4]">{product.name}</span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1360px] px-6 py-10 lg:px-12">
        {/* Product Hero Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Image */}
          <div className="relative rounded-[28px] overflow-hidden" style={{ background: product.tone }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_50%)]" />

            {/* Badges */}
            <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
              <span className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-xs uppercase tracking-[0.22em] text-white/90 font-semibold">
                {product.badge}
              </span>
              {product.tag && (
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF4D2E] to-[#E83A20] text-white text-xs font-bold shadow-[0_4px_16px_rgba(255,77,46,0.5)]">
                  {product.customerFavorite && <Heart className="w-3 h-3 inline mr-1.5 fill-white" />}
                  {product.tag}
                </span>
              )}
            </div>

            <div className="relative h-[380px] sm:h-[450px] flex items-end justify-center pb-8">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[320px] sm:max-h-[380px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.22em] text-[#A0AAB8] font-semibold">
                Grade {product.grade}
              </span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" style={{ opacity: s <= 4 ? 1 : 0.3 }} />
                ))}
                <span className="text-xs text-[#8B919D] ml-1.5">4.0</span>
              </div>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-[#8B919D] text-lg leading-relaxed mb-6">
              {product.fullDescription}
            </p>

            {/* Price */}
            <div className="flex items-end gap-3 mb-8">
              <span className="font-display font-black text-4xl text-[#FF4D2E]">₹{product.price}</span>
              <span className="text-[#5A6474] text-sm pb-1.5">per {product.weightPerBag} bag</span>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Zap, label: 'Strength', value: `${product.strength} MPa` },
                { icon: Clock, label: 'Setting', value: product.settingTime.split('/')[0].trim() },
                { icon: Package, label: 'Weight', value: product.weightPerBag }
              ].map((spec, i) => (
                <div key={i} className="corp-panel-soft p-3 text-center">
                  <spec.icon className="w-4 h-4 text-[#FF4D2E] mx-auto mb-1.5" />
                  <p className="text-[10px] uppercase tracking-wider text-[#5A6474] mb-0.5">{spec.label}</p>
                  <p className="text-sm font-bold text-white">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1.5">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Minus className="w-4 h-4 text-[#C0C7D4]" />
                </button>
                <span className="text-lg font-bold w-10 text-center text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Plus className="w-4 h-4 text-[#C0C7D4]" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn-primary flex-1 flex items-center justify-center gap-2 ${addedToCart ? '!bg-emerald-600' : ''}`}
              >
                {addedToCart ? (
                  <><CheckCircle className="w-4 h-4" /> Added to Cart!</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Add {quantity} to Cart — ₹{(product.price * quantity).toLocaleString()}</>
                )}
              </button>
            </div>

            {cartItem && (
              <p className="text-xs text-emerald-400 mb-4">
                <CheckCircle className="w-3 h-3 inline mr-1" /> {cartItem.quantity} already in cart
              </p>
            )}

            {/* Trust Strip */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              {[
                { icon: Shield, text: 'Genuine Ultratech' },
                { icon: Truck, text: 'Same-day delivery' },
                { icon: CheckCircle, text: 'In Stock' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#8B919D]">
                  <item.icon className="w-3.5 h-3.5 text-emerald-400" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Tabs Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Applications */}
          <div className="corp-panel p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FF4D2E]" /> Applications
            </h3>
            <div className="space-y-3">
              {product.applications.map((app, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-[#E8ECF4]">{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="corp-panel p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#FF4D2E]" /> Key Features
            </h3>
            <div className="space-y-3">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2E] flex-shrink-0" />
                  <span className="text-[#E8ECF4]">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="corp-panel p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#FF4D2E]" /> Specifications
            </h3>
            <div className="space-y-3">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                  <span className="text-[#8B919D]">{spec.label}</span>
                  <span className="text-white font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Favorites Section */}
        {products.filter(p => p.customerFavorite && p.id !== product.id).length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Heart className="w-5 h-5 text-[#FF4D2E]" />
              <h2 className="font-display font-bold text-2xl text-white">Customer Favourites</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.customerFavorite && p.id !== product.id).map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="corp-panel p-5 group hover:border-[#FF4D2E]/30 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: p.tone }}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white group-hover:text-[#FF4D2E] transition-colors">{p.name}</h4>
                      <p className="text-xs text-[#5A6474] mt-0.5">{p.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-xl text-[#FF4D2E]">₹{p.price}</span>
                    {p.tag && (
                      <span className="text-xs bg-[#FF4D2E]/15 text-[#FF4D2E] px-2.5 py-1 rounded-full font-medium">{p.tag}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-2xl text-white mb-8">Other Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="corp-panel p-5 group hover:border-[#FF4D2E]/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: p.tone }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white group-hover:text-[#FF4D2E] transition-colors">{p.name}</h4>
                    <p className="text-xs text-[#5A6474] mt-0.5">{p.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-xl text-[#FF4D2E]">₹{p.price}</span>
                  <span className="text-xs bg-white/5 text-[#8B919D] px-3 py-1.5 rounded-full font-medium border border-white/10 group-hover:text-white group-hover:border-[#FF4D2E]/30 transition-all">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
