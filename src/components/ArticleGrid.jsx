import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function ArticleGrid({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="article-grid">
      {articles.map((art) => (
        <article key={art.id} className="article-card glass-panel animated-fade">
          <div className="card-image-box">
            <LazyImage src={art.featured_image} alt={art.title} />
            <span className="card-category">{art.category}</span>
          </div>
          
          <div className="card-body">
            <div className="card-meta">
              <span className="meta-item"><Calendar size={14} /> {art.publish_date}</span>
            </div>
            <h3 className="card-title">
              <Link to={`/articles/${art.slug || art.id}`}>{art.title}</Link>
            </h3>
            <p className="card-desc">{(art.excerpt || art.content_blocks?.[0]?.content || '').replace(/<[^>]*>/g, '').substring(0, 120) + '...'}</p>
            
            <div className="card-footer">
              <div className="author-box">
                <img src={art.author.avatar} alt={art.author.name} />
                <span>{art.author.name}</span>
              </div>
              <Link to={`/articles/${art.slug || art.id}`} className="read-link">
                Read <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>
      ))}

      <style>{`
        .article-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .article-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
        }

        .card-image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
        }

        .card-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(9, 13, 22, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          z-index: 2;
        }

        .card-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 0.75rem;
        }

        .card-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .card-title {
          font-size: 1.25rem;
          line-height: 1.3;
          font-weight: 700;
        }

        .card-title a:hover {
          color: var(--accent-blue);
        }

        .card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 1.25rem;
        }

        .author-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .author-box img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }

        .read-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-blue);
        }

        .read-link:hover {
          color: var(--text-primary);
        }

        @media (max-width: 576px) {
          .article-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
