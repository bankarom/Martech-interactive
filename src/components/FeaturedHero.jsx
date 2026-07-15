import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';

export default function FeaturedHero({ slides }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[current];

  return (
    <div className="relative w-full h-[550px] overflow-hidden rounded-3xl border border-white/5 bg-martech-navy/30">
      
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-martech-dark via-martech-dark/60 to-transparent z-10" />
          <img 
            src={activeSlide.featuredImage} 
            alt={activeSlide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-8 sm:p-12 md:p-16 flex flex-col justify-end h-full">
        <div className="max-w-3xl">
          
          {/* Category Tag */}
          <span className="inline-block rounded bg-martech-accent/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-martech-accent mb-4 border border-martech-accent/40">
            {activeSlide.category}
          </span>

          {/* Title */}
          <Link to={activeSlide.link}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 hover:text-martech-cyan transition-colors line-clamp-2">
              {activeSlide.title}
            </h1>
          </Link>

          {/* Excerpt */}
          <p className="text-slate-300 text-sm sm:text-base mb-6 line-clamp-2 max-w-2xl">
            {activeSlide.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center space-x-6 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <User className="h-4.5 w-4.5 text-martech-accent" />
              <span>{activeSlide.author}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="h-4.5 w-4.5 text-martech-cyan" />
              <span>{activeSlide.readTime}</span>
            </span>
            <span>{activeSlide.date}</span>
          </div>

        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-8 bottom-8 z-30 flex space-x-2">
        <button 
          onClick={handlePrev}
          className="rounded-full border border-white/10 bg-martech-dark/60 p-3 text-white transition hover:bg-martech-accent hover:border-martech-accent cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={handleNext}
          className="rounded-full border border-white/10 bg-martech-dark/60 p-3 text-white transition hover:bg-martech-accent hover:border-martech-accent cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

    </div>
  );
}
