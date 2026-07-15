import React from 'react';

export default function SkeletonLoader({ type = 'card' }) {
  if (type === 'hero') {
    return (
      <div className="skeleton-wrapper skeleton-hero glass-panel">
        <div className="skeleton-block skeleton-badge"></div>
        <div className="skeleton-block skeleton-title"></div>
        <div className="skeleton-block skeleton-text"></div>
        <div className="skeleton-block skeleton-button"></div>
        <style>{`
          .skeleton-wrapper {
            background: rgba(15, 22, 38, 0.4);
            border: 1px solid var(--border-color);
            padding: 4rem;
            border-radius: 24px;
            min-height: 520px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            gap: 1.5rem;
            position: relative;
            overflow: hidden;
          }
          .skeleton-wrapper::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            background-image: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.05) 20%,
              rgba(255, 255, 255, 0.1) 60%,
              rgba(255, 255, 255, 0) 100%
            );
            animation: shimmer 2s infinite;
          }
          .skeleton-block {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
          }
          .skeleton-badge { width: 100px; height: 20px; }
          .skeleton-title { width: 80%; height: 40px; }
          .skeleton-text { width: 60%; height: 20px; }
          .skeleton-button { width: 150px; height: 45px; border-radius: 9999px; }
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="skeleton-wrapper skeleton-card glass-panel">
      <div className="skeleton-image"></div>
      <div className="skeleton-body">
        <div className="skeleton-block skeleton-meta"></div>
        <div className="skeleton-block skeleton-title-s"></div>
        <div className="skeleton-block skeleton-desc"></div>
      </div>
      <style>{`
        .skeleton-card {
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          height: 100%;
          gap: 1rem;
          padding: 1.5rem;
          position: relative;
        }
        .skeleton-card::after {
          content: "";
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 20%,
            rgba(255, 255, 255, 0.1) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 2s infinite;
        }
        .skeleton-image {
          width: 100%;
          aspect-ratio: 16/9;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }
        .skeleton-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .skeleton-block {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .skeleton-meta { width: 30%; height: 14px; }
        .skeleton-title-s { width: 90%; height: 20px; }
        .skeleton-desc { width: 70%; height: 14px; }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
