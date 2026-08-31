'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROPERTIES } from '../data/propertyService';
import { PropertyItem } from '../types/property';

interface ScheduleTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProperty?: PropertyItem | null;
}

export const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({
  isOpen,
  onClose,
  preselectedProperty
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPropId, setSelectedPropId] = useState(preselectedProperty?.id || PROPERTIES[0]?.id);
  const [date, setDate] = useState('');
  const [tourType, setTourType] = useState('in-person');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 }, colors: ['#044F92', '#38bdf8', '#ffffff'] });
      } catch (err) {}
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-lg bg-white border border-[#044F92]/20 shadow-2xl p-6 sm:p-8 z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#8c857d] hover:text-[#044F92] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-[#044F92] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-3xl font-normal text-[#044F92]">Site Visit Scheduled</h3>
              <p className="text-xs text-[#4a4540] max-w-sm mx-auto leading-relaxed">
                Our VIP relationship concierge will contact you on <span className="text-[#044F92] font-semibold">{phone}</span> to coordinate your private chauffeured tour.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-8 py-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-md"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 border-b border-[#e5e1da] pb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#044F92] font-bold">
                  VIP Private Tour
                </span>
                <h3 className="font-display text-2xl font-normal text-[#1a1a1a]">
                  Schedule a Site Viewing
                </h3>
                <p className="text-xs text-[#8c857d]">
                  Experience the architecture, sea breeze, and refined finishes in person.
                </p>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#044F92] font-bold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#044F92]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#044F92] font-bold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98220 XXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#044F92]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#044F92] font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#044F92]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#044F92] font-bold mb-1">
                  Select Development
                </label>
                <select
                  value={selectedPropId}
                  onChange={(e) => setSelectedPropId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} - {p.location.area} ({p.status.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#044F92] font-bold mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#044F92] font-bold mb-1">
                    Tour Format
                  </label>
                  <select
                    value={tourType}
                    onChange={(e) => setTourType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                  >
                    <option value="in-person">Chauffeured In-Person Site Tour</option>
                    <option value="virtual-video">Virtual 3D Video Consultation</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white font-semibold text-xs uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2 mt-3 disabled:opacity-50"
              >
                <Calendar className="w-4 h-4" />
                <span>{loading ? 'Confirming...' : 'Confirm Chauffeured Tour'}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
