import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: { filterStatus?: string }) => void;
  onOpenTourModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenTourModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(currentPage !== 'home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);

  // Monitor scroll position and check whether user has completed the Home Page scroll animation section
  useEffect(() => {
    const handleScroll = () => {
      const isScrolledPastTop = window.scrollY > 20;
      setScrolled(isScrolledPastTop);

      if (currentPage === 'home') {
        const heroEl = document.getElementById('hero-scroll-section');
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect();
          // The hero scroll animation section is completed once its bottom reaches near the navbar height (approx 80px)
          const past = rect.bottom <= 80;
          setIsPastHero(past);
        } else {
          setIsPastHero(window.scrollY > (window.innerHeight * 3));
        }
      } else {
        // Non-home pages always use the standard white navbar
        setIsPastHero(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentPage]);

  const handlePageClick = (page: string, params?: { filterStatus?: string }) => {
    onNavigate(page, params);
    setMobileMenuOpen(false);
    setProjectsDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The header is transparent ONLY on the Home Page while inside the scroll animation section
  const isTransparent = currentPage === 'home' && !isPastHero;

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
          ? scrolled
            ? 'py-3.5 bg-black/30 backdrop-blur-md border-b border-white/10'
            : 'py-5 bg-transparent border-b border-transparent'
          : scrolled
            ? 'py-3.5 bg-[#fdfcfb]/95 backdrop-blur-md border-b border-[#e5e1da] shadow-sm'
            : 'py-5 bg-[#fdfcfb]/95 backdrop-blur-md border-b border-[#e5e1da]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Official Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handlePageClick('home')}
            className="flex items-center text-left group focus:outline-none transition-transform hover:scale-[1.02] py-1"
          >
            <div
              className={`transition-all duration-300 rounded-lg ${isTransparent
                ? 'bg-white px-3.5 py-1.5 shadow-xl border border-white/40'
                : 'bg-transparent py-0.5'
                }`}
            >
              <img
                src="/kamat-logo.png"
                alt="Kamat Realty - Real Estate Developers"
                className="h-10 sm:h-12 md:h-13 w-auto object-contain block drop-shadow-sm"
              />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${isTransparent ? 'text-white/90' : 'text-[#4a4540]'
              }`}
          >
            <button
              id="nav-link-home"
              onClick={() => handlePageClick('home')}
              className={`pb-1 transition-all ${isTransparent
                ? currentPage === 'home'
                  ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-semibold drop-shadow'
                  : 'hover:text-[#38bdf8]'
                : currentPage === 'home'
                  ? 'text-[#044F92] border-b-2 border-[#044F92] font-semibold'
                  : 'hover:text-[#044F92]'
                }`}
            >
              Home
            </button>

            {/* Projects with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProjectsDropdown(true)}
              onMouseLeave={() => setProjectsDropdown(false)}
            >
              <button
                id="nav-link-projects"
                onClick={() => handlePageClick('projects')}
                className={`pb-1 transition-all flex items-center gap-1 ${isTransparent
                  ? currentPage === 'projects'
                    ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-semibold'
                    : 'hover:text-[#38bdf8]'
                  : currentPage === 'projects'
                    ? 'text-[#044F92] border-b-2 border-[#044F92] font-semibold'
                    : 'hover:text-[#044F92]'
                  }`}
              >
                <span>Developments</span>
                <ChevronRight
                  className={`w-3 h-3 transition-transform duration-200 ${projectsDropdown
                    ? `rotate-90 ${isTransparent ? 'text-[#38bdf8]' : 'text-[#044F92]'}`
                    : isTransparent ? 'text-white/70' : 'text-[#8c857d]'
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {projectsDropdown && (
                <div
                  className={`absolute top-full left-0 mt-2 w-64 shadow-2xl p-2 z-50 transition-all ${isTransparent
                    ? 'bg-[#02182c]/95 backdrop-blur-xl border border-white/20 text-white'
                    : 'bg-white border border-[#cfe0ee] text-[#1a1a1a]'
                    }`}
                >
                  <button
                    onClick={() => handlePageClick('projects')}
                    className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between transition-colors tracking-normal normal-case font-medium ${isTransparent
                      ? 'hover:bg-white/15 text-white hover:text-[#38bdf8]'
                      : 'hover:bg-[#f2f7fc] text-[#1a1a1a] hover:text-[#044F92]'
                      }`}
                  >
                    <span>All Luxury Properties</span>
                    <span className={`text-[10px] uppercase tracking-widest ${isTransparent ? 'text-blue-200' : 'text-[#8c857d]'}`}>
                      12 Estates
                    </span>
                  </button>
                  <button
                    onClick={() => handlePageClick('ongoing')}
                    className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between transition-colors tracking-normal normal-case font-medium ${isTransparent
                      ? 'hover:bg-white/15 text-white hover:text-[#38bdf8]'
                      : 'hover:bg-[#f2f7fc] text-[#1a1a1a] hover:text-[#044F92]'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isTransparent ? 'bg-[#38bdf8]' : 'bg-[#044F92]'}`}></span>
                      Ongoing Projects
                    </span>
                    <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold ${isTransparent ? 'text-[#38bdf8] bg-blue-900/50' : 'text-[#044F92] bg-[#eef5fb]'
                      }`}>
                      Active
                    </span>
                  </button>
                  <button
                    onClick={() => handlePageClick('completed')}
                    className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between transition-colors tracking-normal normal-case font-medium ${isTransparent
                      ? 'hover:bg-white/15 text-white hover:text-[#38bdf8]'
                      : 'hover:bg-[#f2f7fc] text-[#1a1a1a] hover:text-[#044F92]'
                      }`}
                  >
                    <span>Completed Landmarks</span>
                    <span className="text-[9px] uppercase tracking-widest text-white bg-[#044F92] px-2 py-0.5 font-bold">
                      Delivered
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button
              id="nav-link-ongoing"
              onClick={() => handlePageClick('ongoing')}
              className={`pb-1 transition-all ${isTransparent
                ? currentPage === 'ongoing'
                  ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-semibold'
                  : 'hover:text-[#38bdf8]'
                : currentPage === 'ongoing'
                  ? 'text-[#044F92] border-b-2 border-[#044F92] font-semibold'
                  : 'hover:text-[#044F92]'
                }`}
            >
              Ongoing
            </button>

            <button
              id="nav-link-completed"
              onClick={() => handlePageClick('completed')}
              className={`pb-1 transition-all ${isTransparent
                ? currentPage === 'completed'
                  ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-semibold'
                  : 'hover:text-[#38bdf8]'
                : currentPage === 'completed'
                  ? 'text-[#044F92] border-b-2 border-[#044F92] font-semibold'
                  : 'hover:text-[#044F92]'
                }`}
            >
              Completed
            </button>

            <button
              id="nav-link-map"
              onClick={() => handlePageClick('locations')}
              className={`pb-1 transition-all ${isTransparent
                ? currentPage === 'locations'
                  ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-semibold'
                  : 'hover:text-[#38bdf8]'
                : currentPage === 'locations'
                  ? 'text-[#044F92] border-b-2 border-[#044F92] font-semibold'
                  : 'hover:text-[#044F92]'
                }`}
            >
              Locations Map
            </button>

            <button
              id="nav-link-legacy"
              onClick={() => handlePageClick('about')}
              className={`pb-1 transition-all ${isTransparent
                ? currentPage === 'about'
                  ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-semibold'
                  : 'hover:text-[#38bdf8]'
                : currentPage === 'about'
                  ? 'text-[#044F92] border-b-2 border-[#044F92] font-semibold'
                  : 'hover:text-[#044F92]'
                }`}
            >
              About
            </button>

            <button
              id="nav-link-calculator"
              onClick={() => handlePageClick('finance')}
              className={`pb-1 transition-all ${isTransparent
                ? currentPage === 'finance'
                  ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-semibold'
                  : 'hover:text-[#38bdf8]'
                : currentPage === 'finance'
                  ? 'text-[#044F92] border-b-2 border-[#044F92] font-semibold'
                  : 'hover:text-[#044F92]'
                }`}
            >
              Mortgage & ROI
            </button>

            <button
              id="nav-link-contact"
              onClick={() => handlePageClick('contact')}
              className={`pb-1 transition-all ${isTransparent
                ? currentPage === 'contact'
                  ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] font-semibold'
                  : 'hover:text-[#38bdf8]'
                : currentPage === 'contact'
                  ? 'text-[#044F92] border-b-2 border-[#044F92] font-semibold'
                  : 'hover:text-[#044F92]'
                }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action CTA & Concierge Hotline */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href="tel:+918322223456"
              className={`flex items-center gap-1.5 text-xs transition-colors ${isTransparent ? 'text-blue-100 hover:text-white' : 'text-[#8c857d] hover:text-[#044F92]'
                }`}
              title="Call VIP Concierge"
            >
              <Phone className={`w-3.5 h-3.5 ${isTransparent ? 'text-[#38bdf8]' : 'text-[#044F92]'}`} />
              <span className={`font-mono text-[12px] tracking-tight font-medium ${isTransparent ? 'text-white drop-shadow' : 'text-[#1a1a1a]'}`}>
                +91 832 222 3456
              </span>
            </a>

            <button
              id="btn-book-site-visit-nav"
              onClick={onOpenTourModal}
              className={`px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 cursor-pointer ${isTransparent
                ? 'bg-[#044F92] hover:bg-[#03396c] text-white border border-[#38bdf8]/40 shadow-lg'
                : 'bg-[#044F92] text-white hover:bg-[#03396c]'
                }`}
            >
              VIP Tour
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors focus:outline-none ${isTransparent ? 'text-white hover:bg-white/10' : 'text-[#044F92] hover:bg-[#f2f7fc]'
              }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#fdfcfb] pt-24 px-6 pb-8 overflow-y-auto flex flex-col justify-between border-b border-[#e5e1da]">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
              Pages Directory
            </p>

            <button
              onClick={() => handlePageClick('home')}
              className={`w-full text-left py-3 border-b border-[#e5e1da] font-display text-xl flex items-center justify-between ${currentPage === 'home' ? 'text-[#044F92] font-bold' : 'text-[#1a1a1a]'
                }`}
            >
              <span>Home Overview</span>
              <ChevronRight className="w-4 h-4 text-[#044F92]" />
            </button>

            <button
              onClick={() => handlePageClick('projects')}
              className={`w-full text-left py-3 border-b border-[#e5e1da] font-display text-xl flex items-center justify-between ${currentPage === 'projects' ? 'text-[#044F92] font-bold' : 'text-[#1a1a1a]'
                }`}
            >
              <span>All Developments</span>
              <span className="text-[10px] uppercase tracking-widest text-[#044F92] bg-[#f2f7fc] border border-[#cfe0ee] px-2 py-0.5 font-sans font-semibold">
                12 Estates
              </span>
            </button>

            <button
              onClick={() => handlePageClick('ongoing')}
              className={`w-full text-left py-3 border-b border-[#e5e1da] font-display text-xl flex items-center justify-between ${currentPage === 'ongoing' ? 'text-[#044F92] font-bold' : 'text-[#1a1a1a]'
                }`}
            >
              <span>Ongoing Projects</span>
              <ChevronRight className="w-4 h-4 text-[#044F92]" />
            </button>

            <button
              onClick={() => handlePageClick('completed')}
              className={`w-full text-left py-3 border-b border-[#e5e1da] font-display text-xl flex items-center justify-between ${currentPage === 'completed' ? 'text-[#044F92] font-bold' : 'text-[#1a1a1a]'
                }`}
            >
              <span>Completed Landmarks</span>
              <ChevronRight className="w-4 h-4 text-[#044F92]" />
            </button>

            <button
              onClick={() => handlePageClick('locations')}
              className={`w-full text-left py-3 border-b border-[#e5e1da] font-display text-xl flex items-center justify-between ${currentPage === 'locations' ? 'text-[#044F92] font-bold' : 'text-[#1a1a1a]'
                }`}
            >
              <span>Locations & Map</span>
              <ChevronRight className="w-4 h-4 text-[#044F92]" />
            </button>

            <button
              onClick={() => handlePageClick('about')}
              className={`w-full text-left py-3 border-b border-[#e5e1da] font-display text-xl flex items-center justify-between ${currentPage === 'about' ? 'text-[#044F92] font-bold' : 'text-[#1a1a1a]'
                }`}
            >
              <span>About & Legacy</span>
              <ChevronRight className="w-4 h-4 text-[#044F92]" />
            </button>

            <button
              onClick={() => handlePageClick('finance')}
              className={`w-full text-left py-3 border-b border-[#e5e1da] font-display text-xl flex items-center justify-between ${currentPage === 'finance' ? 'text-[#044F92] font-bold' : 'text-[#1a1a1a]'
                }`}
            >
              <span>Mortgage & ROI Calculator</span>
              <ChevronRight className="w-4 h-4 text-[#044F92]" />
            </button>

            <button
              onClick={() => handlePageClick('contact')}
              className={`w-full text-left py-3 border-b border-[#e5e1da] font-display text-xl flex items-center justify-between ${currentPage === 'contact' ? 'text-[#044F92] font-bold' : 'text-[#1a1a1a]'
                }`}
            >
              <span>Contact & Headquarters</span>
              <ChevronRight className="w-4 h-4 text-[#044F92]" />
            </button>
          </div>

          <div className="pt-6 border-t border-[#e5e1da] space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTourModal();
              }}
              className="w-full py-3.5 bg-[#044F92] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#03396c] transition-colors shadow-md"
            >
              Book Chauffeured Site Visit
            </button>

            <div className="flex items-center justify-between text-[11px] text-[#8c857d] tracking-wider uppercase font-medium">
              <span>Goa Headquarters</span>
              <a href="tel:+918322223456" className="text-[#044F92] font-bold">
                +91 832 222 3456
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

