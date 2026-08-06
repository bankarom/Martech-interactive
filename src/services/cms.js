// Improx Martech Media - Dynamic CMS Layer & Mock Database
// Supports scalable architectures, dynamically nested category hierarchies, and rich editorial contents.
import { wordpressApi } from '../api/wordpressApi';

// Define the Category Sitemap dynamically
// Supporting future expansion, parent/child relationships, and unlimited children.
export const CATEGORY_TREE = [
  {
    id: 'news-insights',
    name: 'News & Insights',
    slug: 'insights',
    subcategories: [
      {
        id: 'adv-promo',
        name: 'Advertising & Promotion',
        slug: 'advertising-promotion',
        children: [
          { name: 'Adtech Systems', slug: 'adtech' },
          { name: 'Digital Marketing', slug: 'digital-marketing' },
          { name: 'Digital Advertising', slug: 'digital-advertising' },
          { name: 'Display & Programmatic', slug: 'programmatic' },
          { name: 'Mobile Advertising', slug: 'mobile-advertising' },
          { name: 'Mobile Marketing', slug: 'mobile-marketing' },
          { name: 'Native Advertising', slug: 'native' },
          { name: 'PPC & Search', slug: 'ppc' },
          { name: 'PR & Communications', slug: 'pr' },
          { name: 'Performance Marketing', slug: 'performance' },
          { name: 'Search & Social Ads', slug: 'search-social' },
          { name: 'Video Advertising', slug: 'video-ads' }
        ]
      },
      {
        id: 'mgmt',
        name: 'Management',
        slug: 'management',
        children: [
          { name: 'MarTech Operations', slug: 'operations' },
          { name: 'Budgets & ROI Curation', slug: 'roi' },
          { name: 'Teams & Org Design', slug: 'teams' },
          { name: 'Project Management', slug: 'pm' },
          { name: 'Strategy & Planning', slug: 'strategy' },
          { name: 'Vendor Selection', slug: 'vendors' }
        ]
      },
      {
        id: 'content-exp',
        name: 'Content & Experience',
        slug: 'content-experience',
        children: [
          { name: 'Chatbots & Conversational AI', slug: 'chatbots' },
          { name: 'CMS & Web Experience', slug: 'cms-web' },
          { name: 'Content Marketing', slug: 'content-marketing' },
          { name: 'Customer Engagement', slug: 'engagement' },
          { name: 'Mobile Apps Development', slug: 'mobile-apps' },
          { name: 'Digital Asset Management', slug: 'dam' },
          { name: 'Email Marketing', slug: 'email' },
          { name: 'Interactive Content', slug: 'interactive' },
          { name: 'Marketing Automation', slug: 'automation' },
          { name: 'Marketing Technology', slug: 'martech' },
          { name: 'Optimization & Personalization', slug: 'personalization' },
          { name: 'Search Engine Optimization', slug: 'seo' },
          { name: 'Video Marketing', slug: 'video-marketing' }
        ]
      },
      {
        id: 'data-mgmt',
        name: 'Data Management',
        slug: 'data-management',
        children: [
          { name: 'Audience & Marketing Data', slug: 'audience-data' },
          { name: 'Business Intelligence', slug: 'bi' },
          { name: 'Customer Data Platforms', slug: 'cdp' },
          { name: 'Data Analytics Systems', slug: 'analytics' },
          { name: 'Data Management Platforms', slug: 'dmp' },
          { name: 'iPaaS & Cloud Integrations', slug: 'ipaas' },
          { name: 'Market Intelligence', slug: 'market-intel' },
          { name: 'Attribution & Performance', slug: 'attribution' },
          { name: 'Predictive Analytics', slug: 'predictive' }
        ]
      },
      {
        id: 'social-relations',
        name: 'Social & Relationships',
        slug: 'social-relationships',
        children: [
          { name: 'Account-Based Marketing', slug: 'abm' },
          { name: 'Advocacy & Loyalty', slug: 'advocacy' },
          { name: 'CRM Systems Integration', slug: 'crm' },
          { name: 'Customer Experience & Success', slug: 'cx' },
          { name: 'Events & Webinars Operations', slug: 'events' },
          { name: 'Influencer Marketing', slug: 'influencers' },
          { name: 'Social Media Monitoring', slug: 'social-monitoring' }
        ]
      }
    ]
  },
  { 
    id: 'interviews', 
    name: 'Interviews', 
    slug: 'interviews', 
    subcategories: [
      { name: 'CMO Spotlights', slug: 'cmo-spotlights' },
      { name: 'Tech Founders Q&A', slug: 'tech-founders' },
      { name: 'Ops Directors', slug: 'ops-directors' }
    ] 
  },
  { 
    id: 'case-studies', 
    name: 'Case Studies', 
    slug: 'case-studies', 
    subcategories: [
      { name: 'Enterprise SaaS', slug: 'enterprise-saas' },
      { name: 'Startup Scaling', slug: 'startup-scaling' },
      { name: 'Adtech ROI Plays', slug: 'adtech-roi' }
    ] 
  },
  { 
    id: 'reports', 
    name: 'Research Reports', 
    slug: 'research-reports', 
    subcategories: [
      { name: 'Budgeting & Stack Audits', slug: 'stack-audits' },
      { name: 'Compliant Lead Gen Guides', slug: 'lead-gen-guides' },
      { name: 'CMO Industry Benchmarks', slug: 'benchmarks' }
    ] 
  },
  { id: 'resources', name: 'Resources', slug: 'resources', subcategories: [] }
];

const LOCAL_SERVICES = [
  {
    id: 'demand-generation',
    title: 'Demand Generation',
    tagline: 'Orchestrating high-intent top-of-funnel acquisition pathways.',
    iconName: 'Target',
    shortDescription: 'We help enterprise SaaS organizations scale qualified pipelines using multi-channel programmatic search and custom display strategies.',
    description: 'Our Demand Gen framework targets in-market buyers, serving optimized content streams to drive brand evaluation and pipeline acceleration.',
    features: [
      'Contextual B2B ad placement mapping',
      'Predictive intent filtering setups',
      'Multi-touch CRM pipeline attribution rules'
    ],
    impact: '2.4x Average pipeline value acceleration'
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    tagline: 'High-fidelity verified B2B lead acquisition.',
    iconName: 'Database',
    shortDescription: 'Syndicate content, whitepapers, and guides to decision-makers filtered by job role and stack parameters.',
    description: 'Every captured contact profile is verified compliance-first to guarantee pipeline validity for SDR outreach teams.',
    features: [
      'Double opt-in compliance filters',
      'Real-time lead routing and validation setups',
      'Custom CRM field ingestion rules mapping'
    ],
    impact: '18% Direct meeting book rate conversion'
  },
  {
    id: 'abm-marketing',
    title: 'ABM Marketing',
    tagline: 'Account-Based Marketing targeting buying committees.',
    iconName: 'Award',
    shortDescription: 'Unify sales and marketing targets using predictive target account list signals.',
    description: 'Design account-specific content, display campaigns, and dynamic SDR alert rules based on Bombora intent tracking.',
    features: [
      'Target Account List (TAL) curation',
      'Programmatic B2B IP targeting setups',
      'Dynamic account landing hubs assembly'
    ],
    impact: '210% Average deal size increase'
  },
  {
    id: 'marketing-automation',
    title: 'Marketing Automation',
    tagline: 'Streamlining workflows in HubSpot, Marketo, and Pardot.',
    iconName: 'Cpu',
    shortDescription: 'Establish lead scoring boundaries, operational sync hygiene, and lifecycle triggers.',
    description: 'Audit tracking pixels, API synchronization pipelines, and system trigger configurations to ensure zero leakages.',
    features: [
      'Lifecycle stage mapping parameters',
      'MAP/CRM synchronization path designs',
      'Lead scoring rules optimization'
    ],
    impact: '32% Decrease in data duplication rate'
  },
  {
    id: 'ai-marketing',
    title: 'AI Marketing',
    tagline: 'Integrating predictive analytical co-pilots.',
    iconName: 'Sparkles',
    shortDescription: 'Use machine learning models to forecast conversion rates and segment targets dynamically.',
    description: 'We orchestrate generative intelligence setups to compose account copy variants compliance-first.',
    features: [
      'Predictive analytics models setup',
      'Dynamic segment allocation signals',
      'Automation copywriting guardrails'
    ],
    impact: '4.2x Faster personalization assembly'
  },
  {
    id: 'data-intelligence',
    title: 'Data Intelligence',
    tagline: 'First-party customer profile unification.',
    iconName: 'Activity',
    shortDescription: 'Establish CDPs and data clean rooms to build attribution dashboards.',
    description: 'We solve marketing data siloing, unifying contact interactions across web, email, CRM, and display platforms.',
    features: [
      'Customer Data Platform (CDP) designs',
      'First-party identity resolution paths',
      'Multi-touch attribution reporting setups'
    ],
    impact: '100% Attribution visibility across touchpoints'
  },
  {
    id: 'content-syndication',
    title: 'Content Syndication',
    tagline: 'Accelerating download reach for digital playbooks.',
    iconName: 'BookOpen',
    shortDescription: 'Distribute assets to target accounts actively searching for your solutions.',
    description: 'Leverage our premium publisher network to serve your case studies and guides to verified operational buyers.',
    features: [
      'Asset mapping across publisher verticals',
      'Target job role and budget filters',
      'Automated CRM sync path connections'
    ],
    impact: '15%+ Conversion rate to Sales Qualified Leads'
  },
  {
    id: 'intent-data',
    title: 'Intent Data',
    tagline: 'Real-time B2B buyer intent ingestion.',
    iconName: 'Layers',
    shortDescription: 'Track active research trends and flag ready-to-buy accounts instantly.',
    description: 'Establish Bombora or 6sense intent streams to trigger display campaigns and SDR notifications.',
    features: [
      'Third-party intent keyword configurations',
      'Intent intensity scoring boundaries setup',
      'Alert triggers for sales representatives'
    ],
    impact: '35 Day reduction in sales cycle length'
  },
  {
    id: 'b2b-marketing',
    title: 'B2B Marketing',
    tagline: 'Enterprise demand generation blueprints.',
    iconName: 'Globe',
    shortDescription: 'Full-funnel strategies coordinating display ads with inbound lead nurturing.',
    description: 'We align corporate messaging to high-value buying committee specifications to drive pipeline expansion.',
    features: [
      'Buying committee persona mapping',
      'Full-funnel content strategy designs',
      'KPI reporting attribution dashboard setup'
    ],
    impact: '40% Higher marketing contribution to pipeline'
  },
  {
    id: 'campaign-management',
    title: 'Campaign Management',
    tagline: 'Operational orchestrations for multi-channel programs.',
    iconName: 'Settings',
    shortDescription: 'Launch, track, and optimize multi-channel B2B display and search campaigns.',
    description: 'Manage budgets, target criteria adjustments, and pixel tracking to guarantee ROI across programmatic spends.',
    features: [
      'Programmatic display budget mapping',
      'Pixel tracking and conversion setups',
      'Weekly optimization audit cycles'
    ],
    impact: '28% Average reduction in CPA'
  }
];

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const normalizeWpPost = (post) => {
  if (!post) return null;
  return {
    id: post.id ? post.id.toString() : '',
    slug: post.slug || '',
    title: post.title?.rendered ? decodeHtml(post.title.rendered) : (post.title || ''),
    excerpt: post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : '',
    content: post.content?.rendered || '',
    category: post.categories_names?.[0] || 'Uncategorized',
    categorySlug: post.categorySlug,
    subcategorySlug: post.subcategorySlug,
    parentCategorySlug: post.parentCategorySlug || 'insights',
    author: {
      name: post.author_name || 'MarTech Specialist',
      role: post.author_role || 'Contributor',
      avatar: post.author_avatar || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: post.read_time || '5 min read',
    featuredImage: post.featured_media_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    views: post.views || 350,
    trending: !!post.trending,
    popular: !!post.popular,
    tags: post.tags_names || [],
    
    // Gated details for reports
    pages: post.pages || 35,
    downloadCount: post.downloadCount || 1000,
    gated: !!post.gated,
    
    // Q&As details for interviews
    guestName: post.guestName || '',
    guestRole: post.guestRole || '',
    guestCompany: post.guestCompany || '',
    guestAvatar: post.guestAvatar || '',
    qas: post.qas || [],

    // Results details for case studies
    company: post.company || '',
    industry: post.industry || '',
    results: post.results || [],

    // ACF Fields for Solutions
    tagline: post.acf?.tagline || post.tagline || '',
    iconName: post.acf?.icon_name || post.iconName || 'Target',
    impact: post.acf?.impact || post.impact || '',
    shortDescription: post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : (post.shortDescription || ''),
    features: post.features || []
  };
};

export const CMSService = {
  getHeroSlides: async () => {
    const raw = await wordpressApi.getPosts();
    return raw.slice(0, 3).map(normalizeWpPost).map(art => ({
      id: art.id,
      title: art.title,
      excerpt: art.excerpt,
      category: art.category,
      categorySlug: art.categorySlug,
      readTime: art.readTime,
      featuredImage: art.featuredImage,
      link: `/article/${art.slug}`,
      author: art.author.name,
      date: art.date
    }));
  },

  getServices: async () => {
    const raw = await wordpressApi.getSolutions();
    // If title is an object, it came from WordPress REST API. Normalize it!
    if (raw.length > 0 && typeof raw[0].title === 'object') {
      return raw.map(normalizeWpPost);
    }
    // Otherwise, return the local mock data
    return LOCAL_SERVICES;
  },

  getServiceById: async (id) => {
    const list = await CMSService.getServices();
    return list.find(s => s.id === id);
  },

  getArticles: async (categorySlug = null) => {
    const raw = await wordpressApi.getPosts();
    const list = raw.map(normalizeWpPost);
    if (categorySlug) {
      return list.filter(
        a => a.categorySlug === categorySlug || a.subcategorySlug === categorySlug || a.parentCategorySlug === categorySlug
      );
    }
    return list;
  },

  getArticleBySlug: async (slug) => {
    const post = await wordpressApi.getPostBySlug(slug);
    return normalizeWpPost(post);
  },

  getTrendingArticles: async () => {
    const raw = await wordpressApi.getPosts();
    return raw.map(normalizeWpPost).filter(a => a.trending);
  },

  getPopularArticles: async () => {
    const raw = await wordpressApi.getPosts();
    return raw.map(normalizeWpPost).filter(a => a.popular);
  },

  getInterviews: async () => {
    const raw = await wordpressApi.getInterviews();
    return raw.map(normalizeWpPost);
  },

  getInterviewById: async (id) => {
    const post = await wordpressApi.getInterviewById(id);
    return normalizeWpPost(post);
  },

  getCaseStudies: async () => {
    const raw = await wordpressApi.getCaseStudies();
    return raw.map(normalizeWpPost);
  },

  getCaseStudyById: async (id) => {
    const post = await wordpressApi.getCaseStudyById(id);
    return normalizeWpPost(post);
  },

  getReports: async () => {
    const raw = await wordpressApi.getResearch();
    return raw.map(normalizeWpPost);
  },

  getReportById: async (id) => {
    const post = await wordpressApi.getResearchById(id);
    return normalizeWpPost(post);
  },

  getPodcasts: async () => {
    const raw = await wordpressApi.getPodcasts();
    return raw.map(normalizeWpPost);
  },

  getInfographics: async () => {
    const raw = await wordpressApi.getInfographics();
    return raw.map(normalizeWpPost);
  },

  getGuestArticles: async () => {
    const raw = await wordpressApi.getGuestArticles();
    return raw.map(normalizeWpPost);
  },

  getWhitepapers: async () => {
    const raw = await wordpressApi.getWhitepapers();
    return raw.map(normalizeWpPost);
  },

  submitLeadEmail: async (email) => {
    return await wordpressApi.submitLeadEmail(email);
  }
};
