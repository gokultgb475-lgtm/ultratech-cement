import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/orders';
import {
  Package, ArrowLeft, ShoppingCart, ChevronRight, Shield, Truck, Clock,
  CreditCard, Wallet, Building2, Smartphone, CheckCircle, Tag, MapPin, Phone, User, Mail, MessageSquare, Gift
} from 'lucide-react';

const OFFERS = [
  { code: 'FIRST50', discount: 50, desc: '₹50 off on first order', minOrder: 500 },
  { code: 'BULK10', discount: 10, desc: '10% off on orders above ₹10,000', minOrder: 10000, isPercent: true },
  { code: 'FREE DELIVERY', discount: 0, desc: 'Free delivery on 50+ bags', minOrder: 0 },
];

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI / Google Pay', icon: Smartphone, desc: 'Pay via UPI ID or QR' },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, desc: 'All major banks supported' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, desc: 'Paytm, PhonePe, Amazon Pay' },
  { id: 'cod', label: 'Cash on Delivery', icon: Package, desc: 'Pay when cement arrives' },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof OFFERS[0] | null>(null);
  const [placing, setPlacing] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: 'Madurai', pincode: '', notes: '' });

  const deliveryFee = cartTotal >= 25000 ? 0 : 250;
  const gst = Math.round(cartTotal * 0.18);
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.isPercent ? Math.round(cartTotal * appliedCoupon.discount / 100) : appliedCoupon.discount;
  }
  const grandTotal = cartTotal + deliveryFee + gst - discount;

  const applyCoupon = () => {
    const found = OFFERS.find(o => o.code === coupon.toUpperCase() && cartTotal >= o.minOrder);
    if (found && found.discount > 0) { setAppliedCoupon(found); } else { alert('Invalid or inapplicable coupon'); }
  };

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const orderId = await createOrder({
        name: form.name,
        phone: form.phone,
        email: form.email,
        location: `${form.address}, ${form.city} - ${form.pincode}`,
        items: cart.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        total: grandTotal,
        subtotal: cartTotal,
        gst,
        delivery: deliveryFee,
        discount,
        paymentMethod,
        coupon: appliedCoupon?.code || '',
        notes: form.notes,
        source: 'checkout',
        orderType: 'purchase'
      });
      setOrderReference(orderId.slice(-8).toUpperCase());
      clearCart();
      setStep('success');
    } catch { alert('Failed to place order. Please try again.'); }
    finally { setPlacing(false); }
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="corp-shell min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-[#5A6474] mx-auto mb-6" />
          <h1 className="font-display font-bold text-3xl text-white mb-3">Cart is empty</h1>
          <Link to="/#products" className="btn-primary inline-flex items-center gap-2 mt-4">Browse Products <ChevronRight className="w-4 h-4" /></Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="corp-shell min-h-screen flex items-center justify-center px-6">
        <div className="corp-panel p-10 sm:p-16 text-center max-w-lg">
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-500/15 rounded-3xl flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-3">Order Placed!</h1>
          <p className="text-[#8B919D] mb-2">Your cement order has been confirmed and our team will contact you shortly.</p>
          <p className="text-[#FF4D2E] font-display font-bold text-2xl mb-6">₹{grandTotal.toLocaleString()}</p>
          {orderReference && <p className="text-sm text-[#E8ECF4] mb-2">Reference: #{orderReference}</p>}
          <p className="text-xs text-[#5A6474] mb-8">Payment: {PAYMENT_METHODS.find(p => p.id === paymentMethod)?.label}</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">Back to Home <ChevronRight className="w-4 h-4" /></Link>
        </div>
      </div>
    );
  }

  const shippingValid = form.name && form.phone && form.address && form.pincode;

  return (
    <div className="corp-shell min-h-screen">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF4D2E] to-[#E83A20] rounded-xl flex items-center justify-center shadow-[0_6px_16px_rgba(255,77,46,0.35)]">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white block">Ultratech Cement</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#FF8C42] font-medium">Secure Checkout</span>
            </div>
          </Link>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-[#8B919D] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </nav>

      {/* Steps indicator */}
      <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-12 pt-8">
        <div className="flex items-center gap-4 mb-10">
          {[{ id: 'shipping', label: 'Shipping' }, { id: 'payment', label: 'Payment' }].map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              {i > 0 && <div className="w-12 h-px bg-white/10" />}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${step === s.id ? 'bg-[#FF4D2E] text-white' : 'bg-white/5 border border-white/10 text-[#8B919D]'}`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1360px] px-6 pb-16 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8">
          {/* Left: Form */}
          <div>
            {step === 'shipping' && (
              <div className="space-y-6">
                <div className="corp-panel p-6 sm:p-8">
                  <h2 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#FF4D2E]" /> Delivery Address</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2"><User className="w-3.5 h-3.5 inline mr-1.5" />Full Name *</label>
                      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="corp-input" placeholder="Your full name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2"><Phone className="w-3.5 h-3.5 inline mr-1.5" />Phone *</label>
                      <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="corp-input" placeholder="10-digit mobile" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2"><Mail className="w-3.5 h-3.5 inline mr-1.5" />Email</label>
                      <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="corp-input" placeholder="email@example.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2"><MapPin className="w-3.5 h-3.5 inline mr-1.5" />Delivery Address *</label>
                      <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="corp-input resize-none" rows={3} placeholder="Street, area, landmark..." required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2">City</label>
                      <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="corp-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2">PIN Code *</label>
                      <input value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} className="corp-input" placeholder="625001" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2"><MessageSquare className="w-3.5 h-3.5 inline mr-1.5" />Delivery Notes</label>
                      <input value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="corp-input" placeholder="e.g. Call before delivery, unload near gate..." />
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="corp-panel p-6 sm:p-8">
                  <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2"><Truck className="w-5 h-5 text-[#FF4D2E]" /> Delivery Option</h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Same-Day Delivery', time: 'Order before 12 PM', price: cartTotal >= 25000 ? 'Free' : '₹250', active: true },
                      { label: 'Scheduled Delivery', time: 'Choose date (1-3 days)', price: 'Free', active: false },
                    ].map((opt, i) => (
                      <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${opt.active ? 'border-[#FF4D2E]/50 bg-[#FF4D2E]/5' : 'border-white/10 bg-white/5 opacity-60'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${opt.active ? 'border-[#FF4D2E]' : 'border-[#5A6474]'}`}>
                            {opt.active && <div className="w-2 h-2 rounded-full bg-[#FF4D2E]" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{opt.label}</p>
                            <p className="text-xs text-[#5A6474]">{opt.time}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${opt.price === 'Free' ? 'text-emerald-400' : 'text-[#FF4D2E]'}`}>{opt.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => { if (shippingValid) setStep('payment'); else alert('Please fill all required fields'); }} className="btn-primary w-full flex items-center justify-center gap-2">
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                {/* Offers / Coupons */}
                <div className="corp-panel p-6 sm:p-8">
                  <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2"><Gift className="w-5 h-5 text-[#FF4D2E]" /> Offers & Coupons</h2>
                  <div className="flex gap-3 mb-5">
                    <input value={coupon} onChange={e => setCoupon(e.target.value)} className="corp-input flex-1" placeholder="Enter coupon code" />
                    <button onClick={applyCoupon} className="px-5 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/15 transition-all">Apply</button>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-4">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400 font-medium">{appliedCoupon.code} applied — saving ₹{discount}</span>
                      <button onClick={() => setAppliedCoupon(null)} className="ml-auto text-xs text-[#8B919D] hover:text-red-400">Remove</button>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-3 gap-3">
                    {OFFERS.map(o => (
                      <div key={o.code} className="p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:border-[#FF4D2E]/30 transition-all" onClick={() => { setCoupon(o.code); }}>
                        <p className="text-xs font-bold text-[#FF4D2E] font-mono tracking-wider mb-1">{o.code}</p>
                        <p className="text-[11px] text-[#8B919D]">{o.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="corp-panel p-6 sm:p-8">
                  <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#FF4D2E]" /> Payment Method</h2>
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map(pm => {
                      const Icon = pm.icon;
                      const active = paymentMethod === pm.id;
                      return (
                        <div key={pm.id} onClick={() => setPaymentMethod(pm.id)} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${active ? 'border-[#FF4D2E]/50 bg-[#FF4D2E]/5' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${active ? 'border-[#FF4D2E]' : 'border-[#5A6474]'}`}>
                            {active && <div className="w-2 h-2 rounded-full bg-[#FF4D2E]" />}
                          </div>
                          <Icon className={`w-5 h-5 ${active ? 'text-[#FF4D2E]' : 'text-[#8B919D]'}`} />
                          <div>
                            <p className="text-sm font-medium text-white">{pm.label}</p>
                            <p className="text-xs text-[#5A6474]">{pm.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep('shipping')} className="flex-1 py-3.5 rounded-xl text-sm font-medium text-[#8B919D] bg-white/5 border border-white/10 hover:text-white transition-all">
                    <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
                  </button>
                  <button onClick={placeOrder} disabled={placing} className="btn-primary flex-[2] flex items-center justify-center gap-2">
                    {placing ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing...</> : <><Shield className="w-4 h-4" /> Place Order — ₹{grandTotal.toLocaleString()}</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit space-y-5">
            <div className="corp-panel p-6 sm:p-8">
              <h3 className="font-display font-bold text-xl text-white mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{item.name}</p>
                      <p className="text-xs text-[#5A6474]">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-white font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-[#8B919D]">Subtotal ({cartCount} items)</span><span className="text-white">₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#8B919D]">Delivery</span><span className={deliveryFee === 0 ? 'text-emerald-400' : 'text-white'}>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#8B919D]">GST (18%)</span><span className="text-white">₹{gst.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-sm"><span className="text-emerald-400">Discount ({appliedCoupon?.code})</span><span className="text-emerald-400">-₹{discount.toLocaleString()}</span></div>}
              </div>
              <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
                <span className="font-display font-bold text-white text-lg">Grand Total</span>
                <span className="font-display font-black text-2xl text-[#FF4D2E]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3">
              {[{ icon: Shield, text: '100% Genuine' }, { icon: Truck, text: 'Tracked Delivery' }, { icon: Clock, text: 'Fast Support' }].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 py-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <item.icon className="w-4 h-4 text-[#FF4D2E]" />
                  <span className="text-[10px] text-[#8B919D]">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Shipping info */}
            {step === 'payment' && form.name && (
              <div className="corp-panel p-5">
                <p className="text-[10px] uppercase tracking-wider text-[#5A6474] mb-2">Shipping to</p>
                <p className="text-sm text-white font-medium">{form.name}</p>
                <p className="text-xs text-[#8B919D] mt-1">{form.address}, {form.city} - {form.pincode}</p>
                <p className="text-xs text-[#8B919D]">{form.phone}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
