import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { ArrowLeft, Clock, Eye, Calendar, User } from 'lucide-react';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await CMSService.getArticleById(id);
      setArticle(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container"><div className="spinner"></div></div>
    );
  }

  if (!article) {
    return (
      <div className="container error-container text-center">
        <h2>Article Not Found</h2>
        <Link to="/articles" className="btn-secondary">
          <ArrowLeft size={16} /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <article className="article-detail container animated-fade">
      <SEOHelper 
        title={article.title} 
        description={article.excerpt}
      />

      <Link to="/articles" className="back-link">
        <ArrowLeft size={16} /> Back to Insights
      </Link>

      <header className="article-header">
        <span className="badge">{article.category}</span>
        <h1>{article.title}</h1>
        
        <div className="article-meta-row">
          <div className="author-meta">
            {article.author.avatar && <img src={article.author.avatar} alt={article.author.name} />}
            <div>
              <p className="name">{article.author.name}</p>
              <p className="role">{article.author.role || 'Contributor'}</p>
            </div>
          </div>

          <div className="editorial-stats">
            <span className="stat-item">
              <Calendar size={16} /> {article.date}
            </span>
            <span className="stat-item">
              <Clock size={16} /> {article.readTime}
            </span>
            {article.views && (
              <span className="stat-item">
                <Eye size={16} /> {article.views} views
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="featured-image-container">
        <img src={article.featuredImage} alt={article.title} className="detail-featured-img" />
      </div>

      <div className="article-body-wrapper">
        <div 
          className="article-content" 
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        <aside className="article-author-card glass-panel">
          <h3>Written By</h3>
          <div className="author-card-content">
            {article.author.avatar && <img src={article.author.avatar} alt={article.author.name} />}
            <h4>{article.author.name}</h4>
            <p className="role">{article.author.role || 'Strategy Specialist'}</p>
            <p className="bio">Alex and the Improx solutions team analyze B2B pipeline conversion anomalies and Martech integration methodologies weekly.</p>
          </div>
        </aside>
      </div>

      <style>{`
        .article-detail {
          max-width: 1000px;
        }

        .article-header {
          margin: 2rem 0 3rem 0;
        }

        .article-header h1 {
          font-size: 3.25rem;
          line-height: 1.15;
          margin: 1.5rem 0;
          font-weight: 800;
        }

        .article-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-top: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .author-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .author-meta img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }

        .author-meta .name {
          font-weight: 700;
        }

        .author-meta .role {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .editorial-stats {
          display: flex;
          gap: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .featured-image-container {
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 4rem;
          border: 1px solid var(--border-color);
          aspect-ratio: 21/9;
        }

        .detail-featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .article-body-wrapper {
          display: grid;
          grid-template-columns: 2.5fr 1fr;
          gap: 4rem;
        }

        .article-content {
          font-size: 1.25rem;
          line-height: 1.9;
          color: rgba(248, 250, 252, 0.95);
        }

        .article-content p {
          margin-bottom: 1.75rem;
        }

        .article-content h3 {
          font-size: 1.6rem;
          margin: 2.5rem 0 1.25rem 0;
          color: var(--text-primary);
        }

        .article-author-card {
          padding: 2rem;
          align-self: flex-start;
        }

        .article-author-card h3 {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        .author-card-content {
          text-align: center;
        }

        .author-card-content img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-bottom: 1rem;
          object-fit: cover;
        }

        .author-card-content h4 {
          font-size: 1.15rem;
          margin-bottom: 0.25rem;
        }

        .author-card-content .role {
          font-size: 0.85rem;
          color: var(--accent-blue);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .author-card-content .bio {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .article-body-wrapper {
            grid-template-columns: 1fr;
          }
          .article-header h1 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </article>
  );
}
