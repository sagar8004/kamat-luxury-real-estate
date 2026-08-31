'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, ShieldCheck, DollarSign, Percent, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { EmiCalculator } from '../components/EmiCalculator';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';

interface FinancePageProps {
  onOpenTourModal?: () => void;
  onNavigate?: (page: string) => void;
}

export const FinancePage: React.FC<FinancePageProps> = ({
  onOpenTourModal,
  onNavigate
}) => {
  const router = useRouter();
  const tourModalContext = useTourModal();

  const handleTour = () => {
    if (onOpenTourModal) {
      onOpenTourModal();
    } else {
      tourModalContext.openTourModal();
    }
  };
  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Header */}
      <div className="bg-[#044F92] text-white py-16 px-6 sm:px-8 lg:px-10 border-b border-[#03396c]">
        <div className="max-w-7xl mx-auto space-y-4">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em]">
              <Calculator className="w-3.5 h-3.5 text-blue-200" />
              <span>Financial Planning & Rental Yield Analysis</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={50} delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Mortgage & ROI Architecture
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={40} delay={0.2}>
            <p className="text-blue-100 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Structure your Goa real estate investment with bespoke private banking tie-ups, tailored tax structures, and realistic 10-12% vacation rental yield projections.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14 space-y-16">
        {/* Core Calculator Module */}
        <EmiCalculator />

        {/* Wealth & Taxation Advisory Highlights */}
        <StaggerContainer staggerDelay={0.14} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem variant="from-behind">
            <div className="bg-white p-8 border border-[#e5e1da] hover:border-[#044F92] space-y-4 shadow-sm hover:shadow-md transition-all h-full">
              <h3 className="font-display text-2xl text-[#044F92]">Goa Vacation Rental Yields</h3>
              <p className="text-xs text-[#4a4540] leading-relaxed">
                Prime luxury villas in Assagao, Candolim, and Miramar command average daily tariffs ranging from ₹35,000 to ₹1,20,000/night during peak tourist seasons, yielding strong double-digit cash flows.
              </p>
              <div className="pt-2 border-t border-[#e5e1da] text-xs font-semibold text-[#044F92]">
                Average Gross Yield: 10.5% - 13.2%
              </div>
            </div>
          </StaggerItem>

          <StaggerItem variant="from-behind">
            <div className="bg-white p-8 border border-[#e5e1da] hover:border-[#044F92] space-y-4 shadow-sm hover:shadow-md transition-all h-full">
              <h3 className="font-display text-2xl text-[#044F92]">Capital Appreciation</h3>
              <p className="text-xs text-[#4a4540] leading-relaxed">
                With the operational expansion of Mopa International Airport (GOX) and limited coastal land parcels, prime North and Central Goa freehold properties have demonstrated consistent 14-18% CAGR over the last 5 years.
              </p>
              <div className="pt-2 border-t border-[#e5e1da] text-xs font-semibold text-[#044F92]">
                Historical 5-Yr CAGR: ~16.4%
              </div>
            </div>
          </StaggerItem>

          <StaggerItem variant="from-behind">
            <div className="bg-white p-8 border border-[#e5e1da] hover:border-[#044F92] space-y-4 shadow-sm hover:shadow-md transition-all h-full">
              <h3 className="font-display text-2xl text-[#044F92]">Private Banking Partnerships</h3>
              <p className="text-xs text-[#4a4540] leading-relaxed">
                Fast-track pre-approved financing with dedicated relationship managers at HDFC Private Banking, ICICI Wealth, Kotak Mahindra, and State Bank of India.
              </p>
              <div className="pt-2 border-t border-[#e5e1da] text-xs font-semibold text-[#044F92]">
                Competitive Prime Rates: from 8.35%
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Callout Box */}
        <ScrollReveal variant="from-left" distance={30}>
          <div className="bg-[#f2f7fc] border border-[#cfe0ee] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1">
              <h3 className="font-display text-2xl text-[#044F92]">Need a Bespoke Financial & Rental Pro-Forma?</h3>
              <p className="text-xs text-[#4a4540]">Our financial directors can prepare custom cash flow and tax depreciation schedules.</p>
            </div>
            <button
              onClick={handleTour}
              className="px-8 py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-colors shrink-0 shadow-sm cursor-pointer"
            >
              Consult Wealth Director
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
