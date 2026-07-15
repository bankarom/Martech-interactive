import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CaseStudyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cs, setCs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return !!localStorage.getItem('user_gmail_authenticated');
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await CMSService.getCaseStudyById(id);
      setCs(data);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required.');
      return;
    }
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError('Please use a valid @gmail.com account to authenticate.');
      return;
    }
    setError('');
    
    // Submit lead email to WordPress API integration
    await CMSService.submitLeadEmail(email);

    setIsUnlocked(true);
    localStorage.setItem('user_gmail_authenticated', email);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-slate-400">
        Loading case study details...
      </div>
    );
  }

  if (!cs) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-martech-primary mb-4">Case Study Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-martech-accent hover:underline bg-transparent border-0 cursor-pointer">Go Back</button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <SEOHelper title={`${cs.company} Success Story`} description={cs.excerpt} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-martech-primary mb-8 transition-colors bg-transparent border-0 cursor-pointer p-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Case Studies</span>
        </button>

        {/* Hero Section */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-martech-border group">
          <img 
            src={cs.featuredImage} 
            alt={cs.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020306] via-[#020306]/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="rounded-full bg-martech-cyan/20 backdrop-blur-md px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-martech-cyan border border-martech-cyan/30">
              {cs.industry}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-3 font-display leading-tight">{cs.title}</h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 font-medium">Published on {cs.date} &bull; {cs.company}</p>
          </div>
        </div>

        {/* Results Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {cs.results.map((res, index) => (
            <div key={index} className="flex items-center space-x-3 p-5 rounded-2xl border border-martech-border bg-gradient-to-r from-martech-navy to-martech-card">
              <CheckCircle2 className="h-6 w-6 text-martech-cyan shrink-0" />
              <span className="text-sm font-extrabold text-slate-800">{res.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3 font-display">The Challenge</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Before partnering with Improx Technologies, {cs.company} struggled with severe attribution errors and lead flow leakages. Their sales pipelines were plagued by duplicate contacts, and standardizing operational stages across marketing automation models remained extremely manual. This fragmentation reduced pipeline velocity and bloated software license costs.
            </p>
          </div>

          <div className="border-l-4 border-martech-primary pl-6 py-2 italic text-slate-400 text-sm sm:text-base">
            "The inability to map multi-touch programmatic display interactions to validated pipeline SQL entries cost us valuable quarterly acceleration windows."
          </div>

          {/* Gated Content Wrapper */}
          <div className="relative">
            <div className={`space-y-10 transition-all duration-700 ${!isUnlocked ? 'blur-[8px] select-none pointer-events-none opacity-30 max-h-[450px] overflow-hidden' : ''}`}>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">The Solution: First-Party Identity Resolution & Multi-Touch Pipeline</h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Improx deployed a custom, compliance-first Customer Data Platform (CDP) node mapping to {cs.company}'s active tech stack. By shifting database ingestion paths from client-side cookies to secure server-side tracking pipelines, we eliminated client-side script blockers and data drop-offs entirely.
                  </p>
                  <p>
                    Our engineering team integrated server-side identity resolution hooks. Contact profiles are now checked in real-time across four key operational layers:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-400">
                    <li><strong>First-Party Cookie Sync:</strong> Session IDs are matched directly with CRM record profiles using secure reverse-proxy rules.</li>
                    <li><strong>IP Group Mapping:</strong> Programmatic display targets are attributed to active corporate domain lists, enabling early account detection.</li>
                    <li><strong>Real-Time API Filters:</strong> Leads are run through verification rules to eliminate invalid formats and duplicate schemas prior to CRM injection.</li>
                    <li><strong>Lifecycle Stage Triggers:</strong> Sync maps coordinate updates between HubSpot and Salesforce databases every 60 seconds.</li>
                  </ul>
                  <p>
                    By moving event structures to the Edge network, any visitor interaction is parsed instantly. This allows marketing operations to run data hygiene algorithms before syncing records down to target execution services. The system handles over 10,000 requests per minute with negligible latency overhead.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">Phase 2: Migration Roadmap & Continuous Compliance Alignment</h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    The secondary focus prioritized cleaning historic database records. We set up an automated de-duplication script that parsed existing contact entries using fuzzy-matching logic on domain names, corporate registration numbers, and phone extensions.
                  </p>
                  <p>
                    This validation phase eliminated over 14,000 obsolete and stale contacts, immediately reducing CRM subscription tiers and monthly operational maintenance bills. Compliance parameters were also updated to support regional opt-in regulations (including GDPR, CCPA, and COPPA) dynamically based on visitor IP geolocations.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">Technical Pipeline Architecture & Event Ingestion</h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  The diagram below outlines the event tracking sequence from initial anonymous page views to sales-qualified lifecycle stages:
                </p>
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-martech-border font-mono text-xs text-martech-cyan overflow-x-auto space-y-1">
                  <div>[Anonymous Buyer View] &rarr; (Server-Side Proxy Node) &rarr; [First-Party Profile Resolution]</div>
                  <div className="pl-8 text-slate-500">|&mdash; Matches Active Target Account List IP</div>
                  <div>[Intent Signal Detected] &rarr; (CDP Real-Time Pipeline) &rarr; [Prioritized Outreach Alert]</div>
                  <div className="pl-8 text-slate-500">|&mdash; Triggers Automated HubSpot Campaign Enrolment</div>
                  <div>[Lead Profile Verified] &rarr; (Opt-In Compliant Gate) &rarr; [Salesforce Contact Created]</div>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">The Impact & ROI Performance Metrics</h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Post-implementation, {cs.company} eliminated overlapping software redundancies. By deprecating three auxiliary tracking pixels and email verification plugins, they realized immediate software licensing savings.
                  </p>
                  <p>
                    More importantly, database synchronization latency dropped from 24 hours to less than one minute. Sales development representatives now receive intent alerts while target accounts are actively researching solutions, drastically boosting first-touch conversion benchmarks.
                  </p>
                  <p>
                    Additionally, conversion rates across targeted marketing campaigns improved by 22% within the first ninety days, due to higher-quality contact lists and faster response times from SDR teams.
                  </p>
                </div>
              </div>

              {/* Metrics Table */}
              <div className="overflow-hidden rounded-2xl border border-martech-border bg-martech-navy">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-martech-border bg-slate-950/50">
                      <th className="p-4 text-xs font-bold text-white uppercase tracking-wider">Performance Metric</th>
                      <th className="p-4 text-xs font-bold text-slate-900 uppercase tracking-wider text-right">Baseline State</th>
                      <th className="p-4 text-xs font-bold text-martech-cyan uppercase tracking-wider text-right">Optimized State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-martech-border/50 text-xs text-slate-600">
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Database Sync Latency</td>
                      <td className="p-4 text-right">24.5 Hours</td>
                      <td className="p-4 text-right text-martech-cyan font-bold">58 Seconds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Duplicate Record Rate</td>
                      <td className="p-4 text-right">14.2%</td>
                      <td className="p-4 text-right text-martech-cyan font-bold">1.8%</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">SDR Intent Alert Time</td>
                      <td className="p-4 text-right">Weekly Batch</td>
                      <td className="p-4 text-right text-martech-cyan font-bold">Real-Time</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Tool License Overhead</td>
                      <td className="p-4 text-right">$12,400/yr</td>
                      <td className="p-4 text-right text-martech-cyan font-bold">$3,800/yr</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom CTA Block */}
              <div className="mt-16 rounded-3xl border border-martech-border bg-martech-card p-8 text-center max-w-2xl mx-auto shadow-xl">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 font-display">Design Your Automation Blueprint</h3>
                <p className="text-xs text-slate-600 mb-6 font-medium">
                  Schedule a stack migration audit with our operational solutions engineers.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary px-6 py-3 text-sm font-bold text-white hover:from-martech-primary hover:to-martech-accent transition-all duration-300 shadow-md shadow-martech-primary/10"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Inline Gmail Sign In Gate */}
            {!isUnlocked && (
              <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-white via-white/95 to-white/40">
                <div className="w-full max-w-md rounded-3xl border border-martech-border bg-gradient-to-b from-martech-card to-martech-navy p-8 text-center shadow-2xl space-y-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-martech-cyan/10 flex items-center justify-center text-martech-cyan animate-pulse">
                    <Lock className="h-5 w-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-900 font-display">Unlock Full Success Story</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      To unlock and continue reading the integration solutions, pipeline architecture diagrams, and ROI metrics, please authenticate with your Gmail account.
                    </p>
                  </div>

                  <form onSubmit={handleUnlock} className="space-y-3">
                    <div className="relative">
                      <input 
                        type="email"
                        required
                        placeholder="name@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 pl-11 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-martech-cyan focus:ring-1 focus:ring-martech-cyan"
                      />
                      <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                    </div>
                    {error && <p className="text-[11px] text-red-400 font-bold text-left">{error}</p>}
                    
                    <button 
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary py-3 text-xs font-black tracking-wider uppercase text-white hover:from-martech-primary hover:to-martech-accent transition duration-300 cursor-pointer"
                    >
                      Continue with Google
                    </button>
                  </form>

                  <div className="pt-2 flex items-center justify-center space-x-1.5 text-[9px] text-slate-600">
                    <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                    <span>Secure Google login. Access will activate instantly.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
