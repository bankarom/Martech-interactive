import React, { useState, useEffect } from 'react';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import GatedDownloadForm from '../components/GatedDownloadForm';
import { FileText, ArrowRight, Download } from 'lucide-react';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null); // Report object currently selected to unlock
  const [unlockedReportIds, setUnlockedReportIds] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await CMSService.getReports();
      setReports(data);
    }
    load();
  }, []);

  const handleUnlock = (reportId) => {
    setUnlockedReportIds([...unlockedReportIds, reportId]);
    setActiveReport(null);
  };

  return (
    <>
      <SEOHelper 
        title="Research Reports & Playbooks" 
        description="Premium gated research reports, market intelligence playbooks, and templates for Martech operations."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-martech-border pb-8 mb-12 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-martech-primary bg-martech-primary/10 px-3 py-1 rounded-full border border-martech-primary/20">Spotlight Reports</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4 font-display">Research Reports & Operational Playbooks</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
            Unlock premium research that turns B2B martech operations into measurable campaign playbooks and executive-ready decision support.
          </p>
        </div>

        {/* Gated Unlock Modal Modal Backdrop */}
        {activeReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020306]/60 backdrop-blur-md">
            <div className="w-full max-w-lg relative">
              <button 
                onClick={() => setActiveReport(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest z-10 cursor-pointer"
              >
                Close
              </button>
              <GatedDownloadForm 
                resourceTitle={activeReport.title}
                onUnlock={() => handleUnlock(activeReport.id)}
              />
            </div>
          </div>
        )}

        {/* List Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reports.map(rep => {
            const isUnlocked = unlockedReportIds.includes(rep.id);
            return (
              <div 
                key={rep.id}
                className="rounded-3xl border border-martech-border bg-gradient-to-br from-martech-card to-martech-navy p-8 flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 hover:border-martech-primary/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-martech-primary/5 transition-all duration-300 shadow-sm"
              >
                {/* Book Cover Mockup */}
                <div className="w-full sm:w-40 aspect-[3/4] bg-gradient-to-br from-slate-900 to-slate-950 border border-martech-border rounded-2xl flex flex-col justify-between p-4 shrink-0 shadow-sm">
                  <FileText className="h-8 w-8 text-martech-cyan" />
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider font-bold text-slate-550">Playbook</span>
                    <span className="block text-[10px] font-extrabold text-white leading-tight mt-1 line-clamp-3 font-display">{rep.title}</span>
                  </div>
                </div>

                {/* Report Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-martech-cyan uppercase tracking-wider">Premium Report</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-3 leading-snug font-display">{rep.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-350 line-clamp-3 mb-6 leading-relaxed">{rep.excerpt}</p>
                  </div>

                  <div className="border-t border-martech-border pt-4 flex items-center justify-between mt-auto">
                    <span className="text-[10px] text-slate-550 font-semibold uppercase tracking-wider">{rep.pages} Pages • {rep.downloadCount.toLocaleString()} DLs</span>
                    
                    {isUnlocked ? (
                      <a 
                        href={`/documents/report-${rep.id}.pdf`}
                        download
                        className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/10 px-4 h-9 text-[10px] font-black tracking-wider uppercase hover:shadow-lg hover:shadow-emerald-500/20 transition duration-300 cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Save PDF</span>
                      </a>
                    ) : (
                      <button 
                        onClick={() => setActiveReport(rep)}
                        className="inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary text-white shadow-md shadow-martech-primary/10 px-4.5 h-9 text-[10px] font-black tracking-wider uppercase hover:from-martech-primary hover:to-martech-accent hover:shadow-lg hover:shadow-martech-primary/20 transition duration-300 cursor-pointer"
                      >
                        <span>Unlock Report</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
