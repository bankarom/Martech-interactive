import React, { useState, useEffect } from 'react';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await CMSService.getCaseStudies();
      setCases(data);
    }
    load();
  }, []);

  return (
    <>
      <SEOHelper 
        title="B2B Case Studies" 
        description="Learn how enterprise SaaS and tech organizations optimized operations and scaled targets."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-martech-border pb-8 mb-12 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-martech-cyan bg-martech-cyan/10 px-3 py-1 rounded-full border border-martech-cyan/20">Proven Growth</span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent mt-4 mb-4 font-display">Enterprise Case Studies</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Real success stories mapping operational changes, integration architectures, and direct revenue pipeline returns.
          </p>
        </div>

        {/* Dynamic List grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map(cs => (
            <div 
              key={cs.id}
              className="group flex flex-col rounded-3xl border border-martech-border bg-gradient-to-br from-martech-navy to-martech-dark overflow-hidden hover:border-martech-primary/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-martech-primary/5 transition-all duration-300 shadow-sm"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img 
                  src={cs.featuredImage} 
                  alt={cs.title} 
                  className="w-full h-full object-cover transition group-hover:scale-105 duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1.5 text-[9px] font-black tracking-wider uppercase text-martech-cyan border border-martech-cyan/20">
                    {cs.industry}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-martech-accent uppercase tracking-wider">{cs.company}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-4 leading-snug bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent group-hover:from-martech-primary group-hover:to-martech-accent transition-all duration-300 font-display">
                    {cs.title}
                  </h3>
                  
                  {/* Results preview */}
                  <div className="space-y-2 mb-6">
                    {cs.results.map((res, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm text-slate-350">
                        <CheckCircle className="h-4.5 w-4.5 text-martech-cyan shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-martech-border pt-6 mt-6 flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-semibold">Published {cs.date.split(',')[0]}</span>
                  <Link 
                    to={`/case-studies/${cs.id}`}
                    className="rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary text-white shadow-md shadow-martech-primary/10 px-4 h-9 flex items-center text-[10px] font-black tracking-wider uppercase hover:from-martech-primary hover:to-martech-accent hover:shadow-lg hover:shadow-martech-primary/20 transition-all duration-300 cursor-pointer"
                  >
                    Read Case Study
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
