import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';
import { ArrowLeft, User, HelpCircle, MessageSquare } from 'lucide-react';

export default function InterviewDetail() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await CMSService.getInterviewById(id);
      setInterview(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container"><div className="spinner"></div></div>
    );
  }

  if (!interview) {
    return (
      <div className="container error-container text-center">
        <h2>Interview Not Found</h2>
        <Link to="/articles" className="btn-secondary">
          <ArrowLeft size={16} /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="interview-detail container animated-fade">
      <SEOHelper 
        title={interview.title} 
        description={interview.excerpt}
      />

      <Link to="/articles" className="back-link">
        <ArrowLeft size={16} /> Back to Insights
      </Link>

      <header className="interview-header">
        <span className="badge badge-interview">Expert Q&A Session</span>
        <h1>{interview.title}</h1>
        <p className="interview-excerpt">{interview.excerpt}</p>
      </header>

      {/* Guest Profile Grid */}
      <section className="guest-profile-card glass-panel">
        <div className="photo-panel">
          <img src={interview.guest.photo} alt={interview.guest.name} />
        </div>
        <div className="info-panel">
          <h3>Featured Guest</h3>
          <h2>{interview.guest.name}</h2>
          <p className="title">{interview.guest.title} &bull; {interview.guest.company}</p>
          <div className="meta-info">
            <span><strong>Conducted by:</strong> {interview.interviewer}</span>
            <span><strong>Published:</strong> {interview.date}</span>
          </div>
        </div>
      </section>

      {/* Q&A Script Panel */}
      <main className="qa-script-panel">
        <h3>Interview Transcript</h3>
        <div className="qa-list">
          {interview.qas.map((qa, index) => (
            <div key={index} className="qa-block">
              <div className="question-bubble glass-panel">
                <HelpCircle className="qa-icon-q" size={20} />
                <p><strong>Q: </strong> {qa.q}</p>
              </div>
              <div className="answer-bubble">
                <MessageSquare className="qa-icon-a" size={20} />
                <p><strong>{interview.guest.name}: </strong> {qa.a}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        .interview-detail {
          max-width: 900px;
        }

        .interview-header {
          margin: 2rem 0 3rem 0;
        }

        .interview-header h1 {
          font-size: 3rem;
          margin: 1.5rem 0 1rem 0;
          font-weight: 800;
        }

        .interview-excerpt {
          font-size: 1.15rem;
          color: var(--text-secondary);
        }

        .guest-profile-card {
          display: grid;
          grid-template-columns: 1fr 2fr;
          overflow: hidden;
          margin-bottom: 4rem;
        }

        .photo-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          max-height: 250px;
        }

        .info-panel {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .info-panel h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          color: var(--accent-pink);
          margin-bottom: 0.5rem;
        }

        .info-panel h2 {
          font-size: 1.75rem;
          margin-bottom: 0.25rem;
        }

        .info-panel .title {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .meta-info {
          display: flex;
          gap: 2rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .qa-script-panel h3 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .qa-list {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .qa-block {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .question-bubble {
          display: flex;
          gap: 1rem;
          padding: 1.5rem 2rem;
          background: rgba(59, 130, 246, 0.05);
          border-color: rgba(59, 130, 246, 0.2);
          border-radius: 12px;
        }

        .qa-icon-q {
          color: var(--accent-blue);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .answer-bubble {
          display: flex;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-left: 2px solid var(--accent-pink);
          background: rgba(255, 255, 255, 0.01);
        }

        .qa-icon-a {
          color: var(--accent-pink);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .question-bubble p, .answer-bubble p {
          font-size: 1.05rem;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .guest-profile-card {
            grid-template-columns: 1fr;
          }
          .photo-panel img {
            max-height: 300px;
          }
          .info-panel {
            padding: 1.5rem;
          }
          .meta-info {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
