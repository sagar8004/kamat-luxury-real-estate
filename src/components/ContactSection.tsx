'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROPERTIES } from '../data/propertyService';
import { SiteVisitInquiry } from '../types/property';
import { ScrollReveal } from './ScrollReveal';

interface ContactSectionProps {
  onOpenTourModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenTourModal }) => {
  const [formData, setFormData] = useState<SiteVisitInquiry>({
    fullName: '',
    email: '',
    phone: '',
    propertyId: PROPERTIES[0]?.id || '',
    preferredDate: '',
    preferredTime: '11:00 AM',
    tourType: 'in-person',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#044F92', '#38bdf8', '#ffffff']
        });
      } catch (err) {
        // ignore
      }
    }, 800);
  };

  return (
    <section id="contact-section" className="py-20 bg-[#fdfcfb] border-t border-[#e5e1da] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold border-b border-[#044F92]/40 pb-1 inline-block">
              Private Consultations & Enquiries
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1a1a1a]">
              Connect with Kamat Realty
            </h2>
            <p className="text-[#4a4540] text-sm sm:text-base font-light leading-relaxed">
              Schedule a private chauffeured site viewing, request architectural blueprints, or discuss bespoke investments with our executive directors.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office Locations & Direct Contacts (Appearing from Left) */}
          <ScrollReveal variant="from-left" distance={40} className="lg:col-span-5 space-y-6">
            <div className="space-y-6">
            {/* Panaji Head Office Card */}
            <div className="bg-white p-6 sm:p-8 border border-[#e5e1da] space-y-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#044F92] flex items-center justify-center shrink-0 shadow-sm">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#1a1a1a]">Panaji Corporate Office</h3>
                  <p className="text-[10px] text-[#044F92] uppercase tracking-widest font-semibold">Executive & Design Studio</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#4a4540]">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#044F92] shrink-0 mt-0.5" />
                  <span>Kamat Towers, 4th Floor, EDC Patto Plaza, Commercial Complex, Panaji, Goa 403001</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#044F92] shrink-0" />
                  <a href="tel:+918322223456" className="hover:text-[#044F92] font-mono text-[#1a1a1a] font-medium">+91 832 222 3456 / +91 832 222 3457</a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#044F92] shrink-0" />
                  <a href="mailto:concierge@kamatrealty.com" className="hover:underline text-[#044F92] font-medium">concierge@kamatrealty.com</a>
                </p>
                <p className="flex items-center gap-2.5 text-[#8c857d]">
                  <Clock className="w-4 h-4 text-[#8c857d] shrink-0" />
                  <span>Monday - Saturday: 9:30 AM – 7:00 PM IST</span>
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Concierge connect */}
            <a
              href="https://wa.me/918322223456?text=Hello%20Kamat%20Realty%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20properties%20in%20Goa."
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white hover:bg-[#f2f7fc] border border-[#e5e1da] hover:border-[#044F92] p-6 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#044F92] flex items-center justify-center text-white shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-[#044F92] tracking-widest">Instant WhatsApp Desk</h4>
                    <p className="text-xs text-[#4a4540]">Chat directly with our luxury property specialists</p>
                  </div>
                </div>
                <span className="text-xs text-[#044F92] font-bold group-hover:translate-x-1 transition-transform">
                  Chat Now →
                </span>
              </div>
            </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Schedule & Contact Form (Emerging from Behind) */}
          <ScrollReveal variant="from-behind" delay={0.2} className="lg:col-span-7">
            <div className="bg-white border border-[#e5e1da] p-6 sm:p-8 shadow-lg">
              {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 bg-[#044F92] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#1a1a1a]">
                  Viewing Appointment Requested
                </h3>
                <p className="text-xs text-[#4a4540] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#044F92] font-bold">{formData.fullName}</span>. Our concierge is preparing your personalized itinerary and will contact you via WhatsApp / phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#044F92] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#03396c] transition-colors shadow-sm"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#e5e1da] pb-3 mb-4">
                  <h3 className="font-display text-2xl font-normal text-[#1a1a1a]">
                    Schedule a Site Tour or Request Blueprints
                  </h3>
                  <p className="text-xs text-[#8c857d] mt-0.5">Please provide your details for priority scheduling.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Mehta"
                      className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#044F92]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-1">
                      Contact Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98220 XXXXX"
                      className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#044F92]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@domain.com"
                      className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#044F92]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-1">
                      Development of Interest
                    </label>
                    <select
                      value={formData.propertyId}
                      onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    >
                      {PROPERTIES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.location.area})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    >
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>02:30 PM</option>
                      <option>04:30 PM (Sunset View)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-1">
                      Tour Format
                    </label>
                    <select
                      value={formData.tourType}
                      onChange={(e) => setFormData({ ...formData, tourType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    >
                      <option value="in-person">In-Person Site Tour</option>
                      <option value="virtual-video">Virtual 3D Video Tour</option>
                      <option value="callback">Telephone Discussion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-1">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Interested in sea-facing 4 BHK penthouse with private elevator provision."
                    className="w-full px-3.5 py-2 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#044F92]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  id="submit-site-visit-form-btn"
                  className="w-full py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Request...' : 'Confirm Site Visit Appointment'}</span>
                </button>
              </form>
            )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

