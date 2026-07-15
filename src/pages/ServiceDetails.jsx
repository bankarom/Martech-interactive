import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { ArrowLeft, ShieldCheck, CheckCircle2, Cpu, Database, Award, Activity, Sparkles, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await CMSService.getServiceById(id);
      setService(data);
      
      const list = await CMSService.getServices();
      setAllServices(list);
      setLoading(false);
    }
    load();
  }, [id]);

  const getTechnicalApproach = (id, title) => {
    const defaults = {
      'demand-generation': 'We construct programmatic acquisition pathways using cookie-less tracking structures, ensuring high-intent traffic is captured. By leveraging intent indicators, we identify top accounts showing active search behaviors, mapping customized landing variations dynamically to convert key decision makers.',
      'lead-generation': 'We syndicate digital assets through our partner publisher network, applying double opt-in email validation gateways to filter out junk profiles. Leads are standardized and routed to CRM sequences in under 250ms with verification timestamps.',
      'abm-marketing': 'We target account buying committees by configuring B2B IP ranges across display ad exchanges. The Improx Team designs dynamic account pages loaded with hyper-relevant assets that adapt based on account domain parameters.',
      'marketing-automation': 'We audit and rewrite marketing automation pipelines inside HubSpot, Marketo, or Pardot. We establish clean lead-scoring thresholds, sync criteria schedules, and resolve database duplicates to stop pipeline leakages.',
      'ai-marketing': 'We integrate predictive models directly into your audience builder to score conversion likelihood. Generative copywriting controls are applied, ensuring dynamic ad and email copy variations remain compliant.',
      'data-intelligence': 'We configure first-party clean rooms and Customer Data Platforms (CDPs) to unify siloed interactions from web, CRM, and display. This builds 100% attribution reports to track channel conversions.',
      'content-syndication': 'We map and syndicate whitepapers and guides across publisher networks, filtering targets by role, industry, and budget fields to deliver pre-qualified prospects directly to your sales filters.',
      'intent-data': 'We set up real-time intent ingestion streams (e.g. Bombora, 6sense) that dynamically update target lists, triggering display ads and instant Slack notifications for sales representatives.',
      'b2b-marketing': 'We establish full-funnel blueprints coordinating top-of-funnel programmatic display with mid-funnel email personalization, building unified attribution reporting to monitor conversions.',
      'campaign-management': 'We manage multi-channel budgets, optimizing campaign bids, pixel placements, and ad copy variations through continuous A/B tests to lower Customer Acquisition Cost.'
    };
    return defaults[id] || `We solve the unique challenges of ${title} by auditing existing system configurations, configuring clean first-party data tracking nodes, and establishing seamless integrations to connect marketing actions to won revenue.`;
  };

  const getDeploymentPhases = (id) => {
    const phaseMap = {
      'demand-generation': [
        { name: 'Audit', title: 'Contextual Ad Audit', desc: 'We scan placement domains, analyze historic click records, and look for ad spend leakages.' },
        { name: 'Strategy', title: 'Dynamic Bidding Setup', desc: 'Design automated bidding rules and map customized landing variants to your key target keywords.' },
        { name: 'Integration', title: 'Channel Integration', desc: 'Deploy tracking pixels across search and programmatic exchanges to capture high-intent metrics.' },
        { name: 'Optimization', title: 'Pipeline Conversion Audit', desc: 'Refine programmatic bids weekly and optimize campaign coordinates to drive qualified pipeline lift.' }
      ],
      'lead-generation': [
        { name: 'Audit', title: 'Consent Verification', desc: 'We verify lead capture compliance, checking opt-in checkboxes and privacy setups against regulations.' },
        { name: 'Strategy', title: 'Gateway Configuration', desc: 'Design real-time verification and filtering logic to discard bad or invalid lead info instantly.' },
        { name: 'Integration', title: 'Publisher Syndication', desc: 'Launch assets on select professional channels, syndicating whitepapers to verified buyers.' },
        { name: 'Optimization', title: 'Lead Flow Automation', desc: 'Establish 250ms direct API integration routing verified profiles directly to SDR sequences.' }
      ],
      'abm-marketing': [
        { name: 'Audit', title: 'TAL Matching Audit', desc: 'Resolve target account lists against active B2B IP ranges to check account coverage scores.' },
        { name: 'Strategy', title: 'Committee Persona Mapping', desc: 'Map target roles and job levels within account committees to define custom asset requirements.' },
        { name: 'Integration', title: 'Personalized Ad Launch', desc: 'Configure dynamic account display ads and deploy custom account landing experiences.' },
        { name: 'Optimization', title: 'SDR Alert Workflow', desc: 'Set up real-time Salesforce alerts when accounts reach active intent engagement scores.' }
      ],
      'marketing-automation': [
        { name: 'Audit', title: 'Stack Architecture Audit', desc: 'Inspect synchronization pathways, mapping fields, and pixel tracking to find data leaks.' },
        { name: 'Strategy', title: 'Lead Scoring Blueprint', desc: 'Configure lead activity scoring weights and demographic stage categories.' },
        { name: 'Integration', title: 'Sync Hygiene Integration', desc: 'Connect HubSpot, Salesforce, and Marketo pipelines securely with zero field conflicts.' },
        { name: 'Optimization', title: 'Workflow Scale Optimization', desc: 'Build automated email nurture paths and configure automated duplicate records cleanup rules.' }
      ],
      'ai-marketing': [
        { name: 'Audit', title: 'ML Model Configuration', desc: 'Analyze data warehouse structures to configure conversion likelihood prediction models.' },
        { name: 'Strategy', title: 'Segments Allocation', desc: 'Define high-probability buyer segments dynamically to customize automated outreach steps.' },
        { name: 'Integration', title: 'Copilot Copy Integration', desc: 'Inject automated copy variations within compliance guardrails to scale ad creation speeds.' },
        { name: 'Optimization', title: 'Model Training Feedback', desc: 'Adjust machine learning weights based on closed-won opportunity metadata.' }
      ],
      'data-intelligence': [
        { name: 'Audit', title: 'Data Silos Audit', desc: 'Map disconnected CDP, MAP, and CRM touchpoints to identify attribution gaps.' },
        { name: 'Strategy', title: 'Schema Mapping Design', desc: 'Establish unified identity resolution tables matching hashed contacts across channels.' },
        { name: 'Integration', title: 'CDP Core Implementation', desc: 'Deploy Segment or Snowflake pipelines to unify customer profiles in real time.' },
        { name: 'Optimization', title: 'Attribution Dashboard Build', desc: 'Develop multi-touch reporting dashboards displaying campaign contribution to pipeline values.' }
      ],
      'content-syndication': [
        { name: 'Audit', title: 'Asset Auditing', desc: 'Scan and optimize digital assets, whitepapers, and guides for digital readability.' },
        { name: 'Strategy', title: 'Placement Mapping', desc: 'Map assets to relevant B2B publisher niches targeting operational buyers.' },
        { name: 'Integration', title: 'API Ingestion Integration', desc: 'Connect publisher download webhooks directly to CRM lead pools.' },
        { name: 'Optimization', title: 'Lead Handoff Optimization', desc: 'Configure custom nurture paths to follow up with downloaders instantly.' }
      ],
      'intent-data': [
        { name: 'Audit', title: 'Keyword Selection', desc: 'Audit historic search trends to configure target intent keywords.' },
        { name: 'Strategy', title: 'Intent Scoring Setup', desc: 'Define active intent intensity thresholds and target account alert ranges.' },
        { name: 'Integration', title: 'Webhook Alert Routing', desc: 'Trigger automated ad bid increases and CRM task logs when accounts surge.' },
        { name: 'Optimization', title: 'Performance Review', desc: 'Analyze intent-triggered ad performance against general ad pools.' }
      ],
      'b2b-marketing': [
        { name: 'Audit', title: 'Committee Mapping', desc: 'Map organizational structures and account buyer paths.' },
        { name: 'Strategy', title: 'Full-Funnel Design', desc: 'Design full campaigns coordinating search ads, custom landing pages, and email nurtures.' },
        { name: 'Integration', title: 'Stack Setup', desc: 'Connect analytics pixels, MAP workflows, and CRM pipelines.' },
        { name: 'Optimization', title: 'Budget Redistribution', desc: 'Redirect digital budget to high-performing campaigns based on attribution.' }
      ],
      'campaign-management': [
        { name: 'Audit', title: 'Ad Account Review', desc: 'Analyze historic CPC, quality scores, and ad group configurations.' },
        { name: 'Strategy', title: 'Tracking Configuration', desc: 'Verify server-side conversions are logging correctly.' },
        { name: 'Integration', title: 'Variant Optimization', desc: 'Deploy A/B variants of ad copy and visual assets.' },
        { name: 'Optimization', title: 'Performance Audits', desc: 'Adjust programmatic bids weekly to drive down target Cost Per Acquisition.' }
      ]
    };
    return phaseMap[id] || [
      { name: 'Audit', title: 'System Setup & Integrations Audit', desc: 'Audit active software field configurations, locate data conflict points, and measure pipeline leakages.' },
      { name: 'Strategy', title: 'Asset & Logic Blueprinting', desc: 'Map client persona segments, configure scoring weights, and design outbound response paths.' },
      { name: 'Integration', title: 'Telemetry Node Installation', desc: 'Deploy custom integrations, server side hooks, and map database fields dynamically.' },
      { name: 'Optimization', title: 'Volume & Ingestion Tuning', desc: 'Optimize sync intervals, bid rules, and asset syndicate filters weekly to lower customer acquisition costs.' }
    ];
  };

  const getWhyUsPoints = (id) => {
    const whyMap = {
      'demand-generation': [
        { title: 'High-Intent Pipeline Focus', desc: 'We target active buyers searching for solutions, avoiding wasted impressions.' },
        { title: 'Cookie-Less Ingestion Nodes', desc: 'Custom first-party tags ensure data is captured without relying on third-party cookies.' },
        { title: 'Programmatic Bid Control', desc: 'Bids are optimized to drive pipeline opportunity values, not just traffic hits.' },
        { title: 'Real-Time ROI Dashboard', desc: 'Track your demand generation spends against revenue directly inside the dashboard.' }
      ],
      'lead-generation': [
        { title: 'Double Opt-In Compliance', desc: 'All leads pass validation checks, ensuring records are CCPA and GDPR compliant.' },
        { title: 'Fast Lead Routing', desc: 'Leads are standardized and pushed to SDR systems within 250ms of form completion.' },
        { title: 'Pre-screened Validation', desc: 'Filter out personal domains, spam, and non-target targets before list ingestion.' },
        { title: 'Integrations Included', desc: 'Connects directly to Salesforce or HubSpot without manual CSV imports.' }
      ],
      'abm-marketing': [
        { title: 'Targeted IP Matches', desc: 'Reach target accounts specifically using B2B IP and cookie target lists.' },
        { title: 'Dynamic Account Hubs', desc: 'Serve account-specific experiences that personalize based on visitor domains.' },
        { title: 'Pipeline Account Metrics', desc: 'Measure ad effectiveness across account committees, tracking deal speed lifts.' },
        { title: 'Dedicated ABM Strategy', desc: 'Audience definition and target lists managed by certified ABM leads.' }
      ],
      'marketing-automation': [
        { title: 'Certified Platform Experts', desc: 'Integrations and scoring models deployed by certified HubSpot and Marketo leads.' },
        { title: 'Zero Field Conflicts', desc: 'We guarantee clean sync pathways, avoiding duplicate contacts or overwrites.' },
        { title: 'Dynamic Lead Scoring', desc: 'Establish conversion parameters based on digital interactions and profile fit.' },
        { title: 'Nurturing Automation', desc: 'Save hours of manual follow-up with automated email workflow designs.' }
      ],
      'ai-marketing': [
        { title: 'Secure Model Deployments', desc: 'Data is protected within secure cloud structures to maintain enterprise privacy.' },
        { title: 'Dynamic Segment Rules', desc: 'Users are automatically grouped into high-scoring profiles as digital signals update.' },
        { title: 'Copywriting Quality Audits', desc: 'AI copy variations are pre-screened to align with brand and compliance rules.' },
        { title: 'Optimized Campaign Adjustments', desc: 'Bids adapt dynamically based on pipeline performance insights.' }
      ],
      'data-intelligence': [
        { title: 'Attribution Tracking', desc: 'Map pipeline contract values to campaigns using multi-touch attribution.' },
        { title: 'Profile Unification Core', desc: 'CDP configurations resolve contact matches across disconnected software systems.' },
        { title: 'Secure Cleanrooms', desc: 'Verify campaign lift and overlap values within secure Snowflake data cleanrooms.' },
        { title: 'Optimized Data Hygiene', desc: 'Remove data duplication issues, keeping CRM database records clean.' }
      ],
      'content-syndication': [
        { title: 'Niche Publisher Reach', desc: 'Distribute assets to operational buyers inside selected industry verticals.' },
        { title: 'Lead Qualification Checks', desc: 'Define strict target filters (job titles, employee counts, budgets) for lead delivery.' },
        { title: 'Instant API Route', desc: 'Leads are piped directly to marketing automation tools in real time.' },
        { title: 'A/B Asset Optimization', desc: 'We test variations of assets to lower cost-per-lead.' }
      ],
      'intent-data': [
        { title: 'Real-Time Spikes', desc: 'Alert teams immediately when accounts show buying intent.' },
        { title: 'Intent Customization', desc: 'Filter keywords and resource categories to target relevant buyer intent.' },
        { title: 'SDR Outbound Triggering', desc: 'Automatically assign tasks to sales reps when intent surges.' },
        { title: 'Cross-Source Coverage', desc: 'Combine third-party intent lists with first-party digital signals.' }
      ],
      'b2b-marketing': [
        { title: 'End-to-End Tracking', desc: 'Track performance from first impression down to won pipeline opportunities.' },
        { title: 'Certified Growth Teams', desc: 'Campaign strategies are designed and executed by B2B growth architects.' },
        { title: 'Multi-Channel Personalization', desc: 'Align ad campaigns with custom landing page content and nurture tracks.' },
        { title: 'Attribution Frameworks', desc: 'CMO dashboard reporting models customized for your marketing stack.' }
      ],
      'campaign-management': [
        { title: 'Multi-Channel Bid Control', desc: 'Scale advertising budget efficiently across Google, Meta, and LinkedIn.' },
        { title: 'Conversions API Integration', desc: 'Ensure accurate conversion logging bypassing ad blocker limitations.' },
        { title: 'Continuous A/B Tests', desc: 'Perform tests on variants to improve conversion rates.' },
        { title: 'Detailed Performance Audits', desc: 'Locate and stop underperforming spends to maximize ad budget.' }
      ]
    };
    return whyMap[id] || [
      { title: 'First-Party Compliance Focus', desc: 'All integrations are built privacy-first, avoiding third-party dependency to survive browser cookie depreciation.' },
      { title: 'Dedicated Integration Support', desc: 'Every solution is monitored by an Improx strategy lead with active daily communication channels.' },
      { title: 'Seamless CRM Workflows', desc: 'Data flows are mapped directly to won pipeline opportunity values, not just abstract digital impressions.' },
      { title: 'Optimized Stack Performance', desc: 'We deprecate redundant SaaS tracking tags, improving website performance and user experience.' }
    ];
  };

  const getTechStack = (id) => {
    const techMap = {
      'demand-generation': ['Google Ads', 'LinkedIn Campaign Manager', 'Bombora Intent', 'Vite Optimizer', 'Salesforce'],
      'lead-generation': ['HubSpot', 'Marketo', 'ZeroBounce API', 'Salesforce CRM', 'Cognism data'],
      'abm-marketing': ['6sense', 'Terminus API', 'LinkedIn target lists', 'Salesforce CDP', 'Bombora intent'],
      'marketing-automation': ['HubSpotMAP', 'Marketo Core', 'Pardot Systems', 'Zapier cloud', 'Segment webhook'],
      'ai-marketing': ['OpenAI API', 'Anthropic API', 'Google Cloud ML', 'Segment profiles', 'HubSpot workflow'],
      'data-intelligence': ['Segment CDP', 'Tealium Core', 'Snowflake Cleanroom', 'Google BigQuery', 'Looker Studio'],
      'content-syndication': ['NetLine API', 'Lead-Gen publishing', 'HubSpot integrations', 'Salesforce pipeline'],
      'intent-data': ['Bombora Surge', '6sense intent', 'Salesforce task logs', 'Slack webhook alerts'],
      'b2b-marketing': ['LinkedIn Ads', 'Google Tag Manager', 'HubSpot MAP', 'Salesforce CRM', 'Segment CDP'],
      'campaign-management': ['Google Campaign Mgr', 'Meta Conversions API', 'LinkedIn Tag API', 'Vite optimization', 'Optimizely']
    };
    return techMap[id] || ['HubSpot', 'Salesforce', 'Marketo', 'Segment CDP', 'Google Tag Manager'];
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-slate-400">
        Loading solution details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-martech-primary mb-4">Solution Not Found</h2>
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
      <SEOHelper title={service.title} description={service.tagline} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Back link */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-martech-cyan mb-8 transition-colors bg-transparent border-0 cursor-pointer p-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Solutions</span>
        </button>

        {/* Hero Title Card */}
        <div className="rounded-3xl border border-martech-border bg-gradient-to-br from-martech-navy to-martech-dark p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-martech-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <span className="inline-block rounded-full bg-martech-cyan/10 px-3 py-1 text-[10px] font-black text-martech-cyan border border-martech-cyan/20 uppercase tracking-widest mb-4">
            Solution Spec
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-4 font-display">
            {service.title}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {service.tagline}
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          
          {/* Main Content Column */}
          <div className="space-y-12">
            
            {/* Overview */}
            <div className="rounded-3xl border border-martech-border bg-martech-card p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-martech-primary" />
                Service Capabilities Overview
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Approach */}
            <div className="rounded-3xl border border-martech-border bg-martech-card p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Cpu className="h-5 w-5 text-martech-cyan" />
                How We Solve It (Our Technical Approach)
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {getTechnicalApproach(service.id, service.title)}
              </p>
            </div>

            {/* Key Delivery Milestones */}
            <div className="rounded-3xl border border-martech-border bg-martech-card p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">Key Delivery Milestones & Features</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <ShieldCheck className="h-6 w-6 text-martech-cyan mb-3" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Milestone {idx + 1}</h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{feat}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Phase Deployment */}
            <div className="rounded-3xl border border-martech-border bg-martech-card p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">How We Serve (Our 4-Phase Deployment)</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {getDeploymentPhases(service.id).map((phase, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <span className="text-[10px] text-martech-primary font-mono font-bold uppercase tracking-wider">Phase 0{idx + 1}: {phase.name}</span>
                    <h4 className="text-sm font-bold text-slate-850 mt-1 font-display">{phase.title}</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Us */}
            <div className="rounded-3xl border border-martech-border bg-martech-card p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">Why Choose the Improx Team</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {getWhyUsPoints(service.id).map((point, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-850 font-display">{point.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Integration */}
            <div className="rounded-3xl border border-martech-border bg-martech-card p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <Layers className="h-5 w-5 text-martech-primary" />
                Technology Stack Integrations
              </h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {getTechStack(service.id).map((tech, idx) => (
                  <span key={idx} className="bg-slate-100 border border-martech-border text-slate-700 text-xs px-3 py-1.5 rounded-full font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar / Quick Navigation & Stats */}
          <div className="space-y-8 lg:sticky lg:top-8">
            
            {/* Impact Box */}
            <div className="rounded-2xl border border-martech-border bg-martech-navy p-6 shadow-md">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-600 block mb-2">Projected Impact</span>
              <span className="text-3xl font-black text-martech-cyan block leading-tight">{service.impact}</span>
              <p className="text-xs text-slate-600 mt-3 font-medium">
                Calculated averages from customer audits and implementation milestones.
              </p>
            </div>

            {/* Interactive Solutions Navigation Panel */}
            <div className="rounded-2xl border border-martech-border bg-martech-card p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-3">
                <Activity className="h-4 w-4 text-martech-primary animate-pulse" />
                All Available Solutions
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {allServices.map((item) => {
                  const isActive = item.id === service.id;
                  return (
                    <Link
                      key={item.id}
                      to={`/solutions/${item.id}`}
                      className={`block p-3 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-martech-navy border-martech-primary/50 text-martech-primary shadow-sm'
                          : 'bg-slate-50 border-transparent text-slate-750 hover:bg-slate-100 hover:border-slate-300/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{item.title}</span>
                        {isActive && <div className="h-1.5 w-1.5 rounded-full bg-martech-primary" />}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Click any solution above to instantly inspect its technical approach, phases, and tech stack details.
              </p>
            </div>

            {/* Request spec blueprint */}
            <div className="rounded-2xl border border-martech-border bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-center shadow-md">
              <h3 className="text-base font-bold text-white font-display mb-2">Request Spec Blueprint</h3>
              <p className="text-xs text-slate-400 mb-6 font-medium">
                Receive scope documentation and estimated execution timeline for {service.title}.
              </p>
              <Link 
                to="/contact"
                className="block w-full rounded-xl bg-gradient-to-r from-martech-accent to-martech-primary py-3 text-xs font-black uppercase tracking-wider text-white hover:from-martech-primary hover:to-martech-accent transition-all duration-300 shadow-md shadow-martech-primary/10 hover:shadow-martech-primary/20"
              >
                Get Scope Details
              </Link>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
