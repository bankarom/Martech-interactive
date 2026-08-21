import React, { useState } from 'react';
import { Download, Lock, CheckCircle } from 'lucide-react';

export default function GatedDownloadForm({ resourceTitle, onUnlock }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://formsubmit.co/ajax/enquiry@improxgroup.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ resourceTitle, ...formData })
    })
    .then(res => res.json())
    .then(() => {
      setSubmitted(true);
      setTimeout(() => {
        onUnlock();
      }, 1200);
    })
    .catch(() => {
      setSubmitted(true);
      setTimeout(() => {
        onUnlock();
      }, 1200);
    });
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-white/10 bg-martech-navy/40 p-8 backdrop-blur-xl shadow-2xl">
      {!submitted ? (
        <>
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mb-3">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Unlock Premium Asset</h3>
            <p className="text-sm text-slate-400">
              Access "{resourceTitle}" instantly by verifying your professional profile details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Work Email</label>
              <input
                type="email"
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-accent focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enterprise Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="VP of Growth"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-martech-accent focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-martech-accent to-martech-cyan py-3.5 text-sm font-semibold text-white transition hover:opacity-95 cursor-pointer"
            >
              <Download className="h-4.5 w-4.5" />
              <span>Access Digital Report</span>
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-4 animate-pulse">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Verification Approved</h3>
          <p className="text-sm text-slate-300">
            Preparing your download link. Thank you for using Improx Martech.
          </p>
        </div>
      )}
    </div>
  );
}
