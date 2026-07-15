import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { ArrowLeft, Target, Cpu, Database, Award, CheckCircle } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inquired, setInquired] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await CMSService.getServiceById(id);
      setService(data);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquired(true);
  };

  const getServiceIcon = (name) => {
    switch (name) {
      case 'Target': return <Target size={32} />;
      case 'Cpu': return <Cpu size={32} />;
      case 'Database': return <Database size={32} />;
      default: return <Award size={32} />;
    }
  };

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
    return [
      { name: 'Audit', title: 'Operational Evaluation', desc: 'We audit tracking scripts, schema properties, and historical integration records to locate data leakages and attribution mismatches.' },
      { name: 'Strategy', title: 'Workflow Blueprint', desc: 'Design customized data routing paths, compliance opt-in flows, and target criteria mapped to your ideal customer profile.' },
      { name: 'Integration', title: 'System Configuration', desc: 'Configure APIs, tracking pixels, intent signals, and platform webhooks under strict privacy regulations.' },
      { name: 'Optimization', title: 'Performance Scale', desc: 'Launch real-time performance dashboards, analyze attribution metrics weekly, and optimize programmatic bids to scale ROI.' }
    ];
  };

  const getWhyUsPoints = (id) => {
    return [
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
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container error-container text-center">
        <h2>Service Not Found</h2>
        <Link to="/services" className="btn-secondary">
          <ArrowLeft size={16} /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="service-detail container animated-fade">
      <SEOHelper 
        title={`${service.title} - Campaign Strategy`} 
        description={service.shortDescription}
      />

      <Link to="/services" className="back-link">
        <ArrowLeft size={16} /> Back to All Services
      </Link>

      <div className="detail-layout">
        <div className="content-col">
          <div className="detail-header">
            <div className="icon-badge">
              {getServiceIcon(service.iconName)}
            </div>
            <h1>{service.title}</h1>
            <p className="tagline">{service.tagline}</p>
          </div>

          <div className="detail-body">
            <div className="detail-section">
              <h3>Campaign Strategy Overview</h3>
              <p className="description-text">{service.description}</p>
            </div>

            <div className="detail-section" style={{ marginTop: '2.5rem' }}>
              <h3>How We Solve It (Our Technical Approach)</h3>
              <p className="description-text">{getTechnicalApproach(service.id, service.title)}</p>
            </div>

            <div className="detail-section" style={{ marginTop: '2.5rem' }}>
              <h3>How We Serve (Our 4-Phase Deployment)</h3>
              <div className="deployment-phases-grid">
                {getDeploymentPhases(service.id).map((phase, idx) => (
                  <div key={idx} className="phase-card-detail">
                    <span className="phase-badge-detail">Phase 0{idx + 1}: {phase.name}</span>
                    <h4>{phase.title}</h4>
                    <p>{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section" style={{ marginTop: '2.5rem' }}>
              <h3>Why Choose the Improx Team</h3>
              <div className="why-us-grid-detail">
                {getWhyUsPoints(service.id).map((point, idx) => (
                  <div key={idx} className="why-us-item-detail">
                    <CheckCircle size={18} className="check-icon-detail" />
                    <div>
                      <h4>{point.title}</h4>
                      <p>{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section" style={{ marginTop: '2.5rem' }}>
              <h3>Core Technology Ecosystem Integrations</h3>
              <div className="tech-pills-detail">
                {getTechStack(service.id).map((tech, idx) => (
                  <span key={idx} className="tech-pill-detail">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-col">
          <div className="stats-box glass-panel">
            <h4>Target Target Impact</h4>
            <div className="metric-large">{service.impact}</div>
            <p>Guaranteed operational efficiency objectives monitored weekly by our dedicated integration lead.</p>
          </div>

          <div className="lead-capture-box glass-panel">
            {!inquired ? (
              <>
                <h4>Schedule Operational Audit</h4>
                <p>Learn how {service.title} can optimize your direct sales & marketing pipeline.</p>
                <form onSubmit={handleInquirySubmit}>
                  <input type="text" required placeholder="Full Name" />
                  <input type="email" required placeholder="Work Email" />
                  <input type="text" required placeholder="Company Name" />
                  <button type="submit" className="btn-primary w-full">Request Consult</button>
                </form>
              </>
            ) : (
              <div className="inquiry-success text-center">
                <CheckCircle size={40} className="success-icon" />
                <h4>Audit Request Received</h4>
                <p>An Improx integration consultant will reach out to schedule your data review session.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 3rem;
        }

        .back-link:hover {
          color: var(--text-primary);
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 5rem;
        }

        .detail-header {
          margin-bottom: 3rem;
        }

        .detail-header h1 {
          font-size: 2.75rem;
          margin: 1.5rem 0 0.5rem 0;
        }

        .detail-header .tagline {
          font-size: 1.25rem;
          font-family: var(--font-heading);
          color: var(--accent-blue);
          font-weight: 600;
        }

        .detail-body h3 {
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .detail-body p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .methodology-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .methodology-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 1.05rem;
          color: var(--text-secondary);
        }

        .check-icon {
          color: var(--accent-blue);
          margin-top: 0.2rem;
        }

        .stats-box {
          padding: 2.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .stats-box h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .metric-large {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .stats-box p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .lead-capture-box {
          padding: 2.5rem;
        }

        .lead-capture-box h4 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .lead-capture-box p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .lead-capture-box form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .lead-capture-box input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          outline: none;
        }

        .lead-capture-box input:focus {
          border-color: var(--accent-blue);
        }

        .w-full {
          width: 100%;
          justify-content: center;
        }

        .success-icon {
          color: var(--accent-green);
          margin-bottom: 1rem;
        }

        .deployment-phases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .phase-card-detail {
          background: rgba(15, 20, 38, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .phase-card-detail h4 {
          font-size: 1.1rem;
          margin: 0.5rem 0;
          color: var(--text-primary);
        }

        .phase-card-detail p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .phase-badge-detail {
          font-size: 0.75rem;
          color: var(--accent-blue);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .why-us-grid-detail {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .why-us-item-detail {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .why-us-item-detail h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .why-us-item-detail p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-top: 0.25rem;
        }

        .check-icon-detail {
          color: #10b981;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        .tech-pills-detail {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .tech-pill-detail {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          font-family: monospace;
          font-size: 0.8rem;
          padding: 0.35rem 0.85rem;
          border-radius: 99px;
        }

        @media (max-width: 992px) {
          .detail-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
      `}</style>
    </div>
  );
}
