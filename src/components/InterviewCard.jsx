import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import { ArrowRight, HelpCircle } from 'lucide-react';

export default function InterviewCard({ interview }) {
  if (!interview) return null;

  return (
    <div className="interview-card-module glass-panel animated-fade">
      <div className="portrait-side">
        <LazyImage src={interview.portrait_image} alt={interview.person_name} />
      </div>
      <div className="content-side">
        <span className="badge-cat">{interview.category} &bull; Executive Spotlight</span>
        <h3>Q&A: The Future of Martech Solutions</h3>
        <p className="quote">"{interview.interview_questions_answers?.[0]?.a.substring(0, 120)}..."</p>
        
        <div className="guest-info">
          <p className="name">{interview.person_name}</p>
          <p className="role">{interview.designation}, {interview.company}</p>
        </div>

        <Link to={`/interviews/${interview.id}`} className="btn-secondary flex-btn">
          Read Full Q&A <HelpCircle size={16} />
        </Link>
      </div>

      <style>{`
        .interview-card-module {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          overflow: hidden;
        }

        .portrait-side {
          min-height: 300px;
        }

        .content-side {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
        }

        .badge-cat {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-pink);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .content-side h3 {
          font-size: 1.75rem;
          line-height: 1.2;
        }

        .quote {
          font-style: italic;
          color: var(--text-secondary);
          border-left: 2px solid var(--accent-pink);
          padding-left: 1rem;
          line-height: 1.5;
        }

        .guest-info {
          margin-bottom: 0.5rem;
        }

        .guest-info .name {
          font-weight: 700;
          color: var(--text-primary);
        }

        .guest-info .role {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .flex-btn {
          align-self: flex-start;
        }

        @media (max-width: 768px) {
          .interview-card-module {
            grid-template-columns: 1fr;
          }
          .portrait-side {
            min-height: 250px;
          }
          .content-side {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
