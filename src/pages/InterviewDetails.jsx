import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await CMSService.getInterviewById(id);
      setInterview(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-slate-400">
        Loading executive interview transcript...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-martech-primary mb-4">Interview Not Found</h2>
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
      <SEOHelper title={`Interview with ${interview.guestName}`} description={interview.excerpt} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center space-x-2 text-sm text-slate-500 hover:text-martech-primary mb-8 bg-transparent border-0 cursor-pointer p-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Spotlights</span>
        </button>

        {/* Guest Profile Big Banner */}
        <div className="rounded-3xl border border-martech-border bg-gradient-to-br from-martech-navy to-martech-card p-8 sm:p-12 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 items-center mb-16 shadow-xl">
          <img 
            src={interview.guestAvatar} 
            alt={interview.guestName}
            className="h-28 w-28 rounded-3xl object-cover border border-martech-border"
          />
          <div>
            <span className="text-[10px] font-extrabold text-martech-cyan uppercase tracking-widest">Spotlight Transcript</span>
            <h1 className="text-3xl font-black text-slate-900 mt-1 mb-2 font-display">{interview.guestName}</h1>
            <p className="text-base text-slate-700 font-semibold">{interview.guestRole} at <span className="text-martech-primary">{interview.guestCompany}</span></p>
            <p className="text-xs text-slate-600 mt-2">Published on {interview.date} • {interview.readTime}</p>
          </div>
        </div>

        {/* Takeaways and overview */}
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] mb-16">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-display">Executive context</h3>
            <p className="text-slate-650 text-sm leading-relaxed">{interview.excerpt}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-martech-border bg-martech-navy p-5 text-sm text-slate-700 font-semibold">Interviewer: {interview.interviewer || 'Improx Editorial'}</div>
              <div className="rounded-3xl border border-martech-border bg-martech-navy p-5 text-sm text-slate-700 font-semibold">Category: {interview.category || 'MarTech Operations'}</div>
              <div className="rounded-3xl border border-martech-border bg-martech-navy p-5 text-sm text-slate-700 font-semibold">Key transcript sections: {interview.qas?.length || 0} questions</div>
              <div className="rounded-3xl border border-martech-border bg-martech-navy p-5 text-sm text-slate-700 font-semibold">Use case: executive alignment, measurement, and stack governance</div>
            </div>
          </div>
          <aside className="rounded-3xl border border-martech-border bg-martech-navy p-8 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Key takeaways</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-3"><span className="mt-0.5 text-martech-primary font-black">•</span> Practical steps for balancing attribution, privacy, and velocity.</li>
              <li className="flex gap-3"><span className="mt-0.5 text-martech-primary font-black">•</span> How to connect demand ops to board-level performance narratives.</li>
              <li className="flex gap-3"><span className="mt-0.5 text-martech-primary font-black">•</span> Immediate signals for improving campaign governance and team handoffs.</li>
            </ul>
          </aside>
        </div>

        {/* Q&As */}
        <div className="space-y-12">
          {interview.qas.map((qa, index) => (
            <div key={index} className="space-y-4">
              
              {/* Question */}
              <div className="rounded-3xl border border-martech-border bg-martech-card p-6 shadow-lg shadow-martech-primary/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-martech-cyan block mb-1">Question {index + 1}</span>
                <p className="text-base font-extrabold text-white leading-relaxed">
                  "{qa.q}"
                </p>
              </div>

              {/* Answer */}
              <div className="rounded-3xl border border-martech-border bg-martech-navy p-6 shadow-inner shadow-slate-950/20">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-3">{interview.guestName}</span>
                <p className="text-slate-300 text-base leading-relaxed">
                  {qa.a}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-20 rounded-3xl border border-martech-border bg-martech-card p-8 text-center max-w-2xl mx-auto shadow-xl">
          <h3 className="text-xl font-extrabold text-white mb-2 font-display">Join the CMO Network</h3>
          <p className="text-xs text-slate-400 mb-6">
            Get access to private Slack channels and attend invitation-only roundtables.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary px-6 py-3 text-sm font-bold text-white hover:from-martech-primary hover:to-martech-accent transition-all duration-300 shadow-md shadow-martech-primary/10"
          >
            Apply for Membership
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
