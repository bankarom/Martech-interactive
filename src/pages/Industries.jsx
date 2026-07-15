import React from 'react';
import SEOHelper from '../components/SEOHelper';
import { Shield, Cpu, Activity, DollarSign, Settings } from 'lucide-react';

export default function Industries() {
  const sectors = [
    {
      title: 'SaaS',
      icon: <Cpu size={32} />,
      desc: 'Acquire high-value contract pipelines targeting key buying committee personas.',
      benchmark: '+230% Average Pipeline Growth'
    },
    {
      title: 'Tech',
      icon: <Shield size={32} />,
      desc: 'Verify and enrich technical lead prospects using direct technographic parameters.',
      benchmark: '-45% Wasted Ad Spend'
    },
    {
      title: 'Healthcare',
      icon: <Activity size={32} />,
      desc: 'HIPAA and privacy-compliant double opt-in syndication campaigns for clinical roles.',
      benchmark: '15%+ SQL Conversion Rate'
    },
    {
      title: 'Finance',
      icon: <DollarSign size={32} />,
      desc: 'Ultra-secure lead validation workflows and direct sub-second CRM syncing.',
      benchmark: '100% Data Sync Accuracy'
    },
    {
      title: 'Manufacturing',
      icon: <Settings size={32} />,
      desc: 'Connect distributor networks and run pipeline trigger nurturing cycles.',
      benchmark: '+120% Target Deals Closed'
    }
  ];

  return (
    <div className="industries-page container animated-fade">
      <SEOHelper title="Industries Served" description="B2B campaign optimization for SaaS, Tech, Healthcare, Finance, and Manufacturing." />

      <header className="page-header text-center" style={{ margin: '4rem 0' }}>
        <span className="badge">Market Verticals</span>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginTop: '1rem', textTransform: 'uppercase' }}>
          Industry Specializations
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginTop: '0.5rem' }}>
          We configure target marketing models adjusted to target buyer characteristics of enterprise technology sectors.
        </p>
      </header>

      <div className="sectors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        {sectors.map((sec, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(2,132,199,0.08)', color: 'var(--accent-blue)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {sec.icon}
            </div>
            <h2>{sec.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', flexGrow: 1 }}>{sec.desc}</p>
            <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: '#34d399', fontWeight: '700', alignSelf: 'flex-start' }}>
              {sec.benchmark}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
