import React, { useState } from 'react';
import { Calculator, TrendingUp, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(35000000); // 3.5 Cr default
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // EMI Calculation Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyInterestRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Estimated annual luxury rental yield (conservative 10% in Goa)
  const estAnnualRentalYield = (loanAmount * 1.2 * 0.10);
  const estMonthlyRentalYield = estAnnualRentalYield / 12;

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <section id="calculator-section" className="py-24 bg-[#f4f1ee] border-t border-[#e5e1da]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold border-b border-[#044F92]/40 pb-1 inline-block">
              Financial Architecture & ROI
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1a1a1a]">
              Mortgage & Rental ROI Estimator
            </h2>
            <p className="text-[#4a4540] text-sm sm:text-base font-light leading-relaxed">
              Plan your investment in Goa real estate with bespoke financing structures and estimated vacation rental yields.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#e5e1da] p-6 sm:p-10 shadow-lg">
          {/* Left Inputs Column (Appearing from Left) */}
          <ScrollReveal variant="from-left" distance={40} className="lg:col-span-7 space-y-6">
            <div className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-secondary font-semibold text-[#1a1a1a] uppercase tracking-wider text-[10px]">Loan / Investment Amount</label>
                <span className="font-secondary font-medium text-[#044F92] text-lg">{formatINR(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={5000000}
                max={150000000}
                step={500000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-[#e5e1da] rounded-none appearance-none cursor-pointer accent-[#044F92]"
              />
              <div className="flex justify-between text-[10px] text-[#8c857d] font-primary">
                <span>₹50 L</span>
                <span>₹7.5 Cr</span>
                <span>₹15 Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-secondary font-semibold text-[#1a1a1a] uppercase tracking-wider text-[10px]">Annual Interest Rate (%)</label>
                <span className="font-secondary font-medium text-[#044F92] text-lg">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={7.0}
                max={14.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-[#e5e1da] rounded-none appearance-none cursor-pointer accent-[#044F92]"
              />
              <div className="flex justify-between text-[10px] text-[#8c857d] font-primary">
                <span>7.0%</span>
                <span>8.5% (Prime Tier)</span>
                <span>14.0%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-secondary font-semibold text-[#1a1a1a] uppercase tracking-wider text-[10px]">Tenure (Years)</label>
                <span className="font-secondary font-medium text-[#044F92] text-lg">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-1.5 bg-[#e5e1da] rounded-none appearance-none cursor-pointer accent-[#044F92]"
              />
              <div className="flex justify-between text-[10px] text-[#8c857d] font-primary">
                <span>5 Yrs</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

            {/* Financial Institution Partners note */}
            <div className="p-4 bg-[#fdfcfb] border border-[#e5e1da] flex items-center gap-3 text-xs text-[#4a4540]">
              <ShieldCheck className="w-5 h-5 text-[#044F92] shrink-0" />
              <span className="font-primary">
                Preferred financing tie-ups with HDFC, ICICI, SBI & Kotak Private Banking for swift approvals.
              </span>
            </div>
          </div>
          </ScrollReveal>

          {/* Right Results Column (Emerging from Behind) */}
          <ScrollReveal variant="from-behind" delay={0.2} className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-[#f2f7fc] border border-[#cfe0ee] p-6 sm:p-8 flex flex-col justify-between space-y-6 h-full shadow-md">
              <div>
                <p className="font-secondary text-[10px] uppercase tracking-widest text-[#044F92] font-bold">Estimated Monthly Outflow</p>
                <h3 className="font-secondary text-3xl sm:text-4xl font-medium text-[#1a1a1a] mt-1">
                  {formatINR(emi)} <span className="text-xs font-primary font-normal text-[#8c857d]">/ month</span>
                </h3>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#cfe0ee] text-xs">
                <div className="flex justify-between">
                  <span className="font-primary text-[#8c857d]">Principal Amount:</span>
                  <span className="font-secondary text-[#1a1a1a] font-semibold">{formatINR(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-primary text-[#8c857d]">Total Interest Payable:</span>
                  <span className="font-secondary text-[#1a1a1a] font-semibold">{formatINR(totalInterest)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-[#cfe0ee]">
                  <span className="font-secondary text-[#044F92]">Total Obligation:</span>
                  <span className="font-secondary text-[#044F92] font-bold text-sm">{formatINR(totalPayment)}</span>
                </div>
              </div>

              {/* Goa Rental ROI Projection box */}
              <div className="bg-white p-4 border border-[#cfe0ee] space-y-1 text-xs shadow-sm">
                <div className="flex items-center gap-1.5 text-[#044F92] font-semibold text-[11px] uppercase tracking-wider font-secondary">
                  <TrendingUp className="w-4 h-4 text-[#044F92]" />
                  <span>Projected Vacation Rental Income</span>
                </div>
                <p className="text-[#044F92] font-secondary text-base font-bold">
                  ~ {formatINR(estMonthlyRentalYield)} <span className="text-[10px] font-normal font-primary text-[#8c857d]">/ mo (~10-12% yield)</span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
