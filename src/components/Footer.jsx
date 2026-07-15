import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'abm-marketing', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', service: 'abm-marketing', message: '' });
    }, 3000);
  };

  return (
    <footer className="bg-martech-dark border-t border-martech-border pt-16 pb-8 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Foot Grid: 2/3 Content Links, 1/3 Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-12 mb-12">
          
          {/* Left Side columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Brand Info & Offices */}
            <div className="space-y-6">
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                  IMPROX <span className="bg-gradient-to-r from-martech-accent to-martech-cyan bg-clip-text text-transparent">MARTECH</span>
                </span>
                <p className="text-slate-600 text-xs leading-relaxed mt-3">
                  Premium B2B media publication platform and solutions orchestration system for high-scale enterprise SaaS brands.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Pune Core Office</h4>
                <ul className="space-y-2 text-xs text-slate-605">
                  <li className="flex items-center space-x-2">
                    <MapPin className="h-3.5 w-3.5 text-martech-accent shrink-0" />
                    <span>Millennium Tower, Baner, Pune</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="h-3.5 w-3.5 text-martech-cyan shrink-0" />
                    <span>+91 20 6789 5432</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Mail className="h-3.5 w-3.5 text-martech-accent shrink-0" />
                    <span>solutions@improxmartech.com</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Solution offerings */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Solutions</h4>
              <ul className="space-y-2.5 text-xs text-slate-605">
                <li><Link to="/solutions/abm-marketing" className="hover:text-martech-accent transition">ABM & Intent Orchestration</Link></li>
                <li><Link to="/solutions/marketing-automation" className="hover:text-martech-accent transition">Stack Audit & Integrations</Link></li>
                <li><Link to="/solutions/lead-generation" className="hover:text-martech-accent transition">B2B Lead Generation</Link></li>
                <li><Link to="/solutions/data-intelligence" className="hover:text-martech-accent transition">Data CDP Intelligence</Link></li>
                <li><Link to="/solutions/ai-marketing" className="hover:text-martech-accent transition">AI Marketing Copilots</Link></li>
              </ul>
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2.5 text-xs text-slate-605">
                <li><Link to="/insights" className="hover:text-martech-accent transition">News & Insights Feed</Link></li>
                <li><Link to="/interviews" className="hover:text-martech-accent transition">Executive Spotlights</Link></li>
                <li><Link to="/reports" className="hover:text-martech-accent transition">Research Reports</Link></li>
                <li><Link to="/infographics" className="hover:text-martech-accent transition">Stack Infographics</Link></li>
                <li><Link to="/about" className="hover:text-martech-accent transition">About Improx Team</Link></li>
              </ul>
            </div>

          </div>

          {/* Right Side: Global Enquiry Consultation Form */}
          <div className="rounded-3xl border border-martech-border bg-gradient-to-br from-martech-card to-martech-navy p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-40 h-40 bg-martech-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">Schedule Consultation</h3>
                  <p className="text-slate-600 text-xs mt-1">Submit your requirements to audit and customize your B2B marketing stack.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    required 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-martech-primary focus:outline-none"
                  />
                  <input 
                    type="email" 
                    required 
                    placeholder="Work Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-martech-primary focus:outline-none"
                  />
                </div>

                <div>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:border-martech-primary focus:outline-none"
                  >
                    <option value="demand-gen">Demand Generation Setup</option>
                    <option value="lead-gen">Lead Verification Gates</option>
                    <option value="abm-marketing">B2B ABM targeting</option>
                    <option value="automation">Marketing Automation Sync</option>
                    <option value="data-cdp">CDP Profile Unification</option>
                  </select>
                </div>

                <div>
                  <textarea 
                    rows="2"
                    required
                    placeholder="Inquiry or Requirements details..." 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-martech-primary focus:outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary py-2.5 text-xs font-bold text-white transition hover:opacity-95 cursor-pointer shadow-md shadow-martech-primary/10"
                >
                  Submit Inquiry Brief
                </button>
              </form>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-6 space-y-3">
                <CheckCircle className="h-12 w-12 text-emerald-400 animate-bounce" />
                <h4 className="text-sm font-bold text-slate-900">Consultation Request Recorded</h4>
                <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                  Thank you, {formData.name || 'Partner'}. An Improx stack strategy architect will email you within 2 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] text-martech-primary font-bold hover:underline"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Footer bottom */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-550 text-[10px]">
          <p>&copy; {new Date().getFullYear()} Improx Martech. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-900">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
