import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await CMSService.getInterviews();
      setInterviews(data);
    }
    load();
  }, []);

  // Automatic slideshow transition (slides every 6 seconds)
  useEffect(() => {
    if (interviews.length <= 4) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % (interviews.length - 3));
    }, 6000);
    return () => clearInterval(interval);
  }, [interviews]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? interviews.length - 4 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= interviews.length - 4 ? 0 : prev + 1));
  };

  const visibleInterviews = interviews.slice(startIndex, startIndex + 4);

  return (
    <>
      <SEOHelper 
        title="Executive Spotlight & Interviews" 
        description="Exclusive Q&A transcripts with leading CMOs, Martech operation specialists, and startup founders."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Header (MTC style) */}
        <div className="border-b border-martech-border pb-6 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-martech-accent">Executive Spotlight</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 font-display">MarTech Interview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">Exploring news, culture, and stories.</p>
          </div>
        </div>

        {/* Carousel Container */}
        {interviews.length > 0 ? (
          <div className="space-y-6">
            
            {/* Sliding Cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleInterviews.map((int) => (
                <div 
                  key={int.id}
                  className="group rounded-3xl border border-martech-border bg-gradient-to-br from-martech-navy to-martech-dark p-6 flex flex-col justify-between hover:border-martech-primary/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-martech-primary/5 transition-all duration-300 shadow-sm h-[440px]"
                >
                  <div>
                    {/* Guest Profile Details */}
                    <div className="flex items-center space-x-3 mb-5 border-b border-martech-border/50 pb-4">
                      <img 
                        src={int.guestAvatar} 
                        alt={int.guestName}
                        className="h-12 w-12 rounded-xl object-cover border border-martech-border flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight truncate bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent group-hover:from-martech-primary group-hover:to-martech-accent transition-all duration-300">{int.guestName}</h3>
                        <p className="text-[10px] text-martech-cyan font-extrabold truncate mt-0.5">{int.guestRole}</p>
                        <p className="text-[9px] text-slate-450 uppercase font-semibold tracking-wide truncate">{int.guestCompany}</p>
                      </div>
                    </div>

                    <span className="text-[9px] uppercase font-extrabold text-white bg-gradient-to-r from-martech-accent to-martech-primary px-2.5 py-1 rounded-lg tracking-wider inline-block mb-4 shadow-sm shadow-martech-primary/20">Interviews</span>

                    {/* Excerpt */}
                    <p className="text-[13px] sm:text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed font-medium line-clamp-5 italic">
                      "{int.excerpt}"
                    </p>
                  </div>

                  <div className="border-t border-martech-border/50 pt-4 mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{int.readTime}</span>
                    <Link 
                      to={`/interviews/${int.id}`}
                      className="rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary text-white shadow-md shadow-martech-primary/10 px-4.5 h-9 flex items-center text-[10px] font-black tracking-wider uppercase hover:from-martech-primary hover:to-martech-accent hover:shadow-lg hover:shadow-martech-primary/20 transition-all duration-300 cursor-pointer"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Footer controls (Matches Image 1 layout) */}
            {interviews.length > 4 && (
              <div className="flex items-center justify-between border-t border-martech-border/50 pt-4">
                {/* Pagination index indicator (Matches "3 - 12" style) */}
                <div className="text-xs font-bold text-slate-550 dark:text-slate-400 font-display">
                  {startIndex + 1} &mdash; {interviews.length}
                </div>

                {/* Arrow navigation triggers */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handlePrev}
                    className="p-2 rounded-xl border border-martech-border bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-martech-primary hover:text-white transition cursor-pointer"
                    aria-label="Previous Interview"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="p-2 rounded-xl border border-martech-border bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-martech-primary hover:text-white transition cursor-pointer"
                    aria-label="Next Interview"
                  >
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-16 rounded-3xl border border-martech-border bg-martech-navy">
            <p className="text-sm text-slate-500 dark:text-slate-400">No interviews published yet.</p>
          </div>
        )}

      </div>
    </>
  );
}
