import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHelper from '../components/SEOHelper';
import { 
  Sparkles, Layers, Award, BookOpen, ArrowRight, 
  CheckCircle2, ShieldCheck, Database, Cpu, Activity, 
  X, Info, TrendingUp, UserCheck 
} from 'lucide-react';

const INFOGRAPHICS_DATA = [
  {
    id: 'privacy-consent-map',
    title: 'Privacy & Consent Lifecycle Map',
    subtitle: 'End-to-end B2B buyer compliance tracking architecture.',
    category: 'Governance & Privacy',
    icon: ShieldCheck,
    views: '3.4k downloads',
    description: 'A detailed lifecycle design mapping regulatory consent flags directly from top-of-funnel programmatic ad networks through identity resolution, storage, and final sales handoff systems.',
    stats: { impact: '100% Audit Compliance', duration: 'Real-time validation', coverage: 'GDPR / CCPA / CPA' },
    steps: [
      {
        id: 'step-1',
        title: 'Consent Gate Ingestion',
        badge: 'Top-of-Funnel',
        desc: 'Browser cookies and IP addresses are parsed against global consent strings (TCF v2.2) to check compliance criteria before tracking nodes launch.',
        checklist: ['GDPR Opt-in logs generated', 'CCPA DO-NOT-SELL status flags', 'Consent telemetry saved to local cache']
      },
      {
        id: 'step-2',
        title: 'Compliance-First Identity Resolution',
        badge: 'CDP Engine',
        desc: 'First-party data layers unify visitor hits across multiple systems while ensuring consent statuses match and propagate to target accounts.',
        checklist: ['Hashed email matching pipelines', 'Opt-out status reconciliation', 'Consent ID lookup table queries']
      },
      {
        id: 'step-3',
        title: 'Attribution & Storage Enforcement',
        badge: 'Database Integration',
        desc: 'Campaign tracking variables are stored with clear lifetime controls. Records are auto-scrubbed or updated depending on local regulations.',
        checklist: ['Attribution metrics write-backs', 'Automatic 90-day expiry schedules', 'GDPR delete request pipelines']
      },
      {
        id: 'step-4',
        title: 'Safe CRM Routing & Handoff',
        badge: 'Sales Operations',
        desc: 'SDR pipeline notifications highlight lead origin channels with complete compliance verification histories attached directly to account cards.',
        checklist: ['Opt-in source URL stamping', 'Compliance status sync verification', 'Lead lock down protocols for non-opt-in']
      }
    ]
  },
  {
    id: 'cdp-stack-blueprint',
    title: 'Customer Data Platform Blueprint',
    subtitle: 'Unified first-party customer profile pipelines.',
    category: 'Stack Architecture',
    icon: Database,
    views: '4.8k downloads',
    description: 'System flow schematic showing how to route web telemetry, CRM records, offline lists, and SaaS metrics into a unified profiling core for activation.',
    stats: { impact: '32% Less Data Duplication', duration: '<250ms Sync Latency', coverage: 'All SaaS Integrations' },
    steps: [
      {
        id: 'cdp-1',
        title: 'Multi-Source Data Ingestion',
        badge: 'Data Sources',
        desc: 'Collect raw SDK page views, SaaS webhooks, CRM records, and offline segment lists into cloud ingestion queues.',
        checklist: ['Vite analytics events streaming', 'CRM contact data sync pipelines', 'Third-party intent feeds ingestion']
      },
      {
        id: 'cdp-2',
        title: 'Schema Normalization & Unification',
        badge: 'Processing Layer',
        desc: 'Filter raw schemas, map key-value attributes to consistent labels, and run deduplication models to clean duplicate email profiles.',
        checklist: ['Real-time record schema checks', 'Hashed identifier mapping queries', 'Duplicate record merge processes']
      },
      {
        id: 'cdp-3',
        title: 'Profile Enrichment & Segments',
        badge: 'Intelligence Core',
        desc: 'Enrich basic profiles with account tier details, predictive intent indicators, and operational lifecycle scores.',
        checklist: ['Predictive tier score calculations', 'Active intent intensity flag setups', 'Dynamic segment membership builds']
      },
      {
        id: 'cdp-4',
        title: 'Real-time API Activation',
        badge: 'Outbound Layer',
        desc: 'Sync segments out to digital advertising channels, email platforms, and SDR notification systems instantly.',
        checklist: ['HubSpot webhook alerts routing', 'Google & Meta custom list syncs', 'Salesforce pipeline updates']
      }
    ]
  },
  {
    id: 'intent-campaign-flow',
    title: 'B2B Intent-Driven Campaign Flow',
    subtitle: 'Automated Account-Based Marketing triggers.',
    category: 'Demand Generation',
    icon: Cpu,
    views: '2.9k downloads',
    description: 'Audience activation sequence mapping third-party intent spikes directly to custom ad targets and sales development notification feeds.',
    stats: { impact: '2.4x Faster Pipeline Lift', duration: 'Daily intent refreshes', coverage: 'Enterprise TALs' },
    steps: [
      {
        id: 'intent-1',
        title: 'Intent Signal Monitoring',
        badge: 'Ingestion Phase',
        desc: 'Monitor high-value B2B keywords and web resource downloads across intent data provider networks.',
        checklist: ['Bombora intent keyword configurations', '6sense target account tracking', 'Spike score thresholds checks']
      },
      {
        id: 'intent-2',
        title: 'Target Account List Match',
        badge: 'Matching Layer',
        desc: 'Match spiking intent signals against your ideal customer profile (ICP) and existing accounts inside the CRM.',
        checklist: ['IP-to-domain database resolution', 'CRM account status validation', 'Lead-to-account matching routes']
      },
      {
        id: 'intent-3',
        title: 'Dynamic Ads & Content Trigger',
        badge: 'Activation Phase',
        desc: 'Automatically inject matched accounts into targeted display platforms and personalized landing page segments.',
        checklist: ['Dynamic programmatic ad bid triggers', 'Vite website personalization setups', 'Asset variations delivery']
      },
      {
        id: 'intent-4',
        title: 'Sales Notification Alerts',
        badge: 'Handoff Phase',
        desc: 'Alert assigned sales representatives when target accounts reach high intent levels, recommending outbound playbooks.',
        checklist: ['Slack notification dispatch rules', 'CRM task creations with context', 'E-mail template options suggested']
      }
    ]
  },
  {
    id: 'attribution-revenue-matrix',
    title: 'Multi-Touch Revenue Attribution Matrix',
    subtitle: 'CMO dashboard reporting and pipeline formulas.',
    category: 'Budgets & Analytics',
    icon: Activity,
    views: '5.1k downloads',
    description: 'Visual mathematical breakdown showing how first-touch, linear, time-decay, and W-shaped attribution models divide won revenue.',
    stats: { impact: '100% Pipeline Visibility', duration: 'Automated weekly audits', coverage: 'All Digital Spends' },
    steps: [
      {
        id: 'attr-1',
        title: 'First-Touch Ingestion',
        badge: 'Discovery Phase',
        desc: 'Capture the original source touchpoint (e.g. search ads or content syndication downloads) that introduced the prospect.',
        checklist: ['UTM variable logging setups', 'First-session ID cookies storage', 'Discovery pathway reports']
      },
      {
        id: 'attr-2',
        title: 'Lead-Creation Touchpoint',
        badge: 'Conversion Phase',
        desc: 'Record the exact interaction that triggered the conversion of an anonymous visitor into a verified lead.',
        checklist: ['Content download form tracking', 'Form submission event logging', 'MAP lead ingestion times']
      },
      {
        id: 'attr-3',
        title: 'Opportunity Handoff Touch',
        badge: 'Pipeline Creation',
        desc: 'Map the final marketing interaction that occurred immediately before the sales team created a pipeline opportunity.',
        checklist: ['Meeting request form tracking', 'Product demo booking conversions', 'Opportunity status integrations']
      },
      {
        id: 'attr-4',
        title: 'Attribution Model Revenue Allocation',
        badge: 'Attribution Calculations',
        desc: 'Run multi-touch formulas across touchpoints to divide won contract values among active campaigns.',
        checklist: ['W-Shaped weight configurations', 'Pipeline value mapping scripts', 'ROI charts for board decks']
      }
    ]
  }
];

export default function Infographics() {
  const [selectedInfographic, setSelectedInfographic] = useState(INFOGRAPHICS_DATA[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <>
      <SEOHelper
        title="Interactive Stack Infographics & Playbooks | Improx Martech"
        description="Explore visual playbooks, market maps, data flow diagrams, and interactive infographic assets designed for modern B2B marketing operations."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Reinvented Header Section */}
        <section className="relative rounded-[2.5rem] border border-martech-border bg-gradient-to-br from-martech-navy via-martech-card to-martech-dark p-8 md:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-martech-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-martech-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-martech-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-martech-primary">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Interactive Visual Hub
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight font-display">
                Data Stories & B2B Stack Architectures
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Browse our interactive blueprints designed to simplify complex marketing operations. Select an architecture blueprint below to test, inspect components, and export diagrams.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#interactive-explorer" className="inline-flex items-center justify-center rounded-full bg-martech-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-martech-accent/20 hover:bg-martech-accent/90 transition-all hover:scale-[1.02]">
                  Explore Blueprints Below <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-martech-border bg-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-700 hover:border-martech-primary/40 hover:text-martech-primary transition-all">
                  Request Custom Stack Diagram
                </Link>
              </div>
            </div>

            {/* Live Interactive Dashboard Preview widget */}
            <div className="rounded-3xl border border-martech-border bg-martech-card p-6 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold text-slate-600">Interactive Blueprint Sandbox</span>
                </div>
                <span className="text-[10px] bg-martech-primary/15 text-martech-primary px-2.5 py-0.5 rounded-full font-mono">Status: Connected</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-martech-primary/10 p-2.5 text-martech-primary mt-1">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Select Any Blueprint</h3>
                    <p className="text-xs text-slate-605 mt-1">Click a blueprint to populate the live explorer with steps, audit checklists, and system scopes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-martech-cyan/10 p-2.5 text-martech-cyan mt-1">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Click to Inspect Steps</h3>
                    <p className="text-xs text-slate-605 mt-1">Dive deep into step-by-step structures, target technologies, and data verification routines.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="rounded-2xl bg-slate-50 border border-martech-border p-3 flex items-center justify-between text-xs text-slate-700">
                    <span className="flex items-center gap-1.5"><Info className="h-4 w-4 text-martech-primary" /> Multi-Source CDP Configured</span>
                    <span className="font-mono text-emerald-600 font-bold">Pass</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Explorer Section */}
        <section id="interactive-explorer" className="space-y-8 scroll-mt-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Interactive Visual Playbooks</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Select one of our four core visual architectures to render the flowchart details, verify audit metrics, and explore operational checkpoints.
            </p>
          </div>

          {/* Tab Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFOGRAPHICS_DATA.map((info) => {
              const IconComp = info.icon;
              const isSelected = selectedInfographic.id === info.id;
              return (
                <button
                  key={info.id}
                  onClick={() => {
                    setSelectedInfographic(info);
                    setActiveStepIndex(0);
                  }}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-martech-card border-martech-primary/50 shadow-lg shadow-martech-primary/5' 
                      : 'bg-martech-navy border-martech-border hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-martech-primary/20 text-martech-primary' : 'bg-slate-900 text-slate-400'}`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{info.views}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">{info.title}</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">{info.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Interactive Flowchart Render Canvas */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] bg-martech-card border border-martech-border rounded-[2rem] p-6 md:p-8 shadow-xl">
            
            {/* Left Column: Visual Flowchart / Diagram simulation */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-martech-primary font-bold">{selectedInfographic.category}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{selectedInfographic.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Step {activeStepIndex + 1} of {selectedInfographic.steps.length}</span>
                </div>
              </div>

              {/* Dynamic Diagram Canvas */}
              <div className="relative border border-martech-border/80 bg-martech-navy rounded-2xl p-6 md:p-8 flex flex-col justify-center min-h-[340px] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.03),_transparent_60%)] pointer-events-none" />
                
                {/* Horizontal Progress Flowline */}
                <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-300 -translate-y-1/2 hidden md:block" />
                
                <div className="relative grid gap-6 md:grid-cols-4 items-center">
                  {selectedInfographic.steps.map((step, idx) => {
                    const isStepActive = idx === activeStepIndex;
                    const isStepPast = idx < activeStepIndex;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`text-left p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] relative z-10 cursor-pointer ${
                          isStepActive
                            ? 'bg-martech-card border-martech-primary text-slate-900 ring-2 ring-martech-primary/10'
                            : isStepPast
                              ? 'bg-slate-50 border-emerald-500/40 text-slate-700'
                              : 'bg-slate-50 border-martech-border text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isStepActive 
                              ? 'bg-martech-primary/15 text-martech-primary' 
                              : isStepPast 
                                ? 'bg-emerald-500/10 text-emerald-600' 
                                : 'bg-slate-200 text-slate-600'
                          }`}>
                            Phase {idx + 1}
                          </span>
                          {isStepPast && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        </div>
                        <h4 className="mt-3 text-xs font-bold font-display leading-tight text-slate-800">{step.title}</h4>
                        <span className="text-[9px] block text-slate-550 mt-1.5 uppercase font-mono">{step.badge}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Animated connectors indicator */}
                <div className="mt-8 text-center text-xs text-slate-600 flex items-center justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-martech-primary animate-ping" />
                  <span>Click any Phase above to inspect specific sub-parts and verification checklists</span>
                </div>
              </div>

              {/* Explanatory summary text under flowchart */}
              <div className="grid gap-6 sm:grid-cols-3 bg-martech-navy p-4 rounded-xl border border-martech-border text-center sm:text-left">
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest">Stack Benefit</p>
                  <p className="text-sm font-bold text-slate-800 mt-1">{selectedInfographic.stats.impact}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest">Pipeline Velocity</p>
                  <p className="text-sm font-bold text-slate-800 mt-1">{selectedInfographic.stats.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest">System Scope</p>
                  <p className="text-sm font-bold text-slate-800 mt-1">{selectedInfographic.stats.coverage}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Inspector Card */}
            <div className="border border-martech-border bg-martech-card p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-martech-primary/10 text-martech-primary font-bold px-2 py-0.5 rounded-full">INSPECTING STEP {activeStepIndex + 1}</span>
                  <span className="text-xs text-slate-500">&mdash; {selectedInfographic.steps[activeStepIndex].badge}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedInfographic.steps[activeStepIndex].title}
                </h3>
                
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedInfographic.steps[activeStepIndex].desc}
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <UserCheck className="h-4 w-4 text-martech-primary" />
                    Required Sub-Parts & Checklist
                  </p>
                  <div className="space-y-2">
                    {selectedInfographic.steps[activeStepIndex].checklist.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                        <CheckCircle2 className="h-3.5 w-3.5 text-martech-primary flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <Link to="/contact" className="w-full inline-flex items-center justify-center rounded-xl bg-martech-accent/10 border border-martech-accent/25 hover:bg-martech-accent/20 py-2.5 text-xs font-semibold text-martech-primary transition-all">
                  Request Interactive Live Integration
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Interactive Blueprints',
              description: 'Clickable layouts to inspect CDP, stack orchestration, compliance routing, and custom attribution.',
              icon: Layers,
            },
            {
              title: 'Sub-Part Checklists',
              description: 'Each phase contains strict integration checklists mapping API sync status and verification keys.',
              icon: BookOpen,
            },
            {
              title: 'Export Stack Configs',
              description: 'Configure and present these flowcharts directly in quarterly planning boards or pipeline briefings.',
              icon: Award,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-martech-border bg-martech-card p-6 shadow-md hover:-translate-y-1 transition-transform">
              <item.icon className="h-7 w-7 text-martech-cyan" />
              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </section>

        {/* Static Playbook & Visual Assets Catalog */}
        <section className="rounded-[2rem] border border-martech-border bg-martech-navy p-8 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] items-center">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-martech-cyan font-bold">Featured Resource</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">Download the B2B GTM Systems Map</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">A high-fidelity layout representing data ingestion points, third-party marketing tags, server-side attribution scripts, and unified profiles map to embed directly in board presentations.</p>
              <div className="flex flex-wrap gap-3">
                <a href="#interactive-explorer" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition">
                  Explore Interactive Simulator
                </a>
                <Link to="/reports" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:border-white/30 transition">
                  See Related Report
                </Link>
              </div>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-slate-950 p-6">
              <div className="h-64 rounded-[1.75rem] bg-gradient-to-br from-martech-primary/10 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-slate-100 text-sm text-center p-4">
                <TrendingUp className="h-8 w-8 text-martech-primary animate-bounce mb-3" />
                <p className="text-sm font-semibold">Visual Stack Map Preview</p>
                <p className="mt-2 text-xs text-slate-400 max-w-xs leading-relaxed">Check metrics, pipelines, custom tags, and GDPR/CCPA routing maps dynamically.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
