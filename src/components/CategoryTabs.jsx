import React from 'react';

export default function CategoryTabs({ categories, selected, onChange }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="filter-tabs-container">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          onClick={() => onChange(cat)}
          className={`filter-tab ${selected === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
      <style>{`
        .filter-tabs-container {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .filter-tab {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.6rem 1.25rem;
          border-radius: 9999px;
          cursor: pointer;
          font-weight: 500;
          transition: var(--transition-smooth);
        }

        .filter-tab:hover, .filter-tab.active {
          background: var(--accent-blue);
          color: white;
          border-color: var(--accent-blue);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}
