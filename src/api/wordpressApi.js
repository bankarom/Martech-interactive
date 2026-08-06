// Headless WordPress API Client Layer
// Dynamically toggles between local MOCK REST JSON and active WordPress REST endpoints.
// Later replacement with WordPress REST API requires only setting VITE_WP_API_URL in .env file.

import { MOCK_DATABASE } from '../services/mockDb';

const WP_API_BASE = import.meta.env.VITE_WP_API_URL || '';

// Mock Local Database Store
const LOCAL_JSON_DB = {
  posts: [
    {
      id: 101, slug: 'trustedsite-shopify', title: 'TrustedSite Trust Badge App Gains Built for Shopify Status',
      category: 'Audience/Marketing Data & Data Enhancement', categorySlug: 'data-management',
      author_name: 'BUSINESSWIRE', author_avatar: 'https://ui-avatars.com/api/?name=BW&background=0D8ABC&color=fff',
      date: '2026-07-30T10:00:00', read_time: '4 min read',
      featured_media_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>TrustedSite secures its position...</p>' }, content: { rendered: '<p>Full content</p>' }
    },
    {
      id: 102, slug: 'pattern-ai-native', title: 'Pattern Brings AI-Native Ads to Global Brands',
      category: 'Ecommerce', categorySlug: 'content-experience',
      author_name: 'BUSINESSWIRE', author_avatar: 'https://ui-avatars.com/api/?name=BW&background=0D8ABC&color=fff',
      date: '2026-07-30T09:00:00', read_time: '5 min read',
      featured_media_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>Pattern integrates generative AI...</p>' }, content: { rendered: '<p>Full content</p>' }
    },
    {
      id: 103, slug: 'freewheel-debuts-series', title: 'FreeWheel Debuts Series-Level Reporting Powered by Direct Publisher Insights',
      category: 'Adtech', categorySlug: 'advertising-promotion',
      author_name: 'BUSINESSWIRE', author_avatar: 'https://ui-avatars.com/api/?name=BW&background=0D8ABC&color=fff',
      date: '2026-07-30T08:00:00', read_time: '6 min read',
      featured_media_url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>FreeWheel launches new reporting...</p>' }, content: { rendered: '<p>Full content</p>' }
    },
    {
      id: 104, slug: 'global-study-ai-content', title: 'Global Study: Poor AI Content Erodes Brand Trust',
      category: 'Adtech', categorySlug: 'advertising-promotion',
      author_name: 'GLOBENEWSWIRE', author_avatar: 'https://ui-avatars.com/api/?name=GN&background=10B981&color=fff',
      date: '2026-07-30T07:00:00', read_time: '7 min read',
      featured_media_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>Consumers are rejecting lazy AI content...</p>' }, content: { rendered: '<p>Full content</p>' }
    },
    ...MOCK_DATABASE.articles
  ],
  categories: [
    { id: 1, name: 'Advertising & Promotion', slug: 'advertising-promotion' },
    { id: 2, name: 'Management', slug: 'management' },
    { id: 3, name: 'Content & Experience', slug: 'content-experience' },
    { id: 4, name: 'Data Management', slug: 'data-management' },
    { id: 5, name: 'Social & Relationships', slug: 'social-relationships' }
  ],
  authors: [
    { id: 1, name: 'Alex Mercer', role: 'Director of MarTech Strategy', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Elena Rostova', role: 'Ad Tech Architect', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'Marcus Vance', role: 'Integration Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }
  ],
  interviews: MOCK_DATABASE.interviews,
  caseStudies: MOCK_DATABASE.caseStudies,
  research: MOCK_DATABASE.reports,
  solutions: [
    { id: 'demand-generation', title: 'Demand Generation', tagline: 'Orchestrating high-intent top-of-funnel acquisition pathways.', impact: '2.4x Average pipeline value acceleration' },
    { id: 'lead-generation', title: 'Lead Generation', tagline: 'High-fidelity verified B2B lead acquisition.', impact: '18% Direct meeting book rate conversion' },
    { id: 'abm-marketing', title: 'ABM Marketing', tagline: 'Account-Based Marketing targeting buying committees.', impact: '210% Average deal size increase' },
    { id: 'marketing-automation', title: 'Marketing Automation', tagline: 'Streamlining workflows in HubSpot, Marketo, and Pardot.', impact: '32% Decrease in data duplication rate' },
    { id: 'ai-marketing', title: 'AI Marketing', tagline: 'Integrating predictive analytical co-pilots.', impact: '4.2x Faster personalization assembly' },
    { id: 'data-intelligence', title: 'Data Intelligence', tagline: 'First-party customer profile unification.', impact: '100% Attribution visibility' },
    { id: 'content-syndication', title: 'Content Syndication', tagline: 'Accelerating download reach for digital playbooks.', impact: '15%+ Conversion rate to SQLs' },
    { id: 'intent-data', title: 'Intent Data', tagline: 'Real-time B2B buyer intent ingestion.', impact: '35 Day reduction in sales cycle length' },
    { id: 'b2b-marketing', title: 'B2B Marketing', tagline: 'Enterprise demand generation blueprints.', impact: '40% Higher marketing contribution' },
    { id: 'campaign-management', title: 'Campaign Management', tagline: 'Operational orchestrations for multi-channel programs.', impact: '28% Average reduction in CPA' }
  ],
  podcasts: [
    {
      id: 201, slug: 'fredrik-skantze-funnel', title: 'Fredrik Skantze - Chief Executive Officer',
      company: 'FUNNEL', author_name: 'MTC', date: '2026-07-30T10:00:00',
      featured_media_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', // headshot
      excerpt: { rendered: '<p>Listen to the Champion</p>' }, content: { rendered: '<p>Podcast details...</p>' }
    },
    {
      id: 202, slug: 'karen-kaukol-entrust', title: 'Karen Kaukol - Chief Marketing Officer',
      company: 'ENTRUST', author_name: 'MTC', date: '2026-07-30T09:00:00',
      featured_media_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>Listen to the Champion</p>' }, content: { rendered: '<p>Podcast details...</p>' }
    }
  ],
  infographics: [],
  guestArticles: [
    {
      id: 301, slug: 'data-readiness-myth', title: 'The Data Readiness Myth Is Holding Back AI Adoption',
      author_name: 'SANDEEP MENON', date: '2026-07-29T10:00:00',
      featured_media_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>Why waiting for perfect data is failing.</p>' }, content: { rendered: '<p>Full article...</p>' }
    },
    {
      id: 302, slug: 'b2b-brands-agencies', title: 'Why B2B Brands Must Start Thinking Like Agencies to Win on Customer Experience',
      author_name: 'TED MCNULTY', date: '2026-07-22T10:00:00',
      featured_media_url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>Customer experience is the new battleground.</p>' }, content: { rendered: '<p>Full article...</p>' }
    },
    {
      id: 303, slug: 'ai-appreciation-day', title: 'AI Appreciation Day 2026: Celebrating Marketing Innovation',
      author_name: 'MTC BLOGS', date: '2026-07-16T10:00:00',
      featured_media_url: 'https://images.unsplash.com/photo-1531297172867-4f40f3531bcf?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>How far we have come.</p>' }, content: { rendered: '<p>Full article...</p>' }
    }
  ],
  whitepapers: [ // Using whitepapers or research for in-house articles
    {
      id: 401, slug: 'technical-upskilling', title: 'Why Technical Upskilling Is Key for Success in Complex Sales Cycles',
      author_name: 'MTC NEWS DESK', date: '2026-07-29T10:00:00',
      featured_media_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>Upskilling sales teams.</p>' }, content: { rendered: '<p>Full article...</p>' }
    },
    {
      id: 402, slug: 'auditing-hidden-stack', title: 'How MarTech Leaders are Auditing Hidden Stack Waste?',
      author_name: 'MTC NEWS DESK', date: '2026-07-27T10:00:00',
      featured_media_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>Finding the waste.</p>' }, content: { rendered: '<p>Full article...</p>' }
    },
    {
      id: 403, slug: 'effective-ai-native', title: 'Three Keys to Effective AI-Native Advertising Campaigns',
      author_name: 'MTC NEWS DESK', date: '2026-07-24T10:00:00',
      featured_media_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      excerpt: { rendered: '<p>Effective AI ads.</p>' }, content: { rendered: '<p>Full article...</p>' }
    }
  ]
};

// Generic request dispatcher
async function requestWpApi(endpoint, localFallbackData) {
  if (WP_API_BASE) {
    try {
      const response = await fetch(`${WP_API_BASE}/wp-json/wp/v2/${endpoint}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(`Headless WordPress fetch failed at endpoint /${endpoint}, loading local JSON registry.`, error);
    }
  }
  // Return local JSON mapping mock datasets
  return localFallbackData;
}

export const wordpressApi = {
  // GET /posts
  getPosts: async (categorySlug = null) => {
    const list = await requestWpApi('posts', LOCAL_JSON_DB.posts);
    if (categorySlug) {
      return list.filter(
        post => post.categorySlug === categorySlug || post.subcategorySlug === categorySlug
      );
    }
    return list;
  },

  // GET /posts/:slug
  getPostBySlug: async (slug) => {
    const list = await requestWpApi('posts', LOCAL_JSON_DB.posts);
    return list.find(post => post.slug === slug);
  },

  // GET /categories
  getCategories: async () => {
    return await requestWpApi('categories', LOCAL_JSON_DB.categories);
  },

  // GET /authors
  getAuthors: async () => {
    return await requestWpApi('authors', LOCAL_JSON_DB.authors);
  },

  // GET /interviews
  getInterviews: async () => {
    return await requestWpApi('interviews', LOCAL_JSON_DB.interviews);
  },
  
  getInterviewById: async (id) => {
    const list = await requestWpApi('interviews', LOCAL_JSON_DB.interviews);
    return list.find(item => item.id.toString() === id.toString());
  },

  // GET /case-studies
  getCaseStudies: async () => {
    return await requestWpApi('case-studies', LOCAL_JSON_DB.caseStudies);
  },
  
  getCaseStudyById: async (id) => {
    const list = await requestWpApi('case-studies', LOCAL_JSON_DB.caseStudies);
    return list.find(item => item.id.toString() === id.toString());
  },

  // GET /research
  getResearch: async () => {
    return await requestWpApi('research', LOCAL_JSON_DB.research);
  },
  
  getResearchById: async (id) => {
    const list = await requestWpApi('research', LOCAL_JSON_DB.research);
    return list.find(item => item.id.toString() === id.toString());
  },

  // GET /solutions
  getSolutions: async () => {
    return await requestWpApi('solution', LOCAL_JSON_DB.solutions);
  },
  
  getSolutionById: async (id) => {
    const list = await requestWpApi('solution', LOCAL_JSON_DB.solutions);
    return list.find(item => item.id.toString() === id.toString());
  },

  // GET /podcasts
  getPodcasts: async () => {
    return await requestWpApi('podcast', LOCAL_JSON_DB.podcasts);
  },

  // GET /infographics
  getInfographics: async () => {
    return await requestWpApi('infographic', LOCAL_JSON_DB.infographics);
  },

  // GET /guest-articles
  getGuestArticles: async () => {
    return await requestWpApi('guest_article', LOCAL_JSON_DB.guestArticles);
  },

  // GET /whitepapers
  getWhitepapers: async () => {
    return await requestWpApi('whitepaper', LOCAL_JSON_DB.whitepapers);
  },

  // POST /leads (WordPress lead capture integration)
  submitLeadEmail: async (email) => {
    console.log(`[WordPress API] Submitting lead email: ${email}`);
    if (WP_API_BASE) {
      try {
        const response = await fetch(`${WP_API_BASE}/wp-json/improx-leads/v1/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, source: 'gmail_authentication_gate' }),
        });
        if (response.ok) {
          console.log('[WordPress API] Lead recorded in WordPress database.');
          return true;
        }
      } catch (error) {
        console.warn('[WordPress API] WordPress lead sync fallback active.', error);
      }
    }
    return true;
  }
};
