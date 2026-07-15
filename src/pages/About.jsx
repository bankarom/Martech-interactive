import React from 'react';
import SEOHelper from '../components/SEOHelper';
import { Award, ShieldCheck, Mail, Compass } from 'lucide-react';

export default function About() {
  return (
    <>
      <SEOHelper 
        title="About Improx Martech" 
        description="Learn about our publishing team and solutions consulting missions."
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-martech-border pb-8 mb-12 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-martech-cyan bg-martech-cyan/10 px-3 py-1 rounded-full border border-martech-cyan/20">Our Identity</span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent mt-4 mb-4 font-display">Enterprise Media & Solutions</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            We bridge B2B publishing with technical stack integration to build clear pipelines for SaaS companies.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-16">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white font-display">Bridging Information and Operations</h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Founded in 2026, Improx Martech operates at the convergence of editorial market intelligence and demand execution. We believe that professional articles and reports should not stand separate from operational technology implementations.
            </p>
            <p className="text-slate-300 text-base leading-relaxed">
              We provide readers with verified analyses of cookie-less programmatic trends, first-party data clean rooms, and system workflows, while offering tech vendors qualified, intent-based demand gen lead syndications.
            </p>
          </div>

          <div className="rounded-3xl border border-martech-border bg-gradient-to-br from-martech-navy to-martech-dark p-8 text-center shadow-xl">
            <Compass className="h-12 w-12 text-martech-cyan mx-auto mb-4" />
            <span className="block text-3xl font-black text-white">24,000+</span>
            <span className="block text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">Subscribing CMOs</span>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-martech-border bg-martech-card p-6 shadow-md">
            <Award className="h-8 w-8 text-martech-primary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2 font-display">Editorial Precision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our writers are veteran operators who audit pipelines, sync databases, and run ad platforms daily.
            </p>
          </div>

          <div className="rounded-2xl border border-martech-border bg-martech-card p-6 shadow-md">
            <ShieldCheck className="h-8 w-8 text-martech-accent mb-4" />
            <h3 className="text-lg font-bold text-white mb-2 font-display">Lead Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every B2B contact we syndicate is double opt-in, filtered by intent tools, and GDPR/CCPA compliant.
            </p>
          </div>

          <div className="rounded-2xl border border-martech-border bg-martech-card p-6 shadow-md">
            <Mail className="h-8 w-8 text-martech-accent mb-4" />
            <h3 className="text-lg font-bold text-white mb-2 font-display">Operational Integrity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We focus on clean customer profiling setup rather than selling bloated multi-year licenses.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
