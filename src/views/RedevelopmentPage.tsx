'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, ShieldCheck, TrendingUp, Sparkles, ArrowRight, CheckCircle2, 
  Layers, Clock, Award, Users, Scale, FileText, Check, Phone, Mail, 
  MapPin, ChevronRight, HelpCircle, RefreshCw, Compass, HeartHandshake,
  DollarSign, Maximize2, Zap, ArrowUpRight, Lock, Eye, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RedevelopmentHeroScroll } from '../components/RedevelopmentHeroScroll';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';

interface RedevelopmentPageProps {
  onNavigate?: (page: string) => void;
}

export const RedevelopmentPage: React.FC<RedevelopmentPageProps> = ({
  onNavigate
}) => {
  const router = useRouter();
  const tourModalContext = useTourModal();
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'society',
    location: 'Panaji',
    approxArea: '',
    numberOfOwners: '1',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeStoryStage, setActiveStoryStage] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#044F92', '#00a8ff', '#ffffff']
    });
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToWhyKamat = () => {
    const el = document.getElementById('why-kamat-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 6-Stage Visual Story Pipeline
  const visualStoryStages = [
    {
      step: '01',
      stage: 'Existing Property',
      tagline: 'Aging Foundation & Unutilized Potential',
      desc: 'Deteriorating infrastructure, legacy waterproofing leaks, rising repair costs, and severely locked FSI potential on prime Goan land.',
      icon: <Building2 className="w-5 h-5 text-amber-600" />,
      color: 'border-amber-500/40 bg-amber-50/50'
    },
    {
      step: '02',
      stage: 'Potential',
      tagline: 'Technical & Regulatory Feasibility',
      desc: 'Kamat’s architectural and legal teams conduct exhaustive 30-year title clearances, zoning evaluations, and maximum permissible FSI calculations.',
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      color: 'border-blue-500/40 bg-blue-50/50'
    },
    {
      step: '03',
      stage: 'Vision',
      tagline: 'Masterplan & Value Modeling',
      desc: 'Bespoke biophilic architectural plans designed specifically for higher ceiling heights, open decks, cross-ventilation, and sustainable green living.',
      icon: <Compass className="w-5 h-5 text-indigo-600" />,
      color: 'border-indigo-500/40 bg-indigo-50/50'
    },
    {
      step: '04',
      stage: 'Partnership',
      tagline: 'Consensus & Legal Security',
      desc: 'Watertight, transparent Joint Development Agreement (JDA) with zero out-of-pocket owner capital, guaranteed possession timelines, and bank-backed escrow safety.',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-500/40 bg-emerald-50/50'
    },
    {
      step: '05',
      stage: 'Transformation',
      tagline: 'Turnkey Coastal Engineering',
      desc: 'M-35 saline-resistant RCC superstructure casting, multi-layer crystalline waterproofing, Schuco German glazing, and seamless transit relocation support.',
      icon: <Layers className="w-5 h-5 text-cyan-600" />,
      color: 'border-cyan-500/40 bg-cyan-50/50'
    },
    {
      step: '06',
      stage: 'New Development',
      tagline: 'Generations of Luxury & Wealth',
      desc: 'Handover of a modern iconic landmark with 250%+ asset appreciation, modern club amenities, dedicated multi-level parking, and lifetime structural support.',
      icon: <Sparkles className="w-5 h-5 text-[#044F92]" />,
      color: 'border-[#044F92] bg-[#f2f7fc]'
    }
  ];

  // Target Stakeholder Models
  const stakeholderModels = [
    {
      id: 'societies',
      badge: 'Housing Societies & Apartment Buildings',
      title: 'Revitalize Your Society with Larger Modern Homes',
      highlights: [
        '20% - 40% additional carpet area for each flat owner at zero cost',
        'Monthly transit rental compensation paid directly during construction',
        'Modern high-speed lifts, power backup, and dedicated parking bays',
        '300% surge in property asset value and rental yields upon completion'
      ],
      idealFor: 'Older apartment complexes (20+ years) in Panaji, Porvorim, Miramar, Mapusa, and Margao.'
    },
    {
      id: 'landowners',
      badge: 'Independent Bungalows & Land Parcels',
      title: 'Joint Development Model for Landowners',
      highlights: [
        'Retain a customized luxury penthouse or villa while monetizing surplus FSI',
        'Attractive revenue share or square-footage allocation models',
        'Zero development hassle — Kamat manages 100% approvals, design & construction',
        'Complete protection of ancestral heritage with legal title authentication'
      ],
      idealFor: 'Families with independent plots or ancestral properties seeking generational wealth.'
    },
    {
      id: 'commercial',
      badge: 'Prime Commercial & Retail Properties',
      title: 'Commercial Redevelopment & Retail Hubs',
      highlights: [
        'Transform obsolete retail shops into high-yielding Grade-A corporate towers',
        'Double-height showroom frontages with automated multi-tier basement parking',
        'LEED-certified green buildings that attract top multinational tenants',
        'Consistent 12% - 15% long-term commercial lease returns'
      ],
      idealFor: 'High-street plots and commercial structures in central business districts.'
    }
  ];

  // 5-Step Process
  const redevelopmentProcess = [
    {
      step: 'Step 01',
      title: 'Free Feasibility & FSI Audit',
      desc: 'Our senior architects evaluate your plot boundary, zoning regulations, and structural condition to determine optimal redevelopment potential.'
    },
    {
      step: 'Step 02',
      title: 'Transparent Commercial Proposal',
      desc: 'We present a clear financial model detailing your expanded carpet area, transit rent allowance, amenity allocations, and possession schedule.'
    },
    {
      step: 'Step 03',
      title: 'Society Consensus & RERA Legal JDA',
      desc: 'Interactive alignment sessions with society members. Registration of a legally fortified, RERA-approved Joint Development Agreement.'
    },
    {
      step: 'Step 04',
      title: 'Government Clearances & Swift Execution',
      desc: 'Kamat secures municipal, town planning, and environmental sanctions. Construction proceeds on strict milestone schedules with online live progress tracking.'
    },
    {
      step: 'Step 05',
      title: 'Celebratory Handover & Lifetime Care',
      desc: 'Occupancy Certificate (OC) delivery, key handover celebrations, updated legal conveyance deeds, and lifelong Kamat estate concierge backing.'
    }
  ];

  // FAQs
  const faqs = [
    {
      q: 'Do existing property owners need to invest any money in the redevelopment?',
      a: 'No. Kamat Realty funds 100% of the architectural design, government liaison, demolition, construction, and interior lobby finishes. Property owners do not spend a single rupee.'
    },
    {
      q: 'Where will society members live during the construction period?',
      a: 'Kamat provides monthly transit rental compensation directly to every homeowner from the day of evacuation until the final Occupancy Certificate (OC) key handover.'
    },
    {
      q: 'How does Kamat guarantee on-time delivery without delays?',
      a: 'We have maintained a 100% on-time handover track record over 32 years. Our contracts include bank guarantees, clear milestone penalty protections, and dedicated project escrow accounts.'
    },
    {
      q: 'What legal security do landowners and societies have during redevelopment?',
      a: 'Every agreement is registered as a legally binding, RERA-regulated Joint Development Agreement (JDA). Title ownership of your proportionate share remains strictly intact throughout.'
    }
  ];

  return (
    <div className="pb-28 bg-[#fdfcfb]">
      {/* 1. SMOOTH SCROLL REDEVELOPMENT HERO ANIMATION (240 Frames with Late Text Reveal) */}
      <RedevelopmentHeroScroll
        onScrollToForm={scrollToForm}
        onExploreBenefits={scrollToWhyKamat}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-20 space-y-32">

        {/* 2. THE 6-STAGE METAMORPHOSIS STORYLINE */}
        <div className="space-y-12">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                The Journey of Metamorphosis
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a]">
                From Aging Structure to Signature Landmark
              </h2>
              <p className="text-xs sm:text-sm text-[#8c857d] font-light">
                Existing Property ➔ Potential ➔ Vision ➔ Partnership ➔ Transformation ➔ New Development
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive 6-Stage Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visualStoryStages.map((item, idx) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setActiveStoryStage(idx)}
                className={`p-6 sm:p-8 border-2 transition-all duration-300 shadow-sm cursor-pointer flex flex-col justify-between ${
                  activeStoryStage === idx 
                    ? 'border-[#044F92] bg-white shadow-xl ring-2 ring-[#044F92]/15' 
                    : `${item.color} hover:border-[#044F92] hover:bg-white`
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#e5e1da] pb-3 mb-4">
                    <span className="font-mono text-xs font-bold text-[#044F92] tracking-widest">
                      STAGE {item.step}
                    </span>
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-[#e5e1da]">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#1a1a1a] mb-1">
                    {item.stage}
                  </h3>
                  <p className="text-xs font-semibold text-[#044F92] mb-3">
                    {item.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#4a4540] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#e5e1da] flex items-center justify-between text-[11px] font-semibold text-[#044F92]">
                  <span>Explore Phase Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. INTERACTIVE BEFORE VS AFTER COMPARISON */}
        <div className="bg-[#f2f7fc] border border-[#cfe0ee] p-8 sm:p-12 lg:p-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
              The Value Contrast
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
              Before & After Redevelopment
            </h2>
            <p className="text-xs text-[#8c857d]">
              Drag the interactive slider below to witness the architectural and financial elevation.
            </p>
          </div>

          {/* Dual Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The "Before" Dilemma */}
            <div className="bg-white p-8 border-2 border-amber-300 space-y-6 shadow-sm relative overflow-hidden">
              <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-widest">
                Existing Aging Property
              </div>

              <h3 className="font-display text-2xl font-bold text-[#1a1a1a]">
                Stagnant Asset with High Maintenance
              </h3>

              <ul className="space-y-3 text-xs text-[#5a554e]">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Deteriorating Structure:</strong> Monsoon seepage, corrosion of exposed steel & recurring civil repairs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Locked Potential:</strong> Unused FSI on valuable land with cramped, outdated layouts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Zero Modern Amenities:</strong> No elevator, parking congestion on roads, no security framework.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Declining Valuation:</strong> Low market resale price and flat rental yields.</span>
                </li>
              </ul>
            </div>

            {/* The "After" Transformation */}
            <div className="bg-[#032d54] text-white p-8 border-2 border-[#044F92] space-y-6 shadow-2xl relative overflow-hidden">
              <div className="inline-block px-3 py-1 bg-cyan-400 text-[#032d54] text-[10px] font-bold uppercase tracking-widest">
                Signature Kamat Redevelopment
              </div>

              <h3 className="font-display text-2xl font-bold text-white">
                Iconic 100-Year Luxury Landmark
              </h3>

              <ul className="space-y-3 text-xs text-blue-100">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                  <span><strong>Anti-Saline Permanence:</strong> M-35 high-density concrete, crystalline waterproofing & Schuco glazing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                  <span><strong>20% - 40% Extra Space:</strong> Expanded carpet area, double-height verandas & private balconies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                  <span><strong>5-Star Lifestyle:</strong> High-speed elevators, automated car parks, rooftop pool & 24/7 concierge.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                  <span><strong>3x Asset Appreciation:</strong> Skyrocketing market valuation with premium luxury rental returns.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4. TAILORED REDEVELOPMENT OPPORTUNITIES */}
        <div className="space-y-12">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Redevelopment Opportunities
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
                Tailored Solutions for Every Property Owner
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stakeholderModels.map((model) => (
              <div
                key={model.id}
                className="bg-white border-2 border-[#cfe0ee] hover:border-[#044F92] p-8 space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-[#f2f7fc] text-[#044F92] border border-[#cfe0ee] text-[9px] font-bold uppercase tracking-widest">
                    {model.badge}
                  </span>

                  <h3 className="font-display text-2xl font-bold text-[#1a1a1a]">
                    {model.title}
                  </h3>

                  <ul className="space-y-2.5 text-xs text-[#4a4540]">
                    {model.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#044F92] flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#e5e1da]">
                  <p className="text-[11px] text-[#8c857d] italic">
                    <strong>Ideal For:</strong> {model.idealFor}
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="w-full mt-4 py-2.5 bg-[#044F92] text-white hover:bg-[#03396c] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer text-center"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. WHY KAMAT (TRUSTED DEVELOPMENT PARTNER) */}
        <div id="why-kamat-section" className="border-t border-[#e5e1da] pt-20 space-y-12">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Why Partner with Kamat
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
                The Bedrock of Developer Trust
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem variant="from-behind">
              <div className="bg-white p-6 border border-[#cfe0ee] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-[#044F92] text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a]">30-Year Clear Titles</h3>
                <p className="text-xs text-[#8c857d] leading-relaxed">
                  Watertight ancestral title verification with zero legal grey areas. RERA registered and transparent.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-behind">
              <div className="bg-white p-6 border border-[#cfe0ee] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-[#044F92] text-white flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a]">32-Year On-Time Delivery</h3>
                <p className="text-xs text-[#8c857d] leading-relaxed">
                  100% track record of on-schedule handovers backed by milestone penalties and construction escrow accounts.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-behind">
              <div className="bg-white p-6 border border-[#cfe0ee] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-[#044F92] text-white flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a]">100-Year Coastal RCC</h3>
                <p className="text-xs text-[#8c857d] leading-relaxed">
                  Anti-saline M-35 concrete, multi-layer crystalline waterproofing, and Schuco German acoustic glazing.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-behind">
              <div className="bg-white p-6 border border-[#cfe0ee] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-[#044F92] text-white flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a]">Full Relocation Care</h3>
                <p className="text-xs text-[#8c857d] leading-relaxed">
                  Guaranteed monthly rental compensation and personalized tenant liaison throughout construction.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* 6. STREAMLINED 5-STEP REDEVELOPMENT PROCESS */}
        <div className="border-t border-[#e5e1da] pt-20 space-y-12">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Clear & Predictable Roadmap
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
                Our 5-Step Redevelopment Process
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {redevelopmentProcess.map((proc, i) => (
              <div key={i} className="bg-white p-6 border border-[#cfe0ee] hover:border-[#044F92] shadow-sm space-y-3 relative">
                <span className="font-mono text-xs font-bold text-[#044F92] bg-[#f2f7fc] px-2.5 py-1 border border-[#cfe0ee] inline-block">
                  {proc.step}
                </span>
                <h4 className="font-display text-lg font-bold text-[#1a1a1a]">{proc.title}</h4>
                <p className="text-xs text-[#5a554e] font-light leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        <div className="border-t border-[#e5e1da] pt-20 space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
              Got Questions?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-[#cfe0ee] overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-medium text-base text-[#1a1a1a] hover:text-[#044F92] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-[#044F92] transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#5a554e] font-light leading-relaxed border-t border-[#e5e1da] pt-4 bg-[#fdfcfb]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 8. FINAL ENQUIRY FORM CTA */}
        <div ref={formRef} className="border-t border-[#e5e1da] pt-20">
          <div className="bg-[#032d54] text-white p-8 sm:p-12 lg:p-16 rounded-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto space-y-8 relative z-10">
              <div className="text-center space-y-3">
                <span className="inline-block px-3.5 py-1 bg-white/10 text-cyan-300 text-[10px] uppercase tracking-[0.25em] font-bold border border-cyan-400/30">
                  Confidential Consultation
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-white">
                  Is Your Property Ready for a New Future?
                </h2>
                <p className="text-sm text-blue-100 max-w-xl mx-auto font-light">
                  Submit your property details below for a free technical feasibility analysis, FSI potential audit, and customized redevelopment proposal.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-white text-[#1a1a1a] text-center space-y-4 border-2 border-cyan-400 shadow-xl">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">Enquiry Received Successfully</h3>
                  <p className="text-xs text-[#5a554e] max-w-md mx-auto">
                    Thank you, {formData.fullName}. Our Senior Redevelopment & Land Partnerships team will contact you within 24 hours for a confidential consultation.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2 bg-[#044F92] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Submit Another Property
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-white text-[#1a1a1a] p-6 sm:p-10 border border-[#cfe0ee] shadow-2xl space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-bold mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Naik"
                        className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-bold mb-1.5">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-bold mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                      />
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-bold mb-1.5">
                        Property Category *
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                      >
                        <option value="society">Residential Housing Society / Apartment</option>
                        <option value="bungalow">Independent Ancestral Bungalow / House</option>
                        <option value="land">Vacant Land Parcel / Estate</option>
                        <option value="commercial">Commercial Building / Retail Shops</option>
                      </select>
                    </div>

                    {/* Location in Goa */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-bold mb-1.5">
                        Location in Goa *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Miramar, Panaji or Porvorim"
                        className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                      />
                    </div>

                    {/* Approx Plot Area */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-bold mb-1.5">
                        Approximate Plot / Built-Up Area
                      </label>
                      <input
                        type="text"
                        value={formData.approxArea}
                        onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                        placeholder="e.g. 850 Sq.Mtrs / 12 Units"
                        className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8c857d] font-bold mb-1.5">
                      Property Details / Specific Questions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share any details such as current building age, number of society members, or your desired outcome..."
                      className="w-full px-3.5 py-2.5 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#044F92] hover:bg-[#03396c] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-cyan-300" />
                      <span>Submit Confidential Redevelopment Request</span>
                    </button>
                    <p className="text-[10px] text-[#8c857d] text-center mt-2.5">
                      🔒 100% Confidentiality Guaranteed. Your information is protected under Kamat Realty Privacy Protocols.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
