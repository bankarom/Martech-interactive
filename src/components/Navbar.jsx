import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Plus, Minus, Sun, Moon } from 'lucide-react';
import { CATEGORY_TREE } from '../services/cms';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'news' | 'media' | null
  // Mobile accordion states
  const [mobileNewsExpanded, setMobileNewsExpanded] = useState(false);
  const [mobileMediaExpanded, setMobileMediaExpanded] = useState(false);
  const [expandedMobileSubcat, setExpandedMobileSubcat] = useState(null);

  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const newsInsights = CATEGORY_TREE.find(c => c.slug === 'insights');

  return (
    <header className="sticky top-0 z-50 w-full bg-martech-navy/95 backdrop-blur-md border-b border-martech-border transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              IMPROX <span className="bg-gradient-to-r from-martech-accent to-martech-cyan bg-clip-text text-transparent">MARTECH</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-martech-accent ${location.pathname === '/' ? 'text-martech-accent' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Home
            </Link>

            {/* News & Insights Mega Menu */}
            <div 
              className="static"
              onMouseEnter={() => handleMouseEnter('news')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center space-x-1 text-sm font-semibold tracking-wide transition-colors hover:text-martech-accent focus:outline-none cursor-pointer py-6 ${location.pathname.startsWith('/insights') ? 'text-martech-accent' : 'text-slate-600 dark:text-slate-300'}`}
              >
                <span>News & Insights</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'news' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 z-50 mt-1.5 border border-martech-border bg-martech-navy/98 py-8 px-8 shadow-2xl backdrop-blur-xl rounded-3xl"
                  >
                    <div className="mx-auto max-w-7xl">
                      {/* Columns grid */}
                      <div className="grid grid-cols-5 gap-8">
                        {newsInsights?.subcategories.map(sub => (
                          <div key={sub.slug} className="space-y-4">
                            <Link 
                              to={`/insights/${sub.slug}`}
                              onClick={handleMouseLeave}
                              className="block text-sm font-extrabold uppercase tracking-wider text-martech-primary hover:text-martech-accent transition-colors border-b border-martech-border pb-2"
                            >
                              {sub.name}
                            </Link>
                            <div className="flex flex-col space-y-2">
                              {sub.children?.map(child => (
                                <Link 
                                  key={child.slug}
                                  to={`/insights/${sub.slug}/${child.slug}`}
                                  onClick={handleMouseLeave}
                                  className="group/item flex items-center space-x-1.5 text-[13px] sm:text-sm text-slate-655 dark:text-slate-455 hover:text-martech-primary hover:scale-[1.08] hover:translate-x-1.5 transition-all duration-200 origin-left cursor-pointer font-medium"
                                >
                                  <span className="text-[9px] text-martech-primary/60 group-hover/item:text-martech-primary transition-colors font-bold">•</span>
                                  <span>{child.name}</span>
                                </Link>
                              ))}
                            </div>
                            <div className="pt-3">
                              <Link 
                                to={`/insights/${sub.slug}`}
                                onClick={handleMouseLeave}
                                className="inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-white bg-martech-primary hover:bg-martech-primary/80 px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-martech-primary/20 hover:scale-[1.03]"
                              >
                                Explore Hub &rarr;
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-martech-border/60 pt-6 mt-8 flex justify-between items-center text-xs">
                        <span className="text-slate-500">Need specific custom analyses?</span>
                        <Link 
                          to="/insights"
                          onClick={handleMouseLeave}
                          className="font-bold text-martech-primary hover:underline"
                        >
                          View All Editorial Content &rarr;
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Spotlights & Reports Dropdown Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('media')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center space-x-1 text-sm font-semibold tracking-wide transition-colors hover:text-martech-accent focus:outline-none cursor-pointer py-6 ${location.pathname.startsWith('/interviews') || location.pathname.startsWith('/case-studies') || location.pathname.startsWith('/reports') ? 'text-martech-accent' : 'text-slate-600 dark:text-slate-300'}`}
              >
                <span>Spotlights & Reports</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'media' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-1 w-56 rounded-2xl border border-martech-border bg-martech-card p-3 shadow-xl backdrop-blur-xl z-50"
                  >
                    <div className="flex flex-col space-y-1">
                      <Link 
                        to="/interviews" 
                        onClick={handleMouseLeave}
                        className="rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                      >
                        CMO Spotlights
                      </Link>
                      <Link 
                        to="/case-studies" 
                        onClick={handleMouseLeave}
                        className="rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                      >
                        Case Studies
                      </Link>
                      <Link 
                        to="/reports" 
                        onClick={handleMouseLeave}
                        className="rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                      >
                        Research Reports
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/infographics"
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-martech-accent ${location.pathname.startsWith('/infographics') ? 'text-martech-accent' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Infographics
            </Link>

            <Link 
              to="/solutions" 
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-martech-accent ${location.pathname.startsWith('/solutions') ? 'text-martech-accent' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Solutions
            </Link>

            <Link 
              to="/about" 
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-martech-accent ${location.pathname === '/about' ? 'text-martech-accent' : 'text-slate-600 dark:text-slate-300'}`}
            >
              About
            </Link>
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-martech-border bg-martech-navy hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-300 text-slate-750 dark:text-slate-300 cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
              </motion.div>
            </button>
            <Link 
              to="/contact" 
              className="relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-martech-accent to-martech-cyan px-5 h-11 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
            >
              <span>Consultation</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-martech-border bg-martech-navy text-slate-750 dark:text-slate-350 focus:outline-none cursor-pointer flex items-center justify-center active:scale-95 shadow-sm"
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
              </motion.div>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-650 dark:text-slate-300 hover:text-martech-accent focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Accordion Structure */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-martech-dark"
          >
            <div className="space-y-1 px-4 py-6">
              
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                Home
              </Link>

              {/* News Dropdown Accordion */}
              <div className="py-2 px-3">
                <button
                  onClick={() => setMobileNewsExpanded(!mobileNewsExpanded)}
                  className="flex w-full items-center justify-between text-base font-semibold text-slate-300 focus:outline-none cursor-pointer"
                >
                  <span>News & Insights</span>
                  {mobileNewsExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </button>

                <AnimatePresence>
                  {mobileNewsExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2 border-l border-white/10"
                    >
                      {newsInsights?.subcategories.map(sub => (
                        <div key={sub.slug} className="py-1">
                          <button
                            onClick={() => setExpandedMobileSubcat(expandedMobileSubcat === sub.slug ? null : sub.slug)}
                            className="flex w-full items-center justify-between text-sm font-semibold text-slate-400 hover:text-white focus:outline-none cursor-pointer"
                          >
                            <span>{sub.name}</span>
                            {expandedMobileSubcat === sub.slug ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                          </button>
                          
                          {expandedMobileSubcat === sub.slug && (
                            <div className="pl-4 mt-1 space-y-1">
                              <Link 
                                to={`/insights/${sub.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1 text-xs text-martech-accent font-bold"
                              >
                                View Category Main &rarr;
                              </Link>
                              {sub.children?.map(child => (
                                <Link
                                  key={child.slug}
                                  to={`/insights/${sub.slug}/${child.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-1 text-xs text-slate-500 hover:text-white"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Spotlights & Reports Dropdown Accordion (Mobile) */}
              <div className="py-2 px-3">
                <button
                  onClick={() => setMobileMediaExpanded(!mobileMediaExpanded)}
                  className="flex w-full items-center justify-between text-base font-semibold text-slate-300 focus:outline-none cursor-pointer"
                >
                  <span>Spotlights & Reports</span>
                  {mobileMediaExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </button>

                <AnimatePresence>
                  {mobileMediaExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2 border-l border-white/10"
                    >
                      <Link 
                        to="/interviews" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-slate-400 hover:text-white"
                      >
                        CMO Spotlights
                      </Link>
                      <Link 
                        to="/case-studies" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-slate-400 hover:text-white"
                      >
                        Case Studies
                      </Link>
                      <Link 
                        to="/reports" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-slate-400 hover:text-white"
                      >
                        Research Reports
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to="/infographics" 
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                Infographics
              </Link>

              <Link 
                to="/solutions" 
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                Solutions
              </Link>

              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                About
              </Link>

              <div className="mt-4 pt-4 border-t border-white/5">
                <Link 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-martech-accent to-martech-cyan py-3 text-center text-sm font-semibold text-white"
                >
                  Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
