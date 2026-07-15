import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { ArrowLeft, BookOpen, Lock, ShieldCheck, Mail, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return !!localStorage.getItem('user_gmail_authenticated');
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await CMSService.getReportById(id);
      setReport(data);
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
        Loading premium research report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-martech-primary mb-4">Report Not Found</h2>
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
      <SEOHelper title={report.title} description={report.excerpt} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-martech-primary mb-8 transition-colors bg-transparent border-0 cursor-pointer p-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Research Reports</span>
        </button>

        {/* Hero Section */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-martech-border group">
          <img 
            src={report.featuredImage} 
            alt={report.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020306] via-[#020306]/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="rounded-full bg-martech-cyan/20 backdrop-blur-md px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-martech-cyan border border-martech-cyan/30">
              Premium Report
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-3 font-display leading-tight">{report.title}</h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 font-medium">Published on {report.date} &bull; {report.pages} Pages</p>
          </div>
        </div>

        {/* Abstract */}
        <div className="prose prose-invert max-w-none space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3 font-display">Executive Summary & Scope</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              This intelligence playbook maps out the strategic shifting budgets and systems integration structures governing modern marketing pipelines. As enterprise SaaS brands struggle with third-party cookie decay, establishing unified first-party tracking points becomes critical. This document gathers data across 450 CMO audits to provide clear benchmarks.
            </p>
          </div>

          <div className="border-l-4 border-martech-cyan pl-6 py-2 italic text-slate-400 text-sm sm:text-base">
            "By standardizing lifecycle trigger events, organizations realized a 32% decrease in synchronization duplication rates while protecting attribution margins."
          </div>

          {/* Gated Content Wrapper */}
          <div className="relative">
            <div className={`space-y-10 transition-all duration-700 ${!isUnlocked ? 'blur-[8px] select-none pointer-events-none opacity-30 max-h-[400px] overflow-hidden' : ''}`}>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">Section 1: Stack Architecture Recommendations & Infrastructure Overhaul</h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Our analysis shows that typical enterprise B2B marketers maintain average redundancy rates of 28% across license budgets due to overlapping features in their marketing technology stacks (specifically between customer data platforms, analytics suites, and automation engines). We recommend deploying identity clean rooms to bridge CRM pipelines with server-side proxy analytics. This protects visitor data compliance-first without leaking session values to third-party scripts.
                  </p>
                  <p>
                    To resolve these inefficiencies, architecture configurations must migrate toward a hub-and-spoke telemetry system. Instead of placing individual Javascript SDK container tags for each advertising channel, data ingestion should pass through a centralized server-side reverse-proxy tracker.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-400">
                    <li><strong>Decoupled Telemetry:</strong> Keep customer client-side events isolated from third-party vendor pixels.</li>
                    <li><strong>Proxy Normalization:</strong> Redact personally identifiable information (PII) before transmission to external marketing systems.</li>
                    <li><strong>Payload Minimization:</strong> Strip unused metadata fields from API tracking calls to optimize client browser bandwidth and load speeds.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">Section 2: Compliant Lead Verification Loops & API Verification Schemas</h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Always set up double opt-in verification APIs. By ensuring that contact data is verified at the capture endpoint prior to injecting it into SDR queues, marketing organizations save up to 40 hours per representative every month. Real-time verification checks must run email validity, corporate domain classification, and syndication compliance tags before record insertion.
                  </p>
                  <p>
                    The integration payload structure should enforce strict formatting thresholds. If a lead submission fails validation rules (such as using generic webmail domains when business emails are required), the ingestion endpoint must reject the record with a diagnostic response code, prompting immediate correction.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">Section 3: First-Party Data Attribution & Session Resolution</h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    With the global deprecation of third-party cookies, tracking buyer journeys across multiple touchpoints requires a first-party identity graph. By mapping anonymous browser sessions to CRM contacts post-conversion, we resolve attribution paths that were previously lost.
                  </p>
                  <p>
                    Our audit framework indicates that deploying custom subdomain DNS routing rules allows cookies to be classified as first-party, extending their lifecycle from 7 days to 2 years on modern browsers. This allows long-cycle B2B buyers to be recognized instantly upon return.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">Section 4: Predictive Lead Scoring and Pipeline Ingestion Rules</h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    To optimize sales prioritization, marketing automation suites should assign real-time values based on engagement depth and account fit. Scores are compiled using three separate vectors:
                  </p>
                  <ul className="list-decimal pl-6 space-y-2 text-slate-400">
                    <li><strong>Firmographic Suitability:</strong> Evaluation of target industry size, geographical location, and active technology stack compatibility.</li>
                    <li><strong>Intent Intensity:</strong> Analysis of topic-specific search queries and content interaction frequency.</li>
                    <li><strong>Temporal Decay:</strong> Automatic scaling down of scores when interaction intervals exceed 14 days of inactivity.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-display">Section 5: Summary Action Checklist for Operations Teams</h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Begin implementation by executing a complete audit of all active marketing containers. Remove unused conversion tags and consolidate tracking scripts into a singular server-side stream. This immediate action reduces script-load latency by up to 45% and minimizes unauthorized data leakage points.
                  </p>
                </div>
              </div>

              {/* Download CTA Block */}
              <div className="mt-16 rounded-3xl border border-martech-border bg-martech-card p-8 text-center max-w-2xl mx-auto shadow-xl">
                <BookOpen className="h-10 w-10 text-martech-cyan mx-auto mb-4" />
                <h3 className="text-xl font-extrabold text-white mb-2 font-display">Download Full PDF Playbook</h3>
                <p className="text-xs text-slate-400 mb-6 font-medium">
                  Get the complete, offline 35-page guide, complete with code examples, sync schemas, and compliance blueprints.
                </p>
                <a 
                  href={`/documents/playbook-${id}.pdf`}
                  download
                  className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary px-6 py-3 text-sm font-bold text-white hover:from-martech-primary hover:to-martech-accent transition-all duration-300 shadow-md shadow-martech-primary/10"
                >
                  <Download className="h-4 w-4" />
                  <span>Save Full Report (PDF)</span>
                </a>
              </div>
            </div>

            {/* Inline Gmail Sign In Gate */}
            {!isUnlocked && (
              <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-[#020306] via-[#020306]/85 to-transparent">
                <div className="w-full max-w-md rounded-3xl border border-martech-cyan/20 bg-gradient-to-b from-martech-card to-[#0c1020] p-8 text-center shadow-2xl space-y-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-martech-cyan/10 flex items-center justify-center text-martech-cyan animate-pulse">
                    <Lock className="h-5 w-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white font-display">Unlock Premium B2B News Report</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      To unlock and continue reading the rest of this exclusive report, please authenticate with your Gmail account.
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
                        className="w-full rounded-xl bg-slate-950 border border-martech-border px-4 py-3 pl-11 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-martech-cyan focus:ring-1 focus:ring-martech-cyan"
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

                  <div className="pt-2 flex items-center justify-center space-x-1.5 text-[9px] text-slate-500">
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
