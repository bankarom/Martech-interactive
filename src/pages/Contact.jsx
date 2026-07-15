import React, { useState } from 'react';
import SEOHelper from '../components/SEOHelper';
import { Mail, CheckCircle2, Send, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    solution: 'ABM Orchestration',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEOHelper 
        title="Contact Improx Martech" 
        description="Get in touch for custom sitemap audits, stack integrations, or media kit inquiries."
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-martech-border pb-8 mb-12 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-martech-cyan bg-martech-cyan/10 px-3 py-1 rounded-full border border-martech-cyan/20">Get in Touch</span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent mt-4 mb-4 font-display">Talk to a Martech Specialist</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Have questions about stack integration, licensing fees, or lead generation solutions? Send our operations team a message.
          </p>
        </div>

        {/* Form Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Info Details */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-6 space-y-4 shadow-md">
              <h3 className="text-lg font-bold text-white font-display mb-2">Direct Contacts</h3>
              
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="h-5 w-5 text-martech-cyan" />
                <span className="text-sm">editorial@improxmartech.com</span>
              </div>

              <div className="flex items-center space-x-3 text-slate-300">
                <PhoneCall className="h-5 w-5 text-martech-cyan" />
                <span className="text-sm">solutions@improxmartech.com</span>
              </div>
            </div>

            <div className="rounded-2xl border border-martech-border bg-martech-navy p-6 text-center shadow-md">
              <h4 className="text-sm font-bold text-white font-display mb-2">Ad Sponsors & Media Kits</h4>
              <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">
                Want to run programmatic display campaigns or syndicate whitepapers to our CMO database?
              </p>
              <a 
                href="mailto:media@improxmartech.com"
                className="text-xs font-black uppercase tracking-wider text-martech-cyan hover:underline"
              >
                Request Media Kit &rarr;
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 rounded-3xl border border-martech-border bg-martech-card p-8 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-martech-border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-cyan focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Corporate Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-martech-border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-cyan focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="SaaS Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-martech-border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-cyan focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Target Offering</label>
                    <select 
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      className="w-full rounded-xl border border-martech-border bg-slate-950 px-4 py-3 text-sm text-white focus:border-martech-cyan focus:outline-none cursor-pointer"
                    >
                      <option className="bg-slate-950 text-white">ABM Orchestration</option>
                      <option className="bg-slate-950 text-white">Stack Audits & Migrations</option>
                      <option className="bg-slate-950 text-white">B2B Content Syndication</option>
                      <option className="bg-slate-950 text-white">General Support / Guest Editorial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Message Detail</label>
                  <textarea 
                    rows="4"
                    required
                    placeholder="Briefly describe your systems stack and milestones."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-martech-border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-cyan focus:outline-none transition-colors"
                  />
                </div>

                <button 
                  type="submit" 
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary py-3.5 text-xs font-black uppercase tracking-wider text-white transition hover:from-martech-primary hover:to-martech-accent cursor-pointer shadow-lg shadow-martech-primary/10 hover:shadow-martech-primary/20"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white font-display mb-2">Message Sent</h3>
                <p className="text-slate-300 text-sm mb-6">
                  Thanks for reaching out, {formData.name}. We will assign a solutions architect to contact you at <span className="text-martech-cyan font-bold">{formData.email}</span> within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-martech-cyan hover:underline font-bold"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </>
  );
}
