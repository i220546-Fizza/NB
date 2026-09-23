import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = mode === 'login' ? await login(email, password) : await register(name, email, password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-6 pt-24">
      <div className="w-full max-w-md">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel>{mode === 'login' ? 'Welcome Back' : 'Join The House'}</SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="heading-hero mt-6 text-center text-3xl text-ivory md:text-4xl">
            {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </h1>
        </Reveal>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          {mode === 'register' && (
            <Field label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="btn-luxury w-full">
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-beige/50">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-champagne hover:underline"
          >
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-xs uppercase tracking-widest2 text-beige/40 hover:text-champagne">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest2 text-beige/50">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border-b border-cocoa bg-transparent py-2 text-ivory focus:border-champagne focus:outline-none"
      />
    </label>
  );
}
