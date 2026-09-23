import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-obsidian px-6 text-center">
      <span className="font-display text-8xl text-champagne/30">404</span>
      <p className="mt-4 font-display text-2xl text-ivory">This scent has evaporated.</p>
      <Link to="/" className="btn-luxury mt-10">
        Return Home
      </Link>
    </div>
  );
}
