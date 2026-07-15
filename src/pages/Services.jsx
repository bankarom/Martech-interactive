import React, { useState, useEffect } from 'react';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { Award, ArrowRight, ShieldCheck, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await CMSService.getServices();
      setServices(data);
    }
    load();
  }, []);

  return (
    <>
      <SEOHelper 
        title="B2B Solutions & Services" 
        description="Enterprise ABM orchestrations, marketing technology stack audits, and compliant content lead syndications."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-martech-border pb-8 mb-16 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-martech-cyan bg-martech-cyan/10 px-3 py-1 rounded-full border border-martech-cyan/20">Enterprise Offerings</span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent mt-4 mb-4 font-display">Marketing Solutions</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            We partner with high-growth SaaS and technology teams to integrate systems, setup lead lifecycles, and optimize acquisition spend.
          </p>
        </div>

        {/* List Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(svc => (
            <div 
              key={svc.id}
              className="group rounded-3xl border border-martech-border bg-gradient-to-br from-martech-navy to-martech-dark p-8 flex flex-col justify-between hover:border-martech-primary/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-martech-primary/5 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="h-12 w-12 rounded-2xl bg-martech-cyan/10 flex items-center justify-center text-martech-cyan mb-6 group-hover:scale-105 transition-transform">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{svc.title}</h3>
                <p className="text-slate-450 text-xs leading-relaxed mb-6 font-medium">{svc.shortDescription}</p>

                {/* Features bullet checklist */}
                <ul className="space-y-3 mb-8">
                  {svc.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs text-slate-350">
                      <ShieldCheck className="h-4 w-4 text-martech-cyan" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-martech-border pt-6 mt-6 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">{svc.impact}</span>
                <Link 
                  to={`/solutions/${svc.id}`} 
                  className="inline-flex items-center space-x-1 text-xs font-black text-martech-cyan hover:text-martech-primary transition-colors cursor-pointer"
                >
                  <span>Explore Offering</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
