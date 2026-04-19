import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { OrdersManagement } from '../components/admin/OrdersManagement';
import { ProductsManagement } from '../components/admin/ProductsManagement';
import { Analytics } from '../components/admin/Analytics';
import { LogOut, Package, BarChart3, ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products'>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { id: 'orders' as const, label: 'Orders', icon: ShoppingCart },
    { id: 'products' as const, label: 'Products', icon: Package }
  ];

  return (
    <div className="corp-shell">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF4D2E] text-white shadow-[0_14px_30px_rgba(255,77,46,0.25)]">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white">Ultratech Admin</p>
              <p className="text-xs uppercase tracking-[0.22em] text-[#FF8C42]">Dealer control center</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`corp-tab ${active ? 'corp-tab-active' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:flex sm:items-center sm:gap-3">
              <span className="text-sm font-medium text-[#E8ECF4]">{user?.email?.split('@')[0]}</span>
              <button
                onClick={handleLogout}
                className="rounded-full p-2 text-[#8B919D] transition-colors hover:bg-[#FF4D2E]/15 hover:text-[#FF4D2E]"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-[#E8ECF4] md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#0A0E17] px-6 py-4 md:hidden">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left ${
                      activeTab === tab.id
                        ? 'bg-[#FF4D2E] text-white'
                        : 'bg-white/5 text-[#E8ECF4] border border-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#E8ECF4]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-12 lg:py-10">
        <section className="corp-panel relative overflow-hidden p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,77,46,0.12),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#FF8C42]">
                Operations dashboard
              </p>
              <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
                Manage cement orders and
                <br />
                product updates with clarity.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#8B919D]">
                Inspired by premium cement-company portals: structured cards, cleaner surfaces,
                and quick control over orders, products, and stock communication.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { title: 'Admin status', value: 'Active session' },
                { title: 'Primary workflow', value: activeTab.charAt(0).toUpperCase() + activeTab.slice(1) },
                { title: 'Next action', value: 'Review today\u2019s updates' }
              ].map((item) => (
                <div key={item.title} className="corp-panel-soft p-5">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#5A6474]">{item.title}</p>
                  <p className="mt-3 font-display text-2xl text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-3 md:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`corp-tab ${active ? 'corp-tab-active' : ''}`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {activeTab === 'overview' && <Analytics />}
          {activeTab === 'orders' && <OrdersManagement />}
          {activeTab === 'products' && <ProductsManagement />}
        </div>

        <div className="mt-10 flex items-center justify-end">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#FF8C42] transition-colors hover:text-[#FF4D2E]"
          >
            Back to website <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
