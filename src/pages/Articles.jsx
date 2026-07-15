import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CMSService, CATEGORY_TREE } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { Clock, Calendar, Star, ChevronRight, Newspaper, Search, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Articles() {
  const { category, subcategory } = useParams();
  const [articles, setArticles] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function load() {
      const targetSlug = subcategory || category || null;
      const filtered = await CMSService.getArticles(targetSlug);
      const trendList = await CMSService.getTrendingArticles();
      const popList = await CMSService.getPopularArticles();

      setArticles(filtered);
      setTrending(trendList);
      setPopular(popList);
      setCurrentPage(1); // Reset page on category changes
    }
    load();
  }, [category, subcategory]);

  // Find related categories in the same sitemap branch
  const parentNode = CATEGORY_TREE.find(c => c.slug === 'insights');
  const activeSubcategoryNode = parentNode?.subcategories.find(s => s.slug === category);
  
  const relatedCategories = activeSubcategoryNode 
    ? activeSubcategoryNode.children || [] 
    : parentNode?.subcategories || [];

  const displayName = subcategory 
    ? subcategory.replace(/-/g, ' ') 
    : category 
      ? category.replace(/-/g, ' ') 
      : 'All Insights';

  // Filter list based on sidebar search input
  const searchedArticles = articles.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Math
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(searchedArticles.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedArticles.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <SEOHelper 
        title={`${displayName.toUpperCase()} - Martech Insights`} 
        description={`Browse professional insights, tactics, and case studies about ${displayName} curated by our operations architects.`}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Layout: Sidebar LEFT (col-span-1), Main Feed RIGHT (col-span-2) to match Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT COLUMN: Sidebar (Search + Recent Posts + Related Segments) */}
          <aside className="space-y-8 lg:col-span-1">
            
            {/* 1. Search Bar */}
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 space-y-4 shadow-sm">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-800 dark:text-white">Search Segment</h3>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Enter keywords..."
                  className="w-full rounded-xl bg-slate-100 dark:bg-slate-900 border border-martech-border text-xs px-4 py-3 pl-10 text-slate-900 dark:text-white placeholder-slate-550 focus:outline-none focus:border-martech-primary focus:ring-1 focus:ring-martech-primary"
                />
                <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
              </div>
            </div>

            {/* 2. Recent Posts */}
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 space-y-4 shadow-sm">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-800 dark:text-white flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-martech-primary" />
                <span>Recent Posts</span>
              </h3>
              <div className="space-y-4">
                {trending.slice(0, 5).map((art) => (
                  <div key={art.slug} className="flex space-x-3.5 items-start border-b border-martech-border/40 pb-3 last:border-b-0 last:pb-0">
                    <img 
                      src={art.featuredImage} 
                      alt={art.title} 
                      className="w-12 h-12 object-cover rounded-lg border border-martech-border flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[8px] uppercase font-bold text-martech-primary tracking-wider">
                        {art.category}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug hover:text-martech-primary transition-colors line-clamp-2 mt-0.5">
                        <Link to={`/article/${art.slug}`}>{art.title}</Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Related Segments */}
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-martech-border">
                Related Segments
              </h3>
              <div className="flex flex-col space-y-2">
                {relatedCategories.map((rel, idx) => {
                  const targetLink = activeSubcategoryNode 
                    ? `/insights/${category}/${rel.slug}` 
                    : `/insights/${rel.slug}`;
                  return (
                    <Link 
                      key={idx}
                      to={targetLink}
                      className="flex items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-650 dark:text-slate-300 hover:text-martech-primary transition duration-200"
                    >
                      <span>{rel.name}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-martech-primary" />
                    </Link>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* RIGHT COLUMN: Main Feed containing large horizontal cards exactly like Image 3 */}
          <main className="lg:col-span-2 space-y-8">
            
            {/* Header category name display matching Image 3 */}
            <div className="border-b border-martech-border pb-6 mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white capitalize tracking-tight font-display">
                {displayName}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Discover the latest long-form analyses, operational guidelines, and integration insights mapping to B2B {displayName}.
              </p>
            </div>

            {/* Horizontal Cards List */}
            {currentItems.length > 0 ? (
              <div className="space-y-6">
                {currentItems.map((art) => (
                  <article 
                    key={art.slug} 
                    className="group flex flex-col md:flex-row rounded-3xl border border-martech-border bg-martech-navy overflow-hidden hover:shadow-xl hover:border-martech-primary/40 transition-all duration-350 shadow-sm"
                  >
                    {/* Cover image left side */}
                    <div className="w-full md:w-[280px] aspect-[4/3] md:aspect-auto overflow-hidden bg-slate-900 flex-shrink-0 relative">
                      <img 
                        src={art.featuredImage} 
                        alt={art.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Content details right side */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-martech-primary tracking-widest block mb-2">
                          {displayName}
                        </span>
                        
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug hover:text-martech-primary transition-colors mb-2.5">
                          <Link to={`/article/${art.slug}`}>{art.title}</Link>
                        </h2>

                        <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed mb-4 line-clamp-3">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="border-t border-martech-border/50 pt-3.5 flex items-center space-x-3 text-[9px] text-slate-650 dark:text-slate-400 uppercase font-bold tracking-wider mt-auto">
                        <img 
                          src={art.author.avatar} 
                          alt={art.author.name}
                          className="h-6 w-6 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                        />
                        <span>BY {art.author.name}</span>
                        <span>•</span>
                        <span>{art.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-3xl border border-martech-border bg-martech-navy shadow-sm">
                <p className="text-sm text-slate-500 dark:text-slate-400">No B2B articles published in this segment yet.</p>
              </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-martech-border pt-6 mt-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="rounded-xl border border-martech-border px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                >
                  &larr; Previous Page
                </button>
                <span className="text-xs text-slate-550 dark:text-slate-400 font-bold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="rounded-xl border border-martech-border px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                >
                  Next Page &rarr;
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </motion.div>
  );
}
