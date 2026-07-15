import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="cta-section container section">
      <div className="cta-wrapper glass-panel">
        <div className="cta-content">
          <span className="badge">Pipeline Strategy</span>
          <h2>Optimize Your Marketing Operations Stack</h2>
          <p>Get a comprehensive, data-backed assessment of your target account scoring rules, CRM integrations, and compliance configurations.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              Book Blueprint Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn-secondary">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .cta-wrapper {
          padding: 4.5rem;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(236, 72, 153, 0.03) 100%);
          border-color: rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-content {
          max-width: 750px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
        }

        .cta-content p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 1.25rem;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .cta-wrapper {
            padding: 2.5rem;
          }
          .cta-content h2 {
            font-size: 1.85rem;
          }
          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }
          .cta-buttons a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
