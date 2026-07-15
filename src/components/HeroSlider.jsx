import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Calendar } from 'lucide-react';

export default function HeroSlider({ articles }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto transition every 5 seconds
  useEffect(() => {
    if (!articles || articles.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [articles]);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="mtc-hero-container">
      {/* Dynamic Background Layers for Smooth Fades */}
      {articles.map((art, idx) => (
        <div
          key={art.slug}
          className={`hero-bg-layer ${activeIndex === idx ? 'active' : ''}`}
          style={{ backgroundImage: `url(${art.featuredImage})` }}
        />
      ))}
      <div className="hero-dark-overlay"></div>

      {/* Columns Container */}
      <div className="hero-columns">
        {articles.map((art, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={art.slug}
              className={`hero-column ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <div className="column-inner">
                <span className="badge-tag">{art.category}</span>
                <h2 className="column-title">
                  <Link to={`/article/${art.slug}`}>
                    {art.title}
                  </Link>
                </h2>
                
                <div className="column-meta">
                  <span className="publisher">BY {art.author?.name?.toUpperCase() || 'IMPROX TEAM'}</span>
                  <span className="date">{art.date}</span>
                </div>

                <div className="column-expanded-content">
                  <p className="excerpt">
                    {art.excerpt}
                  </p>
                  <Link to={`/article/${art.slug}`} className="read-more-btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#fff' }}>
                    Read Story <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .mtc-hero-container {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          height: 600px;
          overflow: hidden;
          background-color: #020306;
          border-bottom: 1px solid var(--martech-border);
        }

        @keyframes kenBurns {
          0% {
            transform: scale(1.02) translate(0, 0);
          }
          50% {
            transform: scale(1.08) translate(0.5%, 0.5%);
          }
          100% {
            transform: scale(1.02) translate(0, 0);
          }
        }

        .hero-bg-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 1;
        }

        .hero-bg-layer.active {
          opacity: 0.6;
          animation: kenBurns 24s ease-in-out infinite;
        }

        .hero-dark-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(5, 7, 15, 0.2) 0%, rgba(2, 3, 6, 0.9) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .hero-columns {
          position: relative;
          z-index: 3;
          display: flex;
          height: 100%;
          width: 100%;
        }

        .hero-column {
          flex: 1;
          height: 100%;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          transition: flex 0.8s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s ease;
          cursor: pointer;
          display: flex;
          align-items: flex-end;
          padding: 2.5rem;
        }

        .hero-column:last-child {
          border-right: none;
        }

        .hero-column.active {
          flex: 2.8;
          background: rgba(5, 7, 15, 0.35);
          backdrop-filter: blur(6px);
        }

        .column-inner {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .badge-tag {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          align-self: flex-start;
          padding: 0.25rem 0.5rem;
          background: linear-gradient(135deg, var(--martech-accent) 0%, var(--martech-primary) 100%);
          border-radius: 6px;
        }

        .column-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.3;
          color: #fff;
          transition: font-size 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
        }

        .hero-column.active .column-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: #fff;
        }

        .column-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .column-expanded-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(12px);
          transition: max-height 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hero-column.active .column-expanded-content {
          max-height: 180px;
          opacity: 1;
          transform: translateY(0);
        }

        .excerpt {
          color: #cbd5e1;
          font-size: 0.88rem;
          line-height: 1.55;
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          align-self: flex-start;
        }

        @media (max-width: 992px) {
          .hero-columns {
            flex-direction: column;
          }
          .mtc-hero-container {
            height: auto;
          }
          .hero-column {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            padding: 1.5rem;
          }
          .hero-column.active {
            flex: none;
          }
        }
      `}</style>
    </div>
  );
}
