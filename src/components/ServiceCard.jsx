import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Cpu, Database, Award, ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  if (!service) return null;

  const getIcon = (title) => {
    const text = title.toLowerCase();
    if (text.includes('abm') || text.includes('account')) return <Target size={24} />;
    if (text.includes('automation') || text.includes('stack')) return <Cpu size={24} />;
    if (text.includes('syndication') || text.includes('lead')) return <Database size={24} />;
    return <Award size={24} />;
  };

  return (
    <div className="service-card glass-panel animated-fade">
      <div className="service-icon-box">
        {getIcon(service.service_name || service.title)}
      </div>
      <h3>{service.service_name || service.title}</h3>
      <p>{service.description}</p>
      
      {service.benefits && service.benefits.length > 0 && (
        <ul className="service-benefit-list">
          {service.benefits.slice(0, 2).map((b, idx) => (
            <li key={idx}>&bull; {b}</li>
          ))}
        </ul>
      )}

      <Link to={`/services/${service.id}`} className="service-link">
        {service.cta_text || 'Learn Strategy'} <ArrowRight size={16} />
      </Link>

      <style>{`
        .service-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
        }

        .service-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-blue);
        }

        .service-card h3 {
          font-size: 1.35rem;
          line-height: 1.3;
        }

        .service-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .service-benefit-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .service-link {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-blue);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .service-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
