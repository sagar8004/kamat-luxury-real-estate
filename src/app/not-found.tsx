import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-[#fdfcfb]">
      <div className="space-y-6 max-w-md">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#044F92] font-bold">
          404 Error • Enclave Not Found
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#1a1a1a]">
          Sanctuary Beyond Coordinates
        </h1>
        <p className="text-sm text-[#8c857d] font-light leading-relaxed">
          The requested luxury estate or dossier could not be located in our current portfolio. Please explore our featured developments or consult our concierge.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/projects"
            className="px-7 py-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
          >
            Explore Projects
          </Link>
          <Link
            href="/"
            className="px-7 py-3 bg-white border border-[#e5e1da] text-[#1a1a1a] hover:border-[#044F92] text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
