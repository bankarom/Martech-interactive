import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function LeadCalculator() {
  const [tools, setTools] = useState(8);
  const [spend, setSpend] = useState(12000);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const potentialSavings = Math.round(spend * 0.28); // Estimate 28% stack optimization savings
  const optimizationHours = Math.round(tools * 4.5); // Estimate 4.5 hours per integration audit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitted(true);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-martech-navy/40 p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-martech-accent/10 rounded-full blur-3xl -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: interactive calculator */}
        <div>
          <div className="flex items-center space-x-2 text-martech-accent mb-4">
            <Calculator className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Operational Audit Tool</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white leading-tight mb-4">
            MarTech Stack ROI Calculator
          </h2>
          <p className="text-slate-300 text-sm mb-8">
            Estimate license waste and optimization gains. B2B stacks average 25% redundant tooling cost.
          </p>

          <div className="space-y-6">
            
            {/* Tool Count Range */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-slate-400">Total Stack App Count</span>
                <span className="text-white">{tools} Systems</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="30"
                value={tools} 
                onChange={(e) => setTools(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-martech-accent"
              />
            </div>

            {/* Monthly Spend Input */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-slate-400">Estimated Monthly Software Spend</span>
                <span className="text-white">${spend.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="2000" 
                max="100000"
                step="2000"
                value={spend} 
                onChange={(e) => setSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-martech-accent"
              />
            </div>

          </div>
        </div>

        {/* Right Side: Results & Capture Form */}
        <div className="rounded-2xl border border-white/5 bg-martech-dark/60 p-6 sm:p-8">
          {!submitted ? (
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Estimate Optimization Opportunity</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-white/5 p-4 border border-white/5 text-center">
                  <span className="block text-xs text-slate-400 mb-1">Annual Savings</span>
                  <span className="text-xl sm:text-2xl font-black text-martech-cyan">${(potentialSavings * 12).toLocaleString()}</span>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/5 text-center">
                  <span className="block text-xs text-slate-400 mb-1">Sync Sync Lag Saved</span>
                  <span className="text-xl sm:text-2xl font-black text-martech-indigo">{optimizationHours} Hrs/Yr</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Work Email Address</label>
                  <input 
                    type="email" 
                    placeholder="jane@company.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-accent focus:outline-none"
                  />
                </div>
                <button 
                  type="submit" 
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-martech-accent to-martech-cyan py-3 text-sm font-semibold text-white transition hover:opacity-95 cursor-pointer"
                >
                  <span>Request Full Integration Report</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-12 w-12 text-martech-cyan mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Report Requested Successfully!</h3>
              <p className="text-slate-300 text-sm mb-6">
                Thank you, {name}. We have compiled your stack analytics report. A Martech strategist will email the detailed findings to <span className="text-martech-cyan font-semibold">{email}</span> shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs text-martech-accent hover:underline font-bold"
              >
                Recalculate Values
              </button>
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
}
