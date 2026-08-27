import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Building2, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';
import { ScrollReveal } from '../components/ScrollReveal';

interface ContactPageProps {
  onOpenTourModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenTourModal }) => {
  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Header */}
      <div className="bg-[#044F92] text-white py-16 px-6 sm:px-8 lg:px-10 border-b border-[#03396c]">
        <div className="max-w-7xl mx-auto space-y-4">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em]">
              <Building2 className="w-3.5 h-3.5 text-blue-200" />
              <span>Panaji Headquarters & Concierge Desk</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={50} delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Connect with Kamat Realty
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={40} delay={0.2}>
            <p className="text-blue-100 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Schedule a private chauffeured site viewing in Goa, request high-resolution architectural dossiers, or arrange an executive consultation with our board of directors.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14 space-y-16">
        <ContactSection onOpenTourModal={onOpenTourModal} />
      </div>
    </div>
  );
};
