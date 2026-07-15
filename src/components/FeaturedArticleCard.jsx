import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import { ArrowRight } from 'lucide-react';

export default function FeaturedArticleCard({ article }) {
  if (!article) return null;

  return (
    <div className="featured-article-card glass-panel animated-fade">
      <div className="card-image-col">
        <LazyImage src={article.featured_image} alt={article.title} />
        <span className="featured-badge">Featured Analysis</span>
      </div>
      <div className="card-content-col">
        <span className="badge-tag">{article.category}</span>
        <h2>{article.title}</h2>
        <p className="excerpt">{article.excerpt || (article.content_blocks?.[0]?.content || '').replace(/<[^>]*>/g, '').substring(0, 160) + '...'}</p>
        
        <div className="meta-footer">
          <div className="author">
            {article.author && (
              <>
                <img src={article.author.avatar} alt={article.author.name} className="avatar" />
                <div>
                  <p className="name">{article.author.name}</p>
                  <p className="role">{article.author.designation}</p>
                </div>
              </>
            )}
          </div>
          <Link to={`/articles/${article.slug || article.id}`} className="btn-primary">
            Read Insights <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        .featured-article-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          overflow: hidden;
          margin-bottom: 4rem;
        }

        .card-image-col {
          position: relative;
          min-height: 350px;
        }

        .featured-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: var(--accent-gold);
          color: #000;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.85rem;
          border-radius: 4px;
          z-index: 2;
        }

        .card-content-col {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.25rem;
        }

        .badge-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-blue);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .card-content-col h2 {
          font-size: 2.25rem;
          line-height: 1.2;
        }

        .excerpt {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .meta-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          margin-top: 1rem;
        }

        .author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .author .name {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .author .role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .featured-article-card {
            grid-template-columns: 1fr;
          }
          .card-image-col {
            min-height: 250px;
          }
          .card-content-col {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
