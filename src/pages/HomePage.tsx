import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';
import { 
  ShoppingCart, Plus, Phone, MapPin, 
  Truck, Package, Shield, CheckCircle,
  Menu, ChevronRight, User, MessageSquare,
  Star, Zap, Award, ArrowUpRight, Clock, Heart
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { cart, addToCart, clearCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
    quantity: '',
    message: '',
    location: ''
  });

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-headline', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-subheadline',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.7, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-product',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
      );

      // Capabilities section
      ScrollTrigger.create({
        trigger: capabilitiesRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.cap-headline', 
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
          gsap.fromTo('.cap-card',
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true
      });

      // Products section
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.prod-headline',
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
          gsap.fromTo('.prod-card',
            { x: 100, opacity: 0, rotateY: 15 },
            { x: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true
      });

      // Why Us section
      ScrollTrigger.create({
        trigger: whyUsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.whyus-image',
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
          gsap.fromTo('.whyus-content',
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true
      });

      // Delivery section
      ScrollTrigger.create({
        trigger: deliveryRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.deliv-content',
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
          gsap.fromTo('.deliv-image',
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true
      });

      // Testimonial section
      ScrollTrigger.create({
        trigger: testimonialRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.test-quote',
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
          gsap.fromTo('.test-image',
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
          );
        },
        once: true
      });

      // Quality section
      ScrollTrigger.create({
        trigger: qualityRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.qual-bg',
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
          );
          gsap.fromTo('.qual-text',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
          );
        },
        once: true
      });

      // Regions section
      ScrollTrigger.create({
        trigger: regionsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.reg-content',
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
          gsap.fromTo('.reg-map',
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true
      });

      // Contact section
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.contact-left',
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
          gsap.fromTo('.contact-form',
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 }
          );
        },
        once: true
      });

      // Footer section
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo('.footer-content',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, []);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Save order to Firestore
      await addDoc(collection(db, 'orders'), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: cartTotal,
        status: 'pending',
        createdAt: Timestamp.now()
      });

      setOrderSuccess(true);
      clearCart();
      setFormData({ name: '', phone: '', email: '', requirement: '', quantity: '', message: '', location: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setOrderSuccess(false), 5000);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you within 1 hour.');
    setFormData({ name: '', phone: '', email: '', requirement: '', quantity: '', message: '', location: '' });
  };

  return (
    <div className="corp-shell relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Success Message */}
      {orderSuccess && (
        <div className="success-toast fixed top-20 left-1/2 -translate-x-1/2 z-[70] py-4 px-6 bg-[#141C2D] border border-emerald-500/30 rounded-2xl flex items-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-medium text-white">Order placed successfully!</p>
            <p className="text-sm text-[#8B919D]">Admin will review it shortly.</p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════
          NAVIGATION - Enhanced Glassmorphism
          ════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className={`mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-[1360px] items-center justify-between rounded-full navbar-glass px-6 py-4 lg:px-8 transition-all duration-300 ${navScrolled ? 'mt-2 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.3)]' : ''}`}>
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF4D2E] to-[#E83A20] rounded-xl flex items-center justify-center shadow-[0_6px_16px_rgba(255,77,46,0.35)] group-hover:shadow-[0_8px_22px_rgba(255,77,46,0.5)] transition-shadow">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white leading-none block">Ultratech Cement</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#FF8C42] font-medium">Madurai Dealer</span>
            </div>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="nav-link text-[#8B919D] hover:text-white transition-colors text-sm font-medium">Products</a>
            <a href="#delivery" className="nav-link text-[#8B919D] hover:text-white transition-colors text-sm font-medium">Delivery</a>
            <a href="#regions" className="nav-link text-[#8B919D] hover:text-white transition-colors text-sm font-medium">Areas</a>
            <a href="#contact" className="nav-link text-[#8B919D] hover:text-white transition-colors text-sm font-medium">Contact</a>
            <a href="/login" className="nav-link text-[#8B919D] hover:text-white transition-colors text-sm font-medium">Admin</a>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 text-[#C0C7D4] group-hover:text-[#FF4D2E] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#FF4D2E] to-[#E83A20] rounded-full text-xs flex items-center justify-center text-white font-bold shadow-[0_4px_10px_rgba(255,77,46,0.5)] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <a href="#contact" className="hidden sm:flex btn-primary text-sm items-center gap-2">
              Get a quote <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-[#C0C7D4]" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu-enter md:hidden mx-4 mt-2 rounded-2xl bg-[#141C2D]/95 backdrop-blur-xl border border-white/10 px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <a href="#products" onClick={() => setIsMenuOpen(false)} className="block py-3 text-[#E8ECF4] font-medium border-b border-white/5">Products</a>
            <a href="#delivery" onClick={() => setIsMenuOpen(false)} className="block py-3 text-[#E8ECF4] font-medium border-b border-white/5">Delivery</a>
            <a href="#regions" onClick={() => setIsMenuOpen(false)} className="block py-3 text-[#E8ECF4] font-medium border-b border-white/5">Areas</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block py-3 text-[#E8ECF4] font-medium border-b border-white/5">Contact</a>
            <a href="/login" onClick={() => setIsMenuOpen(false)} className="block py-3 text-[#FF4D2E] font-medium">Admin Portal →</a>
          </div>
        )}
      </nav>


      {/* ════════════════════════════════════
          SECTION 1: HERO - Premium Redesign
          ════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="hero-section min-h-screen flex items-center pt-24 relative overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 hero-bg-gradient" />
        <div className="absolute inset-0 homepage-grid opacity-40" />
        <div className="absolute -left-24 top-20 h-[500px] w-[500px] rounded-full bg-[#FF4D2E]/8 blur-[100px] animate-pulse" />
        <div className="absolute right-[-6rem] top-[-2rem] h-[600px] w-[600px] rounded-full bg-[#FF8C42]/6 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[80%] bg-[#FF4D2E]/4 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0E17]/80 to-transparent" />

        <div className="w-full px-6 lg:px-16 py-16 relative z-10">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 xl:gap-20 items-center min-h-[85vh]">
            
            {/* LEFT: Content */}
            <div className="flex flex-col justify-center">
              {/* Trust badge */}
              <div className="hero-subheadline inline-flex items-center gap-3 mb-7 w-fit">
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-sm text-[#A0AAB8]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D2E] opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4D2E]" />
                  </span>
                  <span className="font-medium">Authorized Ultratech Dealer</span>
                  <span className="w-px h-4 bg-white/10" />
                  <span className="text-[#FF4D2E] font-semibold">Madurai</span>
                </div>
              </div>

              {/* Main headline */}
              <div className="hero-headline mb-7">
                <h1 className="font-display font-extrabold text-[clamp(2.6rem,6vw,4.8rem)] text-white leading-[0.88] tracking-[-0.04em]">
                  <span className="block">Build stronger.</span>
                  <span className="block text-gradient-warm">Deliver faster.</span>
                  <span className="block">Plan smarter.</span>
                </h1>
              </div>

              <p className="hero-subheadline text-[#8B919D] text-[1.1rem] lg:text-xl max-w-lg mb-9 leading-relaxed font-light">
                Madurai's most reliable Ultratech cement dealer — stocked for contractors,
                priced fairly, delivered the same day.
              </p>

              {/* CTA Row */}
              <div className="hero-cta flex flex-wrap gap-4 mb-10">
                <a href="#contact" className="btn-primary flex items-center gap-2.5 text-base px-8 py-4 rounded-2xl shadow-[0_12px_40px_rgba(255,77,46,0.35)]">
                  <Phone className="w-4 h-4" /> Get a Quote
                </a>
                <a href="#products" className="hero-outline-btn flex items-center gap-2.5">
                  <Package className="w-4 h-4" /> View Products <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* Stats row */}
              <div className="hero-cta grid grid-cols-3 gap-3">
                {[
                  { label: 'Ready Stock', value: '2500+', note: 'Bags', icon: Package },
                  { label: 'Delivery', value: 'Same Day', note: 'Local Routes', icon: Truck },
                  { label: 'Grades', value: '6', note: 'Product Types', icon: Award },
                ].map((item, idx) => (
                  <div key={idx} className="hero-stat-card group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#FF4D2E]/15 flex items-center justify-center">
                        <item.icon className="w-3.5 h-3.5 text-[#FF4D2E]" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#5A6474] font-semibold">{item.label}</p>
                    </div>
                    <p className="font-display text-2xl text-white font-bold leading-none">{item.value}</p>
                    <p className="text-xs text-[#5A6474] mt-1">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Visual showcase */}
            <div className="hero-product relative">
              <div className="hero-visual-container">
                {/* Top chips */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="hero-feature-chip">
                    <Zap className="w-3.5 h-3.5 text-[#FF4D2E]" />
                    <span>Dispatch Ready</span>
                  </span>
                  <span className="hero-feature-chip">
                    <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>BIS Certified</span>
                  </span>
                  <span className="hero-feature-chip">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>4.9 / 5 Rating</span>
                  </span>
                </div>

                {/* Main visual card */}
                <div className="hero-main-visual-card">
                  {/* Floating price badge */}
                  <div className="hero-floating-price">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#5A6474]">Starting from</p>
                    <p className="text-3xl font-display font-black text-[#FF4D2E] mt-1">₹380<span className="text-base font-normal text-[#5A6474]">/bag</span></p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <p className="text-[10px] text-emerald-400 font-semibold">In stock today</p>
                    </div>
                  </div>

                  {/* Coverage badge */}
                  <div className="absolute left-5 top-5 z-20 rounded-xl border border-white/10 bg-[#0A0E17]/85 backdrop-blur px-4 py-2.5 shadow-lg">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#5A6474]">Coverage Area</p>
                    <p className="text-sm font-bold text-white mt-0.5">Madurai & Districts</p>
                  </div>

                  {/* Orbits */}
                  <div className="hero-orbit hero-orbit-three" />
                  <div className="hero-orbit hero-orbit-two" />
                  <div className="hero-orbit hero-orbit-one" />

                  {/* Bag */}
                  <div className="hero-bag-stage">
                    <div className="hero-bag-glow" />
                    <div className="hero-bag-backplate" />
                    <img
                      src="/hero_cement_bag.png"
                      alt="Ultratech Cement Bag"
                      className="relative z-10 w-64 sm:w-72 lg:w-80 float-animation drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]"
                    />
                    <div className="hero-bag-shadow" />
                  </div>

                  {/* Bottom ribbon */}
                  <div className="hero-ribbon-card">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#5A6474]">Bestseller</p>
                      <p className="text-lg font-display font-bold text-white mt-0.5">OPC 53 Grade</p>
                    </div>
                    <div className="hidden h-10 w-px bg-white/10 sm:block" />
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                      </div>
                      <p className="text-xs text-[#5A6474]">500+ orders this month</p>
                    </div>
                  </div>
                </div>

                {/* Bottom info cards */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="hero-note-card group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-[#FF4D2E]/15 flex items-center justify-center">
                        <Truck className="w-3 h-3 text-[#FF4D2E]" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#5A6474] font-semibold">Delivery</p>
                    </div>
                    <p className="text-sm font-semibold text-white">Same-day dispatch</p>
                    <p className="text-xs text-[#5A6474] mt-0.5">Orders before 2 PM</p>
                  </div>
                  <div className="hero-note-card group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#5A6474] font-semibold">Quality</p>
                    </div>
                    <p className="text-sm font-semibold text-white">100% Genuine</p>
                    <p className="text-xs text-[#5A6474] mt-0.5">Direct from Ultratech</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical label */}
        <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2">
          <span className="font-mono-label text-[10px] text-[#3A4050] uppercase tracking-[0.25em]" style={{ writingMode: 'vertical-rl' }}>
            Premium stock • Madurai dealer • Fast dispatch
          </span>
        </div>
      </section>

      {/* ════════════════════════════════════
          MARQUEE TRUST STRIP - New Addition
          ════════════════════════════════════ */}
      <div className="relative py-5 bg-[#0D1221] overflow-hidden border-y border-white/5">
        <div className="marquee-track">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-12 flex-shrink-0">
              {['Authorized Ultratech Dealer', '2500+ Bags Ready', 'Same-Day Delivery', 'ISO Certified Quality', 'Madurai Region Coverage', 'Genuine Products Only', 'Transparent Pricing', 'Bulk Order Discounts'].map((text, i) => (
                <div key={`${setIdx}-${i}`} className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2E]" />
                  <span className="text-sm font-medium text-white/40 whitespace-nowrap">{text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          SECTION 2: CAPABILITIES - Enhanced
          ════════════════════════════════════ */}
      <section ref={capabilitiesRef} className="py-24 lg:py-32 relative bg-[#0D1221]">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="cap-headline">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#A0AAB8] text-xs uppercase tracking-[0.24em] font-semibold">
                <Star className="w-3 h-3 text-[#FF4D2E]" /> Why we're different
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                Strength you can <span className="text-gradient-warm">plan around.</span>
              </h2>
            </div>
            <div className="cap-paragraph flex items-end">
              <p className="text-[#8B919D] text-lg leading-relaxed">
                We stock a full range of Ultratech grades and deliver with scheduled reliability—so your site never waits.
              </p>
            </div>
          </div>
          
          {/* Big stat number */}
          <div className="relative mb-12">
            <span className="stat-number absolute -top-20 left-0">100K+</span>
          </div>
          
          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <div className="cap-card feature-wash-card group">
              <div className="icon-container w-14 h-14 bg-[#FF4D2E]/15 rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-[#FF4D2E]" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-3">Bulk Orders</h3>
              <p className="text-[#8B919D] text-sm leading-relaxed mb-4">
                Competitive pricing for 50+ bag orders with invoice support.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#FF4D2E] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
            
            <div className="cap-card feature-wash-card group">
              <div className="icon-container w-14 h-14 bg-[#FF4D2E]/15 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-7 h-7 text-[#FF4D2E]" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-3">Daily Delivery</h3>
              <p className="text-[#8B919D] text-sm leading-relaxed mb-4">
                Same-day or next-day delivery across Madurai region.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#FF4D2E] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
            
            <div className="cap-card feature-wash-card group">
              <div className="icon-container w-14 h-14 bg-[#FF4D2E]/15 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[#FF4D2E]" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-3">Quality Assured</h3>
              <p className="text-[#8B919D] text-sm leading-relaxed mb-4">
                Fresh stock, proper storage, and genuine Ultratech guarantee.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#FF4D2E] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 3: PRODUCTS - Enhanced
          ════════════════════════════════════ */}
      <section id="products" ref={productsRef} className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0E17]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,77,46,0.08),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,140,66,0.05),transparent_24%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(13,18,33,0.8),transparent)] pointer-events-none" />
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="prod-headline">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#A0AAB8] text-xs uppercase tracking-[0.24em] font-semibold">
                <Package className="w-3 h-3 text-[#FF4D2E]" /> Product catalog
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                Choose the <span className="text-gradient-warm">right grade.</span>
              </h2>
              <p className="text-[#8B919D] text-lg leading-relaxed max-w-md">
                From slabs to waterproofing—pick the cement built for the job.
              </p>
            </div>
            <div className="prod-headline lg:justify-self-end">
              <div className="hero-metric-card max-w-md shimmer-hover">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#FF4D2E]/15 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#FF4D2E]" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#5A6474]">Dealer inventory</p>
                </div>
                <p className="font-display text-3xl text-white font-bold">{products.length} core options</p>
                <p className="text-sm text-[#8B919D] mt-3">
                  Designed for residential builds, contractor pours, finishing work, and repeat
                  dispatches from one storefront.
                </p>
              </div>
            </div>
          </div>
          
          {/* Product cards - Premium Redesign */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`prod-card premium-product-card group ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-1 featured-product' : ''
                }`}
              >
                {/* Image/Visual Panel */}
                <div className="product-visual-panel relative h-64 overflow-hidden" style={{ background: product.tone }}>
                  {/* Noise texture overlay */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                  {/* Light sheen */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.2),transparent_50%)]" />
                  
                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                    <span className="px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.22em] text-white/90 font-semibold">
                      {product.badge}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                      {product.grade}
                    </span>
                  </div>

                  {/* Bestseller ribbon */}
                  {index === 0 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-gradient-to-r from-[#FF4D2E] to-[#E83A20] rounded-full text-white text-[9px] uppercase tracking-[0.25em] font-bold shadow-[0_4px_16px_rgba(255,77,46,0.5)]">
                      ★ Bestseller
                    </div>
                  )}

                  {/* Product image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute bottom-0 right-3 w-36 sm:w-40 object-contain z-10 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-[-4deg] drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                  />

                  {/* Bottom "best for" glass panel */}
                  <div className="absolute inset-x-4 bottom-4 z-20 rounded-xl bg-black/35 backdrop-blur-xl border border-white/10 px-4 py-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">Best for</p>
                        <p className="text-sm text-white font-medium mt-0.5">{product.bestFor}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <div key={s} className="w-1.5 h-1.5 rounded-full bg-[#FF4D2E]" style={{ opacity: s <= 4 ? 1 : 0.3 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="product-card-body p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white leading-tight">{product.name}</h3>
                      <p className="text-xs text-[#5A6474] mt-1 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0 ml-3">
                      <span className="text-[#FF4D2E] font-black text-xl font-display">₹{product.price}</span>
                      <span className="text-[#5A6474] text-[10px] font-mono-label">/ 50kg bag</span>
                    </div>
                  </div>

                  {/* Strength bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#5A6474] font-semibold">Strength Grade</p>
                      <span className="text-[10px] text-[#FF4D2E] font-bold">{product.grade === 'BULK' ? '53' : product.grade === 'MC' ? '30' : product.grade === 'PSC' ? '40' : product.grade === 'PPC' ? '33' : product.grade}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#FF4D2E] to-[#FF8C42] transition-all duration-500"
                        style={{ width: product.grade === '53' || product.grade === 'BULK' ? '95%' : product.grade === '43' ? '78%' : product.grade === 'PSC' ? '70%' : product.grade === 'PPC' ? '65%' : '55%' }}
                      />
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-semibold">In Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="text-xs text-[#8B919D] hover:text-white px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        className="product-add-btn group/btn flex items-center gap-2"
                      >
                        <span>Add to Cart</span>
                        <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover/btn:rotate-90 transition-transform duration-300">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 4: WHY CHOOSE US - Enhanced
          ════════════════════════════════════ */}
      <section ref={whyUsRef} className="py-24 lg:py-32 relative bg-[#0D1221]">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="whyus-image relative">
              <div className="relative rounded-[28px] overflow-hidden group">
                <img 
                  src="/why_dealer.jpg" 
                  alt="Cement Warehouse" 
                  className="w-full h-[400px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F]/70 via-[#0B0C0F]/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <span className="bg-gradient-to-r from-[#FF4D2E] to-[#E83A20] text-white text-xs font-mono-label uppercase px-4 py-2.5 rounded-full shadow-[0_8px_20px_rgba(255,77,46,0.35)]">
                    ✓ Authorized Dealer
                  </span>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
                        <Star className="w-3 h-3 text-amber-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 lg:-right-8 lg:-bottom-6 bg-[#141C2D] rounded-2xl border border-white/10 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] float-badge">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white">10+ Years</p>
                    <p className="text-xs text-[#8B919D]">Trusted service</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="whyus-content">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#A0AAB8] text-xs uppercase tracking-[0.24em] font-semibold">
                <Heart className="w-3 h-3 text-[#FF4D2E]" /> Trusted partner
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                A dealer that acts like a <span className="text-gradient-warm">partner.</span>
              </h2>
              <p className="text-[#8B919D] text-lg leading-relaxed mb-8">
                We keep stock ready, provide clear invoices, and coordinate delivery to your site timing. No delays, no confusion—just reliable supply.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { text: 'Genuine Ultratech products', desc: 'Direct from authorized supply chain' },
                  { text: 'Transparent pricing', desc: 'No hidden costs or surprises' },
                  { text: 'Flexible payment options', desc: 'Cash, UPI, bank transfer accepted' },
                  { text: 'Dedicated support', desc: 'Personal assistance for every order' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 bg-[#FF4D2E]/15 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#FF4D2E]/25 transition-colors">
                      <CheckCircle className="w-4 h-4 text-[#FF4D2E]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.text}</p>
                      <p className="text-sm text-[#8B919D]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                Talk to our team <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2">
          <span className="font-mono-label text-xs text-[#3A4050] uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
            Local dealer • Fast support
          </span>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 5: DELIVERY PROMISE - Enhanced
          ════════════════════════════════════ */}
      <section id="delivery" ref={deliveryRef} className="py-24 lg:py-32 relative bg-[#0A0E17]">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="deliv-content order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#FF4D2E]/20 bg-[#FF4D2E]/8 text-[#FF8C42] text-xs uppercase tracking-[0.24em] font-semibold">
                <Truck className="w-3 h-3" /> Delivery promise
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                On-time delivery, <span className="text-gradient-warm">every time.</span>
              </h2>
              <p className="text-[#8B919D] text-lg leading-relaxed mb-8">
                We route orders for same-day or next-day arrival across Madurai. Scheduled loads, site-friendly unloading, and updates when you need them.
              </p>
              
              <div className="space-y-0 mb-8">
                {[
                  { step: '1', title: 'Order confirmed', desc: 'Quick confirmation via call/WhatsApp', color: 'bg-[#FF4D2E]' },
                  { step: '2', title: 'Dispatched same day', desc: 'Loaded and routed within hours', color: 'bg-[#FF6B42]' },
                  { step: '3', title: 'Delivered to site', desc: 'Unloaded at your convenience', color: 'bg-[#FF8C5A]' }
                ].map((item, i) => (
                  <div key={i} className="timeline-line flex items-start gap-4 pb-6">
                    <div className={`step-circle w-8 h-8 ${item.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(255,77,46,0.35)]`}>
                      <span className="text-white text-sm font-bold">{item.step}</span>
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-sm text-[#8B919D]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <a href="#regions" className="text-[#FF4D2E] hover:text-[#FF8C42] transition-colors inline-flex items-center gap-2 font-medium">
                Check delivery areas <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="deliv-image order-1 lg:order-2">
              <div className="relative rounded-[28px] overflow-hidden group">
                <img 
                  src="/delivery_truck.jpg" 
                  alt="Delivery Truck" 
                  className="w-full h-[400px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F]/70 via-[#0B0C0F]/5 to-transparent" />
                {/* Floating card on image */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#0A0E17]/85 backdrop-blur-xl p-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF4D2E] rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-white">Same Day Dispatch</p>
                        <p className="text-xs text-[#8B919D]">Orders before 2 PM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-display font-bold text-[#FF4D2E]">98%</p>
                      <p className="text-xs text-[#8B919D]">On-time rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 6: TESTIMONIAL - Enhanced
          ════════════════════════════════════ */}
      <section ref={testimonialRef} className="py-24 lg:py-32 relative bg-[#18202B] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF4D2E]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#C95B3B]/5 blur-3xl" />
        
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="test-quote relative">
              <span className="quote-mark quote-breathe">"</span>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/15 bg-white/10 text-white/70 text-xs uppercase tracking-[0.24em] font-semibold">
                <MessageSquare className="w-3 h-3" /> Client testimonial
              </div>
              <blockquote className="relative z-10 font-display text-2xl sm:text-3xl lg:text-4xl text-[#F6F7F9] leading-snug mb-8">
                They deliver what they promise. The cement is fresh, the billing is clean, and the delivery team knows how to handle site constraints.
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF4D2E] to-[#C95B3B] rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(255,77,46,0.3)]">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#F6F7F9]">Ramesh K.</p>
                  <p className="text-sm text-[#A6AAB6]">Site Supervisor — Madurai</p>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="test-image">
              <div className="relative rounded-[28px] overflow-hidden group">
                <img 
                  src="/testimonial_portrait.jpg" 
                  alt="Site Supervisor" 
                  className="w-full h-[400px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F]/50 to-transparent" />
                {/* Floating stat */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4">
                  <p className="text-3xl font-display font-bold text-white">150+</p>
                  <p className="text-xs text-white/60">Happy contractors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 7: CONTACT/CHECKOUT - Enhanced
          ════════════════════════════════════ */}
      <section id="contact" ref={contactRef} className="section-light py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF4D2E]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF8C42]/4 blur-3xl pointer-events-none" />
        
        <div className="w-full px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="contact-left">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#A0AAB8] text-xs uppercase tracking-[0.24em] font-semibold">
                <MessageSquare className="w-3 h-3 text-[#FF4D2E]" /> {cart.length > 0 ? 'Checkout' : 'Get in touch'}
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                {cart.length > 0 ? 'Complete your order' : <span>Get a quote <span className="text-gradient-warm">in minutes.</span></span>}
              </h2>
              <p className="text-[#8B919D] text-lg leading-relaxed mb-8">
                {cart.length > 0 
                  ? 'Fill in your details to confirm and place your order. We\'ll contact you within the hour.'
                  : 'Tell us what you\'re building. We\'ll recommend the right grade, estimate quantity, and share pricing with delivery options.'}
              </p>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-white/10 transition-all group">
                  <div className="w-12 h-12 bg-[#FF4D2E]/15 rounded-xl flex items-center justify-center group-hover:bg-[#FF4D2E]/20 transition-colors">
                    <Phone className="w-5 h-5 text-[#FF4D2E]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8B919D]">Call us</p>
                    <p className="font-semibold text-white">9*********</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-white/10 transition-all group">
                  <div className="w-12 h-12 bg-[#FF4D2E]/15 rounded-xl flex items-center justify-center group-hover:bg-[#FF4D2E]/20 transition-colors">
                    <MapPin className="w-5 h-5 text-[#FF4D2E]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8B919D]">Visit us</p>
                    <p className="font-semibold text-white">45/2, Thirumangalam Road, Madurai</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: 'Secure' },
                  { icon: Clock, text: 'Fast reply' },
                  { icon: Heart, text: 'Trusted' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 text-sm text-[#8B919D]">
                    <item.icon className="w-3.5 h-3.5 text-[#FF4D2E]" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="contact-form card-light p-8">
              <form onSubmit={cart.length > 0 ? handlePlaceOrder : handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#E8ECF4] mb-2">Name *</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="form-input-light"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#E8ECF4] mb-2">Phone *</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="form-input-light"
                      placeholder="9*********"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#E8ECF4] mb-2">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="form-input-light"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {cart.length > 0 ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2">Delivery Location *</label>
                      <input 
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="form-input-light"
                        placeholder="e.g., Madurai City, Thirumangalam"
                        required
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                      <p className="text-xs font-semibold text-[#FF8C42] uppercase tracking-[0.2em] mb-4">Order Summary</p>
                      <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                        {cart.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-[#8B919D]">{item.name} × {item.quantity}</span>
                            <span className="text-white font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                        <span className="font-display font-bold text-white">Total</span>
                        <span className="font-display font-bold text-xl text-[#FF4D2E]">₹{cartTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isPlacingOrder}
                      className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPlacingOrder ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Placing order...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Place Order
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#E8ECF4] mb-2">Requirement</label>
                        <select 
                          value={formData.requirement}
                          onChange={e => setFormData({...formData, requirement: e.target.value})}
                          className="form-input-light"
                        >
                          <option value="">Select grade</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#E8ECF4] mb-2">Quantity (bags)</label>
                        <input 
                          type="number"
                          value={formData.quantity}
                          onChange={e => setFormData({...formData, quantity: e.target.value})}
                          className="form-input-light"
                          placeholder="e.g., 100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E8ECF4] mb-2">Message</label>
                      <textarea 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="form-input-light resize-none"
                        rows={4}
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4">
                      <MessageSquare className="w-4 h-4" /> Send inquiry
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 8: QUALITY PROMISE - Enhanced
          ════════════════════════════════════ */}
      <section ref={qualityRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="qual-bg absolute inset-0">
          <img 
            src="/quality_plant.jpg" 
            alt="Cement Manufacturing Plant" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/90 via-[#0A0E17]/50 to-[#0A0E17]/60" />
        </div>
        
        <div className="qual-text relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 text-xs uppercase tracking-[0.24em] font-semibold">
            <Award className="w-3.5 h-3.5" /> Quality promise
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-6">
            Built in India's most advanced cement plants.
          </h2>
          <p className="text-[#A0AAB8] text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Tested for strength, consistency, and durability—so your structure lasts for decades.
          </p>
          <a href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white hover:bg-white/15 transition-all font-medium">
            Explore products <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 9: SERVICE REGIONS - Enhanced
          ════════════════════════════════════ */}
      <section id="regions" ref={regionsRef} className="py-24 lg:py-32 relative bg-[#0D1221]">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="reg-content">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#A0AAB8] text-xs uppercase tracking-[0.24em] font-semibold">
                <MapPin className="w-3 h-3 text-[#FF4D2E]" /> Coverage area
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                Delivering across <span className="text-gradient-warm">Madurai district.</span>
              </h2>
              <p className="text-[#8B919D] text-lg leading-relaxed mb-8">
                From city centers to outskirts—scheduled delivery with unloading support.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {['Madurai City', 'Thirumangalam', 'Usilampatti', 'Melur', 'Vadipatti', 'Peraiyur'].map((loc, i) => (
                  <span key={i} className="location-chip flex items-center gap-2 border border-white/10 px-4 py-2.5 rounded-full text-sm text-[#E8ECF4] cursor-pointer">
                    <MapPin className="w-3 h-3 text-[#FF4D2E]" /> {loc}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="reg-map">
              <div className="relative rounded-[28px] overflow-hidden group">
                <img 
                  src="/madurai_map.jpg" 
                  alt="Madurai City" 
                  className="w-full h-[300px] lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F]/70 via-[#0B0C0F]/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#0A0E17]/85 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FF4D2E] to-[#E83A20] rounded-xl flex items-center justify-center shadow-[0_6px_16px_rgba(255,77,46,0.35)]">
                        <Truck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-white text-lg">Free Delivery</p>
                        <p className="text-sm text-[#8B919D]">On orders above 50 bags (within Madurai)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 10: FOOTER - Enhanced
          ════════════════════════════════════ */}
      <footer ref={footerRef} className="py-16 lg:py-24 border-t border-white/5 bg-[#080B12]">
        <div className="w-full px-6 lg:px-12">
          <div className="footer-content">
            <div className="max-w-2xl mb-16">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                Ready to start your next project?
              </h2>
              <p className="text-[#8B919D] text-lg mb-8">
                Call, message, or send an inquiry. We'll respond within the hour.
              </p>
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                Get a quote <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/5">
              <div>
                <h4 className="font-display font-semibold text-white mb-4">Products</h4>
                <ul className="space-y-3">
                  {products.slice(0, 4).map((product, i) => (
                    <li key={i}><a href="#products" className="footer-link text-[#8B919D] hover:text-white transition-colors text-sm">{product.name}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-display font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-3">
                  {['Delivery Info', 'Returns', 'FAQs', 'Quality Guarantee'].map((item, i) => (
                    <li key={i}><a href="#" className="footer-link text-[#8B919D] hover:text-white transition-colors text-sm">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-[#8B919D] text-sm"><Phone className="w-3.5 h-3.5 text-[#FF4D2E]" /> 9*********</li>
                  <li className="flex items-center gap-2 text-[#8B919D] text-sm"><MessageSquare className="w-3.5 h-3.5 text-[#FF4D2E]" /> info@ultratechmadurai.com</li>
                  <li className="flex items-center gap-2 text-[#8B919D] text-sm"><MapPin className="w-3.5 h-3.5 text-[#FF4D2E]" /> Madurai, Tamil Nadu</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-3">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                    <li key={i}><a href="#" className="footer-link text-[#8B919D] hover:text-white transition-colors text-sm">{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 mt-12 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF4D2E] to-[#E83A20] rounded-xl flex items-center justify-center shadow-[0_6px_16px_rgba(255,77,46,0.3)]">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-display font-bold text-white block">Ultratech Cement</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#5A6474]">Madurai Authorized Dealer</span>
                </div>
              </div>
              <p className="text-[#5A6474] text-sm">
                © 2024 Ultratech Cement Madurai. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


