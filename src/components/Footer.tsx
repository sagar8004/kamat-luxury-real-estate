'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { useTourModal } from '../context/TourModalContext';
import { PROPERTIES } from '@/data/propertyService';

interface FooterProps {
  onNavigate?: (page: string, params?: { filterStatus?: string }) => void;
  onOpenTourModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTourModal }) => {
  const [emailSub, setEmailSub] = useState('');
  const [subMessage, setSubMessage] = useState('');
  const tourModalContext = useTourModal();

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

  const handleOpenTour = () => {
    if (onOpenTourModal) {
      onOpenTourModal();
    } else {
      tourModalContext.openTourModal();
    }
  };

  return (
    <footer className="bg-[#032b50] text-[#c5daf0] border-t border-[#044F92] pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-16">
        {/* Top Tier: Logo & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-[#044F92]/60 pb-14">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-block bg-white px-4 py-2 rounded-lg shadow-md border border-white/30">
              <img
                src="/kamat-logo.png"
                alt="Kamat Realty - Real Estate Developers"
                className="h-11 sm:h-12 md:h-14 w-auto object-contain block"
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
                className="px-5 py-2.5 bg-white hover:bg-blue-50 text-[#044F92] font-semibold text-xs uppercase tracking-widest transition-colors shrink-0 shadow-sm cursor-pointer"
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
                <Link href="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  All {PROPERTIES.length} Developments
                </Link>
              </li>
              <li>
                <Link href="/ongoing" className="hover:text-white transition-colors">
                  Ongoing Projects Tracker
                </Link>
              </li>
              <li>
                <Link href="/completed" className="hover:text-white transition-colors">
                  Completed Landmarks
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="hover:text-white transition-colors flex items-center justify-between text-[#38bdf8] font-medium">
                  <span>Commercial Real Estate</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#044F92] text-white border border-[#38bdf8]/40">Grade-A</span>
                </Link>
              </li>
              <li>
                <Link href="/explore-goa" className="hover:text-white transition-colors text-[#38bdf8] font-semibold flex items-center gap-1.5">
                  <span>Explore Goa Experience</span>
                  <span className="text-[9px] bg-[#044F92] text-white px-1.5 py-0.2 rounded border border-[#38bdf8]/40">3D</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-widest text-[10px] mb-4">Prime Locations</h5>
            <ul className="space-y-2.5 text-blue-100/80">
              <li><Link href="/locations" className="hover:text-white">Mapusa Market Town </Link></li>
              <li><Link href="/locations" className="hover:text-white">Miramar & Caranzalem</Link></li>
              <li><Link href="/locations" className="hover:text-white">Altinho & Panjim City</Link></li>
              <li><Link href="/locations" className="hover:text-white">Porvorim Gated Avenues</Link></li>
              <li><Link href="/locations" className="hover:text-white">Dona Paula Sea Cliffs</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-widest text-[10px] mb-4">Services & Portals</h5>
            <ul className="space-y-2.5 text-blue-100/80">
              <li>
                <button onClick={handleOpenTour} className="hover:text-white transition-colors cursor-pointer text-left">
                  Book Private Site Visit
                </button>
              </li>
              <li><Link href="/finance" className="hover:text-white">Mortgage & ROI Yields</Link></li>
              <li><Link href="/about" className="hover:text-white">Heritage & 32-Yr Legacy</Link></li>
              <li><Link href="/contact" className="hover:text-white">Panaji Concierge Desk</Link></li>
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
              className="p-2.5 bg-white text-[#044F92] hover:bg-blue-100 transition-colors shadow-md cursor-pointer"
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
