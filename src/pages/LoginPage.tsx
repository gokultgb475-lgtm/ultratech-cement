import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, AlertCircle, Package, ChevronRight, ShieldCheck } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const getFriendlyErrorMessage = (err: { code?: string; message?: string }) => {
    switch (err.code) {
      case 'auth/configuration-not-found':
      case 'auth/operation-not-allowed':
        return 'Firebase Authentication is not configured yet. Enable Email/Password and create the admin user in Firebase Console.';
      case 'auth/invalid-credential':
      case 'auth/invalid-login-credentials':
        return 'Invalid email or password.';
      default:
        return err.message || 'Failed to login. Please check your credentials.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: unknown) {
      setError(getFriendlyErrorMessage(err as { code?: string; message?: string }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="corp-shell flex min-h-screen items-center justify-center px-6 py-12">
      <div className="grid w-full max-w-7xl overflow-hidden rounded-[36px] border border-white/10 bg-[#0F1420] shadow-[0_30px_100px_rgba(0,0,0,0.4)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden bg-[linear-gradient(160deg,#0D1221_0%,#1A2430_58%,#AB4B2F_100%)] p-8 text-white sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,77,46,0.32),transparent_28%)]" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#FF4D2E] shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-xl font-bold">Ultratech Cement</p>
                <p className="text-sm text-white/70">Dealer operations portal</p>
              </div>
            </div>

            <div className="mb-8 inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
              <ShieldCheck className="h-4 w-4" />
              Authorized Access
            </div>

            <h1 className="font-display max-w-xl text-4xl font-bold leading-[0.95] sm:text-5xl lg:text-6xl">
              Manage stock,
              <br />
              orders, and site
              <br />
              dispatch from one place.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/78 sm:text-lg">
              Inspired by premium cement-brand portals: cleaner surfaces, clearer controls,
              and a more professional experience for your admin workflow.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Order visibility', value: 'Realtime' },
                { label: 'Product control', value: 'Editable' },
                { label: 'Dispatch updates', value: 'Fast' }
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">{item.label}</p>
                  <p className="mt-2 font-display text-2xl">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10">
              <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Portal note</p>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Use this login only for internal product, pricing, and customer-order management.
                  Public visitors should continue to use the main site quote flow.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0F1420] p-8 sm:p-10 lg:p-14">
          <div className="mx-auto flex h-full w-full max-w-lg flex-col justify-center">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#FF8C42]">
                Admin Login
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-white">
                Welcome back
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#8B919D]">
                Sign in to manage products, review orders, and keep your dealer dashboard updated.
              </p>
            </div>

            <div className="corp-panel p-8">
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#E8ECF4]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="corp-input"
                    placeholder="admin@ultratech.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#E8ECF4]">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="corp-input"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-[16px] bg-[#FF4D2E] px-6 py-3.5 font-medium text-white shadow-[0_16px_35px_rgba(255,77,46,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#F45135] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 rounded-[20px] border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#FF8C42]">
                  Demo credentials
                </p>
                <p className="mt-3 text-sm leading-6 text-[#8B919D]">
                  Email: <span className="font-medium text-white">admin@ultratech.com</span>
                  <br />
                  Password: <span className="font-medium text-white">Admin@123</span>
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#FF8C42] transition-colors hover:text-[#FF4D2E]"
            >
              Back to website <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
