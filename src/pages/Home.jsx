import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CMSService } from '../services/cms';
import LeadCalculator from '../components/LeadCalculator';
import HeroSlider from '../components/HeroSlider';
import SEOHelper from '../components/SEOHelper';
import { 
  Newspaper, 
  Search, 
  TrendingUp,
  Mic,
  FileText
} from 'lucide-react';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [interviewStartIndex, setInterviewStartIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const arts = await CMSService.getArticles();
      const ints = await CMSService.getInterviews();
      const cases = await CMSService.getCaseStudies();
      const reps = await CMSService.getReports();

      setArticles(arts);
      setInterviews(ints);
      setCaseStudies(cases);
      setReports(reps);
    }
    load();
  }, []);

  // Automatic slideshow transition for homepage interviews carousel
  useEffect(() => {
    if (interviews.length <= 4) return;
    const interval = setInterval(() => {
      setInterviewStartIndex((prev) => (prev + 1) % (interviews.length - 3));
    }, 6000);
    return () => clearInterval(interval);
  }, [interviews]);

  // Filter latest articles by search query
  const filteredLatest = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEOHelper 
        title="Professional B2B Martech Publication Platform" 
        description="Daily insights, executive spotlights, CMO interviews, stack audits, and compliant lead generation services."
      />

      {/* Hero Slider */}
      {articles.length > 0 && <HeroSlider articles={articles.slice(0, 5)} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* Two-Column Midsection: Content List + Dense Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-martech-border pt-12">
          
          {/* LEFT COLUMN: Latest B2B Analysis List Feed */}
          <section id="latest-articles" className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-martech-border pb-4">
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center space-x-2.5">
                <Newspaper className="h-6 w-6 text-martech-primary" />
                <span>Latest B2B Analysis</span>
              </h2>
              <Link to="/insights" className="text-xs font-bold text-martech-primary hover:underline">
                All Articles &rarr;
              </Link>
            </div>

            {filteredLatest.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left column: Exclusive News Reports */}
                <div className="md:col-span-1 space-y-6">
                  {reports.slice(0, 3).map((rep) => (
                    <div key={rep.id} className="group relative overflow-hidden rounded-3xl border border-martech-border bg-martech-navy p-5 shadow-lg transition-all duration-300 hover:border-martech-primary/30 flex flex-col justify-between h-[360px]">
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 mb-4">
                          <img 
                            src={rep.featuredImage} 
                            alt={rep.title} 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                            <span className="text-[10px] font-bold text-martech-cyan uppercase tracking-widest">Exclusive News Report</span>
                          </div>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug hover:text-martech-cyan transition-colors duration-200 line-clamp-2">
                          <Link to={`/reports/${rep.id}`}>{rep.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                          {rep.excerpt}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-martech-border/50 flex justify-between items-center mt-3">
                        <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">{rep.pages} Pages</span>
                        <Link 
                          to={`/reports/${rep.id}`} 
                          className="text-[10px] font-bold text-martech-cyan hover:underline uppercase tracking-wider"
                        >
                          Read Report &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right column: Dense listing of articles with thumbnails */}
                <div className="md:col-span-2 space-y-4">
                  {filteredLatest.slice(0, 8).map(art => (
                    <article key={art.slug} className="group flex space-x-4 p-4 rounded-3xl border border-martech-border bg-martech-navy transition-all duration-300 hover:border-martech-primary/20 hover:shadow-md h-[120px]">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-2xl bg-slate-900 flex-shrink-0 relative">
                        <img 
                          src={art.featuredImage} 
                          alt={art.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-martech-cyan tracking-wider">
                            {art.category}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-slate-850 dark:text-slate-100 leading-snug hover:text-martech-cyan transition-colors line-clamp-2 mt-1">
                            <Link to={`/article/${art.slug}`}>{art.title}</Link>
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wide font-medium">
                          <span>BY {art.author.name}</span>
                          <span>•</span>
                          <span>{art.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl border border-martech-border bg-martech-card">
                <p className="text-sm text-slate-500 dark:text-slate-400">No B2B analysis found matching your search.</p>
              </div>
            )}
          </section>

          {/* RIGHT COLUMN: Sidebar */}
          <aside className="space-y-8 lg:col-span-1 lg:sticky lg:top-24 self-start">
            
            {/* Search Widget */}
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 space-y-4 shadow-sm">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-800 dark:text-white">Search Insights</h3>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter keywords..."
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-martech-border text-xs px-4 py-3 pl-10 text-slate-900 dark:text-white placeholder-slate-550 focus:outline-none focus:border-martech-primary focus:ring-1 focus:ring-martech-primary"
                />
                <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-450" />
              </div>
            </div>

            {/* Follow Us Widget */}
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 space-y-4 shadow-sm">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-800 dark:text-white">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="flex-1 flex justify-center py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-martech-border text-slate-500 dark:text-slate-400 hover:text-[#0a66c2] hover:border-slate-350 transition">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="flex-1 flex justify-center py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-martech-border text-slate-500 dark:text-slate-400 hover:text-[#1d9bf0] hover:border-slate-350 transition">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="flex-1 flex justify-center py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-martech-border text-slate-500 dark:text-slate-400 hover:text-[#1877f2] hover:border-slate-350 transition">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" className="flex-1 flex justify-center py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-martech-border text-slate-500 dark:text-slate-400 hover:text-[#ff0000] hover:border-slate-350 transition">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-.98-1.071-1.758-2.083-2.023-1.837-.488-9.17-.488-9.17-.488s-7.333 0-9.17.488c-1.012.265-1.811 1.043-2.083 2.023-.496 1.785-.496 5.518-.496 5.518s0 3.733.496 5.518c.272.98 1.071 1.758 2.083 2.023 1.837.488 9.17.488 9.17.488s7.333 0 9.17-.488c1.012-.265 1.811-1.043 2.083-2.023.496-1.785.496-5.518.496-5.518s0-3.733-.496-5.518zM9.545 15.568V7.818l6.75 3.875-6.75 3.875z"/></svg>
                </a>
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 space-y-4 shadow-sm">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-800 dark:text-white flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-martech-primary" />
                <span>Recent Posts</span>
              </h3>
              <div className="space-y-4">
                {articles.slice(8, 14).map((art) => (
                  <div key={art.slug} className="flex space-x-4 items-start border-b border-martech-border/30 pb-3 last:border-b-0 last:pb-0 group">
                    <img 
                      src={art.featuredImage} 
                      alt={art.title} 
                      className="w-16 h-12 object-cover rounded-xl border border-martech-border flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold text-martech-cyan tracking-wider block">
                        {art.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug hover:text-martech-primary transition-colors duration-200 line-clamp-2 mt-0.5">
                        <Link to={`/article/${art.slug}`}>{art.title}</Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming B2B Webinars Widget */}
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-5 space-y-4 shadow-sm">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-800 dark:text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Upcoming Webinars</span>
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-martech-border/60">
                  <span className="text-[8px] font-bold text-red-500 dark:text-red-400 uppercase tracking-wider block">LIVE • JUNE 28, 2026</span>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1 leading-snug">
                    Cookie-less Personalization: Unifying First-Party Identity Profiles
                  </h4>
                  <a href="#" className="inline-block text-[10px] font-extrabold text-martech-primary hover:underline mt-2">Register Free &rarr;</a>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-martech-border/60">
                  <span className="text-[8px] font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">ON DEMAND • JULY 02</span>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1 leading-snug">
                    Marketing Budget Governance: Trimming Stack Redundancy
                  </h4>
                  <a href="#" className="inline-block text-[10px] font-extrabold text-martech-primary hover:underline mt-2">Watch Now &rarr;</a>
                </div>
              </div>
            </div>

          </aside>
        </div>

        {/* SECTION: Symmetrical Insights Columns (Expert Insights vs. Improx Internal Intel) */}
        <section id="editorial-columns" className="border-t border-martech-border pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Column: Expert Insights Network */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-martech-border pb-3">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-martech-primary inline-block"></span>
                  <span>Expert Insights Network</span>
                </h3>
                <Link to="/insights" className="text-xs font-semibold text-martech-primary hover:underline">View all &rarr;</Link>
              </div>
              <div className="space-y-4">
                {articles.slice(12, 16).map(art => (
                  <div key={art.slug} className="group flex space-x-3.5 items-start p-3 bg-martech-navy rounded-2xl border border-martech-border/50 min-h-[115px] pb-4">
                    <img 
                      src={art.featuredImage} 
                      alt={art.title} 
                      className="w-16 h-16 object-cover rounded-lg border border-martech-border flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1 flex flex-col justify-between self-stretch">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-martech-cyan tracking-wider">{art.category}</span>
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug hover:text-martech-primary transition-colors line-clamp-2 mt-0.5">
                          <Link to={`/article/${art.slug}`}>{art.title}</Link>
                        </h4>
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2">BY {art.author.name} • {art.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Improx Internal Intel */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-martech-border pb-3">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-martech-cyan inline-block"></span>
                  <span>Improx Internal Intel</span>
                </h3>
                <Link to="/insights" className="text-xs font-semibold text-martech-primary hover:underline">View all &rarr;</Link>
              </div>
              <div className="space-y-4">
                {articles.slice(16, 20).map(art => (
                  <div key={art.slug} className="group flex space-x-3.5 items-start p-3 bg-martech-navy rounded-2xl border border-martech-border/50 min-h-[115px] pb-4">
                    <img 
                      src={art.featuredImage} 
                      alt={art.title} 
                      className="w-16 h-16 object-cover rounded-lg border border-martech-border flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1 flex flex-col justify-between self-stretch">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-martech-primary tracking-wider">{art.category}</span>
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug hover:text-martech-primary transition-colors line-clamp-2 mt-0.5">
                          <Link to={`/article/${art.slug}`}>{art.title}</Link>
                        </h4>
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2">BY {art.author.name} • {art.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: Executive Conversation + Case Study Showcase */}
        {interviews.length > 0 && caseStudies.length > 0 && (
          <section id="home-interviews" className="border-t border-martech-border pt-12">
            <div className="flex flex-col gap-4 border-b border-martech-border pb-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-martech-accent">Editorial Spotlight</span>
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1 font-display">Interviews & Case Studies</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                  Surfacing executive decision-making insights and proven operational B2B SaaS outcomes side by side.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/interviews" className="rounded-full border border-martech-border bg-slate-50 dark:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-martech-primary hover:text-martech-primary transition">
                  Interview Hub
                </Link>
                <Link to="/case-studies" className="rounded-full bg-martech-primary px-4 py-2 text-xs font-semibold text-white hover:bg-martech-primary/90 transition">
                  Case Study Vault
                </Link>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-martech-border bg-martech-navy shadow-lg transition duration-300 hover:border-martech-primary/10">
              <div className="grid gap-8 p-6 lg:grid-cols-[1fr_1.2fr] items-stretch">
                
                {/* Left Side: Editorial Banner */}
                <div className="flex flex-col justify-between bg-gradient-to-br from-martech-card to-martech-navy p-6 rounded-3xl border border-martech-border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-60 h-60 bg-martech-primary/5 rounded-full blur-3xl -z-10" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-martech-cyan">Featured Blend</span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-4 leading-tight">Premium B2B Stories & Proof</h3>
                    <p className="text-xs text-slate-600 mt-4 leading-relaxed max-w-sm">
                      Inspect executive perspectives and audit real-world campaign metrics. Click any card on the right to navigate directly to detailed write-ups.
                    </p>
                  </div>
                  <div className="pt-6">
                    <span className="text-[10px] bg-martech-primary/10 border border-martech-primary/25 text-martech-primary px-3 py-1 rounded-full font-mono">Real-time Updated</span>
                  </div>
                </div>

                {/* Right Side: Interactive Link Cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                  
                  {/* Executive Interviews Column */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-martech-primary flex items-center gap-1.5 border-b border-slate-200 pb-2">
                      <Mic className="h-3.5 w-3.5" />
                      Executive Spotlight Q&As
                    </h4>
                    <div className="space-y-3">
                      {interviews.slice(interviewStartIndex, interviewStartIndex + 3).map((int) => (
                        <Link 
                          key={int.id} 
                          to={`/interviews/${int.id}`}
                          className="block p-4 rounded-2xl border border-slate-200/60 bg-slate-100/50 hover:bg-white hover:border-martech-primary/30 transition-all duration-300 group"
                        >
                          <h5 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-martech-primary transition">
                            {int.title}
                          </h5>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                            <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">{int.guestName}</span>
                            <span className="text-[9px] text-martech-cyan font-bold hover:underline">Read Info &rarr;</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Case Studies Column */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-martech-accent flex items-center gap-1.5 border-b border-slate-200 pb-2">
                      <FileText className="h-3.5 w-3.5" />
                      Case Study Outcomes
                    </h4>
                    <div className="space-y-3">
                      {caseStudies.slice(0, 3).map((cs) => (
                        <Link 
                          key={cs.id} 
                          to={`/case-studies/${cs.id}`}
                          className="block p-4 rounded-2xl border border-slate-200/60 bg-slate-100/50 hover:bg-white hover:border-martech-accent/30 transition-all duration-300 group"
                        >
                          <h5 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-martech-accent transition">
                            {cs.title}
                          </h5>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                            <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">{cs.industry}</span>
                            <span className="text-[9px] text-martech-accent font-bold hover:underline">View Case &rarr;</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>
        )}

        {/* SECTION 9: Visual Infographics & Stack Maps */}
        <section id="infographics-showcase" className="border-t border-martech-border pt-12 pb-6 animate-fade-in-up">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-martech-primary">Improx Visual Learning</span>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">Improx Infographics & Stack Maps</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High-impact visual flowcharts, market map architectures, and data structures for modern B2B marketers.</p>
            <Link to="/infographics" className="mt-4 inline-flex items-center justify-center rounded-full bg-martech-primary px-5 py-3 text-xs font-bold text-white shadow-md shadow-martech-primary/20 hover:bg-martech-primary/90 transition">
              See the full Infographics Collection
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Infographics Item 1 */}
            <div className="group relative rounded-3xl overflow-hidden border border-martech-border bg-martech-navy shadow-lg transition-all duration-300 hover:border-martech-primary/45 hover:shadow-xl flex flex-col justify-between h-[420px]">
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" 
                  alt="2026 MarTech Stack Blueprint" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute top-4 left-4 text-[9px] uppercase font-black text-white bg-martech-primary px-2.5 py-1 rounded-lg tracking-wider">
                  Stack Map
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-white leading-snug group-hover:text-martech-primary transition-colors font-display">
                    The 2026 Enterprise MarTech Stack Blueprint
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                    A sharp flow diagram mapping CDP ingest channels into real-time activations.
                  </p>
                </div>
                <div className="border-t border-martech-border/50 pt-4 mt-4">
                  <span className="text-[9px] font-bold text-martech-cyan uppercase tracking-wider">High-Res PDF</span>
                </div>
              </div>
            </div>

            {/* Infographics Item 2 */}
            <div className="group relative rounded-3xl overflow-hidden border border-martech-border bg-martech-navy shadow-lg transition-all duration-300 hover:border-martech-primary/45 hover:shadow-xl flex flex-col justify-between h-[420px]">
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" 
                  alt="B2B Lead Flow Pipeline Chart" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute top-4 left-4 text-[9px] uppercase font-black text-white bg-martech-cyan px-2.5 py-1 rounded-lg tracking-wider">
                  Flow Chart
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-white leading-snug group-hover:text-martech-primary transition-colors font-display">
                    Enterprise Lead Flow & Consent Map
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                    Audited pathways mapping compliance opt-in keys directly from capture to storage.
                  </p>
                </div>
                <div className="border-t border-martech-border/50 pt-4 mt-4">
                  <span className="text-[9px] font-bold text-martech-cyan uppercase tracking-wider">High-Res PDF</span>
                </div>
              </div>
            </div>

            {/* Infographics Item 3 */}
            <div className="group relative rounded-3xl overflow-hidden border border-martech-border bg-martech-navy shadow-lg transition-all duration-300 hover:border-martech-primary/45 hover:shadow-xl flex flex-col justify-between h-[420px]">
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" 
                  alt="Predictive AI Scoring Framework" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute top-4 left-4 text-[9px] uppercase font-black text-white bg-martech-primary px-2.5 py-1 rounded-lg tracking-wider">
                  AI Model
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-white leading-snug group-hover:text-martech-primary transition-colors font-display">
                    Predictive Account Scoring Framework
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                    ML segment thresholds logic checking intent velocity levels to alert sales reps.
                  </p>
                </div>
                <div className="border-t border-martech-border/50 pt-4 mt-4">
                  <span className="text-[9px] font-bold text-martech-cyan uppercase tracking-wider">High-Res PDF</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Newsletter Subscription */}
        <section id="newsletter" className="border-t border-martech-border pt-12">
          <div className="rounded-[2.5rem] border border-martech-border bg-slate-100 dark:bg-[#0b0e17] p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-60 h-60 bg-martech-primary/5 rounded-full blur-3xl -z-10" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white mb-2">Subscribe to MarTech Operations Newsletter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-lg mx-auto leading-relaxed">
              Join 24,000+ CMOs receiving our weekly data attribution checklists and pipeline optimization templates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Work Email" 
                required
                className="flex-1 rounded-xl border border-martech-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:border-martech-primary focus:outline-none transition-colors"
              />
              <button className="rounded-xl bg-gradient-to-r from-martech-primary to-martech-primary/80 px-6 py-3 text-xs font-bold text-white transition hover:opacity-95 cursor-pointer shadow-md shadow-martech-primary/20">
                Subscribe Free
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
