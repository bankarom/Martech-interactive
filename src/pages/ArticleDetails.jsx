import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { Clock, Calendar, ArrowLeft, Heart, MessageSquare, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArticleDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  // Progress Bar scroll listener
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await CMSService.getArticleBySlug(slug);
      const allArts = await CMSService.getArticles();
      const popList = await CMSService.getPopularArticles();

      if (data) {
        setArticle(data);
        // Find related (excluding current, same category)
        setRelated(allArts.filter(a => a.slug !== slug && a.categorySlug === data.categorySlug).slice(0, 3));
        setPopular(popList.filter(a => a.slug !== slug).slice(0, 3));
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-slate-400">
        Loading article details...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-martech-accent hover:underline bg-transparent border-0 cursor-pointer">Go Back</button>
      </div>
    );
  }

  // Mock Table of Contents content based on headers
  const tableOfContents = [
    { id: 'introduction', label: '1. Executive Introduction' },
    { id: 'signals', label: '2. Setting up Intent Signal Monitoring' },
    { id: 'cleanrooms', label: '3. B2B First-Party Data Clean Rooms' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <SEOHelper title={article.title} description={article.excerpt} />

      {/* Sticky Reading Progress Bar */}
      <div 
        className="fixed top-[80px] left-0 z-50 h-1 bg-gradient-to-r from-martech-accent to-martech-cyan transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back navigation link */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-10 bg-transparent border-0 cursor-pointer p-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Feed</span>
        </button>

        {/* Dynamic Category Link & Header info */}
        <div className="max-w-4xl mx-auto border-b border-martech-border pb-8 mb-12 text-center md:text-left">
          <Link 
            to={`/insights/${article.categorySlug}`}
            className="inline-block rounded-full bg-martech-accent/15 border border-martech-accent/25 px-4 py-1.5 text-xs font-bold text-martech-accent uppercase tracking-wider mb-6 hover:bg-martech-accent hover:text-white transition"
          >
            {article.category}
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
            {/* Author */}
            <div className="flex items-center space-x-3">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="h-10 w-10 rounded-full object-cover border border-martech-border"
              />
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">{article.author.name}</p>
                <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1">{article.author.role}</p>
              </div>
            </div>

            {/* Read Specs */}
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-martech-accent" />
                <span>{article.date}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-martech-cyan" />
                <span>{article.readTime}</span>
              </span>
              {article.views && (
                <span className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.views} Views</span>
                </span>
              )}
            </div>

            {/* Social Share Column placeholders */}
            <div className="flex items-center space-x-2">
              <button className="h-8 w-8 rounded-full bg-slate-100 dark:bg-white/5 border border-martech-border flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-martech-accent transition cursor-pointer" aria-label="Share on LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </button>
              <button className="h-8 w-8 rounded-full bg-slate-100 dark:bg-white/5 border border-martech-border flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-martech-accent transition cursor-pointer" aria-label="Share on Twitter">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
              <button className="h-8 w-8 rounded-full bg-slate-100 dark:bg-white/5 border border-martech-border flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-martech-accent transition cursor-pointer" aria-label="Copy Link">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Hero image banner */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden aspect-video border border-martech-border shadow-2xl mb-16 bg-slate-905">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Three column reading layout: TOC (left), Content (center), Widgets (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left: Table of Contents */}
          <div className="lg:col-span-3 sticky top-28 hidden lg:block rounded-2xl border border-martech-border bg-martech-navy p-5 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4">Table of Contents</h4>
            <div className="space-y-3">
              {tableOfContents.map(toc => (
                <a 
                  key={toc.id}
                  href={`#${toc.id}`}
                  className="block text-xs text-slate-550 dark:text-slate-400 hover:text-martech-accent transition"
                >
                  {toc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Center: Content */}
          <div className="lg:col-span-6 space-y-12">
            <div 
              className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-lg sm:text-xl leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Newsletter Subscription Box */}
            <div className="rounded-3xl border border-martech-border bg-slate-100 dark:bg-slate-900/60 p-8 text-center shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Subscribe to MarTech Operations</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Receive licensing optimization workflows and first-party clean room templates.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex space-y-3 sm:space-y-0 sm:flex-row sm:gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Business Email" 
                  required
                  className="flex-1 rounded-xl border border-martech-border bg-slate-50 dark:bg-white/5 px-4 py-3 text-xs text-slate-850 dark:text-white placeholder-slate-500 focus:border-martech-accent focus:outline-none"
                />
                <button className="rounded-xl bg-gradient-to-r from-martech-accent to-martech-cyan px-6 py-3 text-xs font-bold text-white transition hover:opacity-95 cursor-pointer">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Comments Section placeholder */}
            <div className="border-t border-martech-border pt-8">
              <h4 className="text-base font-bold text-slate-800 dark:text-white mb-6 flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-martech-cyan" />
                <span>Discussion Transcripts</span>
              </h4>
              <div className="rounded-2xl border border-martech-border bg-slate-100 dark:bg-slate-900/60 p-6 text-center space-y-3 shadow-sm">
                <p className="text-xs text-slate-500 dark:text-slate-400">Discussion threads are locked to verified CMO newsletter subscribers.</p>
                <button className="text-xs font-bold text-martech-accent hover:underline cursor-pointer">
                  Sign In to Read Thread
                </button>
              </div>
            </div>

          </div>

          {/* Right: Popular / Related Widgets */}
          <div className="lg:col-span-3 space-y-8">
            {related.length > 0 && (
              <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4">Related Insights</h4>
                <div className="space-y-4">
                  {related.map(art => (
                    <div key={art.slug} className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-martech-accent">{art.category}</span>
                      <Link to={`/article/${art.slug}`} className="block text-xs font-bold text-slate-650 dark:text-slate-300 hover:text-martech-accent transition-colors leading-snug">
                        {art.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 shadow-sm">
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4">Popular Reads</h4>
              <div className="space-y-4">
                {popular.map(art => (
                  <div key={art.slug} className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-martech-cyan">{art.category}</span>
                    <Link to={`/article/${art.slug}`} className="block text-xs font-bold text-slate-650 dark:text-slate-300 hover:text-martech-accent transition-colors leading-snug">
                      {art.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
