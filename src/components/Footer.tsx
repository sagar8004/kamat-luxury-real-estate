import React, { useState } from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { ProjectStatus } from '../types/property';

interface FooterProps {
  onNavigate: (page: string, params?: { filterStatus?: string }) => void;
  onOpenTourModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTourModal }) => {
  const [emailSub, setEmailSub] = useState('');
  const [subMessage, setSubMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubMessage('Subscribed! You will receive priority pre-launch announcements.');
    setEmailSub('');
    setTimeout(() => setSubMessage(''), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#032b50] text-[#c5daf0] border-t border-[#044F92] pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-16">
        {/* Top Tier: Logo & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-[#044F92]/60 pb-14">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-block bg-white px-3.5 py-2 rounded shadow-md border border-white/20">
              <img
                src="/kamat-logo.png"
                alt="Kamat Realty - Real Estate Developers"
                className="h-9 sm:h-10 w-auto object-contain block"
              />
            </div>

            <p className="text-xs text-blue-100/80 max-w-md font-light leading-relaxed">
              Curators of bespoke coastal estates, sea-facing penthouses, and architectural landmarks across North, Central, and South Goa. 32 years of uncompromised engineering integrity.
            </p>
          </div>

          {/* Newsletter for Pre-Launch Alerts */}
          <div className="lg:col-span-6 bg-[#044F92]/60 p-6 sm:p-8 border border-white/20 space-y-3 shadow-inner">
            <h4 className="text-[10px] uppercase font-bold text-white tracking-widest">Priority Pre-Launch Private Register</h4>
            <p className="text-xs text-blue-100 font-light">
              Receive private invitations and architectural floorplans before public release.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
              <input
                type="email"
                required
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-3.5 py-2.5 bg-[#02203d] border border-blue-400/40 text-xs text-white placeholder-blue-300/60 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-white hover:bg-blue-50 text-[#044F92] font-semibold text-xs uppercase tracking-widest transition-colors shrink-0 shadow-sm"
              >
                Join Register
              </button>
            </form>
            {subMessage && <p className="text-xs text-blue-200 font-semibold">{subMessage}</p>}
          </div>
        </div>

        {/* Middle Tier: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div>
            <h5 className="font-semibold text-white uppercase tracking-widest text-[10px] mb-4">Pages & Estates</h5>
            <ul className="space-y-2.5 text-blue-100/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors">
                  All 12 Developments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ongoing')} className="hover:text-white transition-colors">
                  Ongoing Projects Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('completed')} className="hover:text-white transition-colors">
                  Completed Landmarks
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-widest text-[10px] mb-4">Prime Locations</h5>
            <ul className="space-y-2.5 text-blue-100/80">
              <li><button onClick={() => onNavigate('locations')} className="hover:text-white">Assagao & Vagator</button></li>
              <li><button onClick={() => onNavigate('locations')} className="hover:text-white">Miramar & Caranzalem</button></li>
              <li><button onClick={() => onNavigate('locations')} className="hover:text-white">Candolim Beach Strip</button></li>
              <li><button onClick={() => onNavigate('locations')} className="hover:text-white">Porvorim Gated Avenues</button></li>
              <li><button onClick={() => onNavigate('locations')} className="hover:text-white">Dona Paula Sea Cliffs</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-widest text-[10px] mb-4">Services & Portals</h5>
            <ul className="space-y-2.5 text-blue-100/80">
              <li>
                <button onClick={onOpenTourModal} className="hover:text-white transition-colors">
                  Book Private Site Visit
                </button>
              </li>
              <li><button onClick={() => onNavigate('finance')} className="hover:text-white">Mortgage & ROI Yields</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white">Heritage & 32-Yr Legacy</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Panaji Concierge Desk</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-widest text-[10px] mb-4">Corporate Office</h5>
            <div className="space-y-2.5 text-blue-100/80">
              <p>Kamat Towers, EDC Patto, Panaji, Goa 403001</p>
              <p className="font-mono text-white font-medium">+91 832 222 3456</p>
              <p>concierge@kamatrealty.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: RERA & Copyright Disclaimers */}
        <div className="pt-8 border-t border-[#044F92]/60 text-[11px] text-blue-200/80 space-y-4">
          <div className="flex items-center gap-2 text-blue-100">
            <ShieldCheck className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <span>
              Disclaimer: All Kamat Realty projects are registered under Goa Real Estate Regulatory Authority (Goa RERA). Images, artist impressions, and specifications are indicative.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#044F92]/40">
            <p>© {new Date().getFullYear()} Kamat Realty Developers Pvt. Ltd. All Rights Reserved.</p>

            <div className="flex items-center gap-4 text-xs">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">RERA Disclosures</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 bg-white text-[#044F92] hover:bg-blue-100 transition-colors shadow-md"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

