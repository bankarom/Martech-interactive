import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { wordpressApi } from '../api/wordpressApi';
import SEOHelper from '../components/SEOHelper';
import ArticleGrid from '../components/ArticleGrid';
import { ArrowLeft, CheckCircle2, BookOpen } from 'lucide-react';

export default function IndustryDetails() {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await wordpressApi.getIndustryById(id);
      if (data) {
        setIndustry(data);
        
        // Filter insights (articles) matching this industry vertical topic
        const allArticles = await wordpressApi.getArticles();
        let topicMatches = [];
        if (id === 'saas' || id === 'tech') {
          topicMatches = allArticles.filter(a => a.category === 'B2B Growth' || a.category === 'Martech' || a.category === 'AI in Marketing');
        } else {
          topicMatches = allArticles.filter(a => a.category === 'Demand Generation' || a.category === 'Lead Generation' || a.category === 'Sales & Revenue');
        }
        setInsights(topicMatches.slice(0, 3));
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="container text-center" style={{ padding: '5rem 0' }}>
        <h2>Industry Vertical Not Found</h2>
        <Link to="/industries" className="btn-secondary">
          <ArrowLeft size={16} /> Back to Industries
        </Link>
      </div>
    );
  }

  return (
    <div className="industry-details-page container animated-fade">
      <SEOHelper title={`${industry.title} Campaigns`} description={industry.desc} />

      <Link to="/" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="detail-layout" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
        <div>
          <header style={{ marginBottom: '2.5rem' }}>
            <span className="badge">Market Verticals</span>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginTop: '1rem', textTransform: 'uppercase' }}>
              {industry.title} Demand Operations
            </h1>
          </header>
          
          <main style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p>{industry.desc}</p>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Campaign Focus</h3>
              <p>We deploy targeted lead enrichment logic, personalized CRM routing systems, and double-opt in syndication methods customized for B2B {industry.title} sectors.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Operational Brackets</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                {['Pipeline acceleration', 'Qualification scoring', 'Programmatic personalization', 'Data governance', 'CRM orchestration', 'Target account expansion'].map((item) => (
                  <div key={item} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '1rem', padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>

        <aside>
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', borderLeft: '3px solid var(--accent-blue)' }}>
            <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Sector Benchmark Target</h3>
            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--accent-blue)', fontFamily: 'var(--font-heading)', margin: '1rem 0' }}>
              {industry.benchmark}
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Guaranteed qualification SLAs managed by B2B integration leads.</p>
          </div>
        </aside>
      </div>

      {insights.length > 0 && (
        <section className="industry-insights" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem', marginBottom: '4rem' }}>
          <div className="section-title-wrapper" style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', textTransform: 'uppercase' }}>Tactical Playbooks for {industry.title}</h2>
            <div className="title-bar-accent"></div>
          </div>
          <ArticleGrid articles={insights} />
        </section>
      )}
    </div>
  );
}
