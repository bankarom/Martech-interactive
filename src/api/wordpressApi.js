// Headless WordPress API Client Layer
// Dynamically toggles between local MOCK REST JSON and active WordPress REST endpoints.
// Later replacement with WordPress REST API requires only setting VITE_WP_API_URL in .env file.

import { MOCK_DATABASE } from '../services/mockDb';

const WP_API_BASE = import.meta.env.VITE_WP_API_URL || '';

// Mock Local Database Store
const LOCAL_JSON_DB = {
  posts: MOCK_DATABASE.articles,
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
  ]
};

// Generic request dispatcher
async function requestWpApi(endpoint, localFallbackData) {
  if (WP_API_BASE) {
    try {
      const response = await fetch(`${WP_API_BASE}/wp-json/wp/v2/${endpoint}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
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
    return await requestWpApi('solutions', LOCAL_JSON_DB.solutions);
  },
  
  getSolutionById: async (id) => {
    const list = await requestWpApi('solutions', LOCAL_JSON_DB.solutions);
    return list.find(item => item.id.toString() === id.toString());
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
