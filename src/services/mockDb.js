// Improx Martech Media - Dynamic WP REST API Mock Data Generator
// Generates 250+ Articles across 44 subcategories, structured as WP API responses.


const AUTHORS = [
  { name: 'Improx Martech Team', role: 'Editorial Core', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
  { name: 'Alex Mercer (Improx Team)', role: 'Director of MarTech Strategy', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
  { name: 'Elena Rostova (Improx Team)', role: 'Ad Tech Architect', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
  { name: 'Marcus Vance (Improx Team)', role: 'Integration Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { name: 'Clara Oswald (Improx Team)', role: 'UX Optimization Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
  { name: 'Devon Lee (Improx Team)', role: 'Data Operations Architect', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
];

const PARENTS = {
  'advertising-promotion': 'Advertising & Promotion',
  'management': 'Management',
  'content-experience': 'Content & Experience',
  'data-management': 'Data Management',
  'social-relationships': 'Social & Relationships'
};

const SUBCATEGORIES = [
  // advertising-promotion
  { parent: 'advertising-promotion', slug: 'adtech', name: 'Adtech Systems' },
  { parent: 'advertising-promotion', slug: 'digital-marketing', name: 'Digital Marketing' },
  { parent: 'advertising-promotion', slug: 'digital-advertising', name: 'Digital Advertising' },
  { parent: 'advertising-promotion', slug: 'programmatic', name: 'Display & Programmatic' },
  { parent: 'advertising-promotion', slug: 'mobile-advertising', name: 'Mobile Advertising' },
  { parent: 'advertising-promotion', slug: 'mobile-marketing', name: 'Mobile Marketing' },
  { parent: 'advertising-promotion', slug: 'native', name: 'Native Advertising' },
  { parent: 'advertising-promotion', slug: 'ppc', name: 'PPC & Search' },
  { parent: 'advertising-promotion', slug: 'pr', name: 'PR & Communications' },
  { parent: 'advertising-promotion', slug: 'performance', name: 'Performance Marketing' },
  { parent: 'advertising-promotion', slug: 'search-social', name: 'Search & Social Ads' },
  { parent: 'advertising-promotion', slug: 'video-ads', name: 'Video Advertising' },
  // management
  { parent: 'management', slug: 'operations', name: 'MarTech Operations' },
  { parent: 'management', slug: 'roi', name: 'Budgets & ROI Curation' },
  { parent: 'management', slug: 'teams', name: 'Teams & Org Design' },
  { parent: 'management', slug: 'pm', name: 'Project Management' },
  { parent: 'management', slug: 'strategy', name: 'Strategy & Planning' },
  { parent: 'management', slug: 'vendors', name: 'Vendor Selection' },
  // content-experience
  { parent: 'content-experience', slug: 'chatbots', name: 'Chatbots & Conversational AI' },
  { parent: 'content-experience', slug: 'cms-web', name: 'CMS & Web Experience' },
  { parent: 'content-experience', slug: 'content-marketing', name: 'Content Marketing' },
  { parent: 'content-experience', slug: 'engagement', name: 'Customer Engagement' },
  { parent: 'content-experience', slug: 'mobile-apps', name: 'Mobile Apps Development' },
  { parent: 'content-experience', slug: 'dam', name: 'Digital Asset Management' },
  { parent: 'content-experience', slug: 'email', name: 'Email Marketing' },
  { parent: 'content-experience', slug: 'interactive', name: 'Interactive Content' },
  { parent: 'content-experience', slug: 'automation', name: 'Marketing Automation' },
  { parent: 'content-experience', slug: 'martech', name: 'Marketing Technology' },
  { parent: 'content-experience', slug: 'personalization', name: 'Optimization & Personalization' },
  { parent: 'content-experience', slug: 'seo', name: 'Search Engine Optimization' },
  { parent: 'content-experience', slug: 'video-marketing', name: 'Video Marketing' },
  // data-management
  { parent: 'data-management', slug: 'audience-data', name: 'Audience & Marketing Data' },
  { parent: 'data-management', slug: 'bi', name: 'Business Intelligence' },
  { parent: 'data-management', slug: 'cdp', name: 'Customer Data Platforms' },
  { parent: 'data-management', slug: 'analytics', name: 'Data Analytics Systems' },
  { parent: 'data-management', slug: 'dmp', name: 'Data Management Platforms' },
  { parent: 'data-management', slug: 'ipaas', name: 'iPaaS & Cloud Integrations' },
  { parent: 'data-management', slug: 'market-intel', name: 'Market Intelligence' },
  { parent: 'data-management', slug: 'attribution', name: 'Attribution & Performance' },
  { parent: 'data-management', slug: 'predictive', name: 'Predictive Analytics' },
  // social-relationships
  { parent: 'social-relationships', slug: 'abm', name: 'Account-Based Marketing' },
  { parent: 'social-relationships', slug: 'advocacy', name: 'Advocacy & Loyalty' },
  { parent: 'social-relationships', slug: 'crm', name: 'CRM Systems Integration' },
  { parent: 'social-relationships', slug: 'cx', name: 'Customer Experience & Success' },
  { parent: 'social-relationships', slug: 'events', name: 'Events & Webinars Operations' },
  { parent: 'social-relationships', slug: 'influencers', name: 'Influencer Marketing' },
  { parent: 'social-relationships', slug: 'social-monitoring', name: 'Social Media Monitoring' }
];

const IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552581230-c0152862c963?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504607798333-52a30db54a5d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
];

// Generate 6 high-quality, targeted articles for each subcategory
const generateAllArticles = () => {
  const articlesList = [];
  let articleId = 1;

  const TITLE_TEMPLATES = [
    (name) => `How ${name} is Navigating Cookie-Less Attribution in 2026`,
    (name) => `A Step-by-Step Playbook for Auditing ${name} Pipelines`,
    (name) => `Top 5 High-Impact Trends Reshaping B2B ${name} Strategies`,
    (name) => `Unifying Operations: Why Your Core Stack Needs Modern ${name}`,
    (name) => `The Role of Predictive AI in Automating ${name} Workflows`,
    (name) => `Scaling Enterprise Pipeline Value: Maximizing ${name} ROI`
  ];

  const SLUG_KEYS = ["trends", "playbook", "strategies", "unification", "predictive-ai", "scaling-roi"];

  const EXCERPTS = [
    (name) => `As browser privacy restrictions tighten, learn how leading organizations adapt their B2B ${name} methodologies to capture high-intent metrics.`,
    (name) => `Discover the complete infrastructure audit process, data flow sync paths, and operational triggers needed to clean up B2B ${name} setups.`,
    (name) => `Our Improx Team outlines key developments, market shifts, and emerging frameworks driving performance in ${name} operations.`,
    (name) => `Avoid siloed tracking and attribution drift. We examine the exact architectural steps to integrate B2B ${name} directly into your core CRM.`,
    (name) => `How enterprise engineering and operations leaders deploy predictive models to score, segment, and route B2B ${name} interactions.`,
    (name) => `A complete deep-dive into proving B2B ${name} campaign ROI directly to executive boards using unified first-party datasets.`
  ];

  const CONTENTS = [
    (name) => `
      <h3 id="introduction" class="text-xl font-bold text-martech-primary mt-6 mb-3">1. Navigating Privacy-First Landscapes</h3>
      <p class="mb-4 text-slate-300">Privacy regulations (such as GDPR, CCPA, and CPRA) along with the deprecation of third-party tracking cookies are fundamentally reshaping the digital advertising landscape. For marketing teams, this transition means that traditional multi-touch attribution models are failing to capture accurate customer journeys. To counter this, modern B2B growth teams are shifting towards first-party tracking nodes and server-side conversion integrations.</p>
      <p class="mb-4 text-slate-300">When client-side cookies decay or get blocked by privacy settings, server-to-server tracking allows you to route conversion metrics directly from your application database back to Google Ads, LinkedIn Campaign Manager, and Facebook Ads, ensuring complete data continuity and keeping pipelines healthy.</p>
      <h3 id="signals" class="text-xl font-bold text-martech-primary mt-8 mb-3">2. Ingesting Real-Time Intent Signals</h3>
      <p class="mb-4 text-slate-300">Integrating third-party intent indicators (such as Bombora or 6sense) directly into your customer data platform (CDP) provides an extra layer of intelligence. Rather than waiting for a prospect to fill out a contact form, growth teams can capture search trends and web activity surges across professional networks, matching them against target account domains.</p>
      <p class="mb-4 text-slate-300">The Improx editorial team recommends configuring real-time alert webhooks that parse intent surges and immediately trigger highly specific, personalized account-based advertising variations to shorten sales cycles and boost conversion velocities.</p>
      <h3 id="governance" class="text-xl font-bold text-martech-primary mt-8 mb-3">3. Modern Attribution Standards</h3>
      <p class="mb-4 text-slate-300">To maintain operational compliance, your B2B stack must enforce strict consent gates. Ensure that every email validation, intent collection, and ad conversion tracker has clear consent flags attached to prevent database contamination. Aligning your schema structures between HubSpot and Salesforce is critical to ensuring attribution is audited warning-free.</p>
    `,
    (name) => `
      <h3 id="audit" class="text-xl font-bold text-martech-primary mt-6 mb-3">1. Pipeline Audit Checklist</h3>
      <p class="mb-4 text-slate-300">Redundant sync paths trigger attribution lag and inflate operations costs. A systematic cleanup of B2B ${name} pipelines solves duplicate tracking, which typically drains up to 18% of marketing budgets through redundant pixel fires and double-counted contact records.</p>
      <p class="mb-4 text-slate-300">Begin by auditing the event triggers on your high-value actions (such as demo requests or whitepaper downloads). Check that multiple tracking systems do not bind to the same submit button handler without clean deduplication logic in your GTM containers.</p>
      <h3 id="integration" class="text-xl font-bold text-martech-primary mt-8 mb-3">2. Data Synchronization Mappings</h3>
      <p class="mb-4 text-slate-300">Establishing clear schema definitions between marketing automation platforms and CRMs ensures zero data leakages. We recommend mapping all UTM campaign details, device identifiers, and consent timestamps to custom fields on the lead object upon initial record ingestion.</p>
      <h3 id="conclusion" class="text-xl font-bold text-martech-primary mt-8 mb-3">3. Operational Hygiene Milestones</h3>
      <p class="mb-4 text-slate-300">Regular validation checks protect incoming pipeline data from compliance warnings and bad formatting. Implement weekly API routines to check contact emails against known verification systems, automatically cleaning or flagging records containing syntax errors before they hit active SDR outreach lines.</p>
    `,
    (name) => `
      <h3 id="overview" class="text-xl font-bold text-martech-primary mt-6 mb-3">1. Industry Momentum and Shifts</h3>
      <p class="mb-4 text-slate-300">The field of B2B ${name} is experiencing unprecedented technological convergence. Standard methods no longer yield top-tier returns as client browser environments tighten security standards. Growth leaders must transition towards server-side integration frameworks to build reliable attribution pipelines.</p>
      <h3 id="trends" class="text-xl font-bold text-martech-primary mt-8 mb-3">2. Key Trends to Watch</h3>
      <p class="mb-4 text-slate-300">From server-side conversion APIs to machine-learning driven account matching, keeping up requires proactive stack curation. A major development is the growth of first-party data clean rooms, allowing partner networks to safely merge conversion details without exposing private buyer data.</p>
      <h3 id="strategy" class="text-xl font-bold text-martech-primary mt-8 mb-3">3. Actionable Strategy Recommendations</h3>
      <p class="mb-4 text-slate-300">Implement first-party tracking nodes immediately to secure year-over-year attribution stability. Transition your tracking scripts from standard client-side embeds to a server-managed edge routing model, which increases website performance and keeps data clean.</p>
    `,
    (name) => `
      <h3 id="challenge" class="text-xl font-bold text-martech-primary mt-6 mb-3">1. The Cost of Siloed Systems</h3>
      <p class="mb-4 text-slate-300">Disconnected database setups lead to mismatched customer touchpoints and skewed ROI reporting for B2B ${name}. When your programmatic ad spends, email clicks, and offline event registers live in separate silos, calculating a unified customer lifetime value becomes nearly impossible.</p>
      <h3 id="unification" class="text-xl font-bold text-martech-primary mt-8 mb-3">2. Constructing the Unified Hub</h3>
      <p class="mb-4 text-slate-300">Integrating pipelines into your core CRM maps marketing actions directly to won revenue. By piping real-time web telemetry through a customer data platform (CDP) and writing back campaign identifiers to Salesforce or HubSpot contact records, you establish a reliable source of truth.</p>
      <h3 id="benefits" class="text-xl font-bold text-martech-primary mt-8 mb-3">3. Long-Term Value Realization</h3>
      <p class="mb-4 text-slate-300">Deprecate redundant tracking scripts to reduce browser load times and improve digital user experiences. Streamlining your tracking pixel setups can boost mobile site speeds by up to 30%, directly driving higher conversion rates on landing pages.</p>
    `,
    (name) => `
      <h3 id="ai" class="text-xl font-bold text-martech-primary mt-6 mb-3">1. Intelligent Automation Frameworks</h3>
      <p class="mb-4 text-slate-300">Predictive models are transitioning from optional optimizations to core requirements in B2B ${name}. Operations teams are deploying machine learning models to forecast conversion rates, score lead intent, and allocate resources efficiently.</p>
      <h3 id="scoring" class="text-xl font-bold text-martech-primary mt-8 mb-3">2. Automated Account Segment Routing</h3>
      <p class="mb-4 text-slate-300">Machine learning models flag high-intent accounts based on digital signals, alert teams, and deliver custom copy instantly. By monitoring target account activity surges, AI systems can automatically trigger customized email copy variations tailored to the account's industry.</p>
      <h3 id="guardrails" class="text-xl font-bold text-martech-primary mt-8 mb-3">3. Quality Control Guardrails</h3>
      <p class="mb-4 text-slate-300">Maintain human-in-the-loop validation of automated pipeline segments to ensure compliance and message quality. Set clear validation limits on AI copy variants to prevent brand tone drift or compliance warnings across your digital campaigns.</p>
    `,
    (name) => `
      <h3 id="roi" class="text-xl font-bold text-martech-primary mt-6 mb-3">1. Establishing Baseline Metrics</h3>
      <p class="mb-4 text-slate-300">Proving the financial value of B2B ${name} requires robust multi-touch attribution models. Marketing operations teams must move past vanity metrics (like page views or clicks) and focus on pipeline value contribution.</p>
      <h3 id="pipeline" class="text-xl font-bold text-martech-primary mt-8 mb-3">2. Correlating Spends with Revenue</h3>
      <p class="mb-4 text-slate-300">Map operational touchpoints directly to pipeline values to show the executive board clear ROI numbers. Ensure that your attribution script maps every marketing channel touchpoint to active Salesforce opportunities, allowing you to trace closed-won contract values back to specific campaigns.</p>
      <h3 id="efficiency" class="text-xl font-bold text-martech-primary mt-8 mb-3">3. Resource Allocation Strategies</h3>
      <p class="mb-4 text-slate-300">Redirect budget from low-performing native spots to high-converting intent pipelines. Auditing your spends using a unified attribution dataset lets you locate and pause underperforming ad campaigns, driving higher operational returns.</p>
    `
  ];

  SUBCATEGORIES.forEach((sub, subIdx) => {
    for (let i = 1; i <= 6; i++) {
      const auth = AUTHORS[(subIdx + i) % AUTHORS.length];
      const img = IMAGES[(subIdx * 6 + i - 1) % IMAGES.length];
      
      // Calculate a highly recent date relative to June 24, 2026.
      // E.g. dates from June 12, 2026 to June 24, 2026
      const dateDay = 24 - ((subIdx + i) % 12);
      const dateStr = `2026-06-${String(dateDay).padStart(2, '0')}T10:00:00`;
      
      articlesList.push({
        id: articleId,
        slug: `b2b-${sub.slug}-${SLUG_KEYS[i - 1]}`,
        title: { rendered: TITLE_TEMPLATES[i - 1](sub.name) },
        excerpt: { rendered: EXCERPTS[i - 1](sub.name) },
        content: { rendered: CONTENTS[i - 1](sub.name) },
        date: dateStr,
        featured_media_url: img,
        author_name: auth.name,
        author_role: auth.role,
        author_avatar: auth.avatar,
        categories_names: [PARENTS[sub.parent]],
        categorySlug: sub.parent,
        subcategorySlug: sub.slug,
        parentCategorySlug: 'insights',
        tags_names: ['Analytics', sub.name, 'B2B Tech', 'Trending'],
        read_time: `${5 + (i % 4)} min read`,
        views: 850 + (articleId * 18),
        trending: i === 1 || i === 3, // mark some as trending
        popular: i === 2 || i === 5
      });
      articleId++;
    }
  });

  // Interleave by parent categories to distribute them perfectly across feeds
  const interleavedList = [];
  const maxArticlesPerSub = 6;
  for (let i = 0; i < maxArticlesPerSub; i++) {
    for (let pIdx = 0; pIdx < 12; pIdx++) {
      const parentKeys = Object.keys(PARENTS);
      parentKeys.forEach((parentKey) => {
        const subsOfParent = SUBCATEGORIES.filter(s => s.parent === parentKey);
        const sub = subsOfParent[pIdx % subsOfParent.length];
        if (sub) {
          const art = articlesList.find(a => a.slug === `b2b-${sub.slug}-${SLUG_KEYS[i]}`);
          if (art && !interleavedList.includes(art)) {
            interleavedList.push(art);
          }
        }
      });
    }
  }

  articlesList.forEach(art => {
    if (!interleavedList.includes(art)) {
      interleavedList.push(art);
    }
  });

  return interleavedList;
};

// Generate 15 Interviews with detailed Q&As
const generateInterviews = () => {
  const list = [];
  const guestFirstNames = ["Sarah", "Michael", "David", "Jessica", "Amanda", "Robert", "James", "Emily", "Daniel", "Sophia", "Matthew", "Olivia", "Andrew", "Isabella", "William"];
  const guestLastNames = ["Chen", "Rodriguez", "Sorenson", "Patel", "Foster", "Kim", "O'Connor", "Martinez", "Taylor", "Jenkins", "Goldberg", "Silva", "Nakamura", "Al-Fayed", "Vance"];
  
  for (let i = 1; i <= 15; i++) {
    const auth = AUTHORS[(i - 1) % AUTHORS.length];
    const img = IMAGES[(i + 12) % IMAGES.length];
    const firstName = guestFirstNames[(i - 1) % guestFirstNames.length];
    const lastName = guestLastNames[(i - 1) % guestLastNames.length];
    const guestName = `${firstName} ${lastName}`;
    const company = `SaaS Enterprise ${i}`;

    list.push({
      id: 1000 + i,
      slug: `executive-interview-spotlight-${i}`,
      title: { rendered: `Executive Spotlight: Inside B2B Demand Strategies with ${guestName}` },
      excerpt: { rendered: `How ${guestName}, Chief Marketing Officer at ${company}, navigated attribution auditing challenges, cookie-less conversion paths, and enterprise stack unification.` },
      content: { 
        rendered: `
          <h3 class="text-xl font-bold text-martech-primary mt-6 mb-3">Enterprise Stack Migration & Integration</h3>
          <p class="mb-4 text-slate-300">We sat down with ${guestName} to explore the architecture behind modern B2B buyer journeys, custom identity resolutions, and proving pipeline contribution directly to the executive board.</p>
        `
      },
      date: `2026-05-${String(25 - i).padStart(2, '0')}T14:30:00`,
      featured_media_url: img,
      author_name: 'Improx Editorial Team',
      author_role: 'Editor',
      author_avatar: AUTHORS[0].avatar,
      categories_names: ['Interviews'],
      categorySlug: 'interviews',
      tags_names: ['CMO', 'Interviews', 'Strategy'],
      read_time: `${8 + (i % 4)} min read`,
      guestName: guestName,
      guestRole: i % 2 === 0 ? 'VP of Marketing Operations' : 'Chief Marketing Officer',
      guestCompany: company,
      guestAvatar: auth.avatar,
      qas: [
        { 
          q: "What is your primary operational hurdle when auditing marketing pipeline velocity today?", 
          a: `At ${company}, the main operational hurdle is undoubtedly siloed customer profile synchronization pathways. When a buyer interacts with programmatic display ads, transitions to our resource center, and later downloads a research report, the event timestamps often drift or get mismatched between our CDP and the main CRM. Standardizing lifecycle stages is essential to maintaining unified attribution.` 
        },
        { 
          q: "How are you adapting your lead verification process to maintain strict GDPR and CCPA compliance?", 
          a: "We have transitioned entirely to a double opt-in compliance filter model. All content syndication downloads are routed through real-time API verification gateways before being injected into our sales pipeline. This prevents non-compliant list ingestion and significantly increases the fidelity of outreach pipelines for SDR teams." 
        },
        { 
          q: "What advice would you give to marketing operations directors trying to justify the cost of CDPs to the CFO?", 
          a: "Speak in terms of tool consolidation and pipeline speed, not data cleanliness. By showing how a unified Customer Data Platform allowed us to deprecate three separate tracking and email sequencing tool licenses while reducing duplicate records by 32%, we built a business case centered on direct ROI rather than abstract metrics." 
        },
        { 
          q: "Looking ahead, which emerging marketing technology will have the greatest impact on your pipeline?", 
          a: "Server-side tracking integrations and predictive analytical co-pilots. As browser-based client cookies continue to decay, having server-side attribution setups ensures data continuity, while machine learning models help us predict high-intent buying committee shifts long before sales reps make initial contact." 
        }
      ]
    });
  }
  return list;
};

// Generate 10 Case Studies
const generateCaseStudies = () => {
  const list = [];
  for (let i = 1; i <= 10; i++) {
    const img = IMAGES[(i + 18) % IMAGES.length];
    list.push({
      id: 2000 + i,
      slug: `b2b-case-study-${i}`,
      title: { rendered: `How Enterprise ${i} Reached Record Pipeline Growth` },
      excerpt: { rendered: `A look at platform integration milestones, duplicate deprecations, and target account campaigns.` },
      content: { 
        rendered: `
          <h3 class="text-xl font-bold text-martech-primary mt-6 mb-3">Operational Solutions Case Study</h3>
          <p class="mb-4 text-slate-600 dark:text-slate-350">Rebuilding systems architecture drove higher conversions and reduced attribution errors.</p>
        `
      },
      date: `2026-04-${String(28 - i).padStart(2, '0')}T09:15:00`,
      featured_media_url: img,
      author_name: AUTHORS[1].name,
      author_role: AUTHORS[1].role,
      author_avatar: AUTHORS[1].avatar,
      categories_names: ['Case Studies'],
      categorySlug: 'case-studies',
      tags_names: ['Case Studies', 'ROI', 'Automation'],
      read_time: `${6 + (i % 3)} min read`,
      company: `Enterprise Corp ${i}`,
      industry: 'Technology Software',
      results: [
        '180% average pipeline lift',
        '25% tool license savings'
      ]
    });
  }
  return list;
};

// Generate 10 Research Reports
const generateReports = () => {
  const list = [];
  for (let i = 1; i <= 10; i++) {
    const img = IMAGES[(i + 22) % IMAGES.length];
    list.push({
      id: 3000 + i,
      slug: `research-report-playbook-${i}`,
      title: { rendered: `The B2B Budget & Integration Playbook Edition ${i}` },
      excerpt: { rendered: `Download the full 45-page survey analysis mapping CMO spend patterns and CDP platforms.` },
      content: { 
        rendered: `
          <h3 class="text-xl font-bold text-martech-primary mt-6 mb-3">Enterprise Survey Summary</h3>
          <p class="mb-4 text-slate-600 dark:text-slate-350">Download scope details to audit your operations stack.</p>
        `
      },
      date: `2026-06-${String(15 - i).padStart(2, '0')}T08:00:00`,
      featured_media_url: img,
      author_name: AUTHORS[2].name,
      author_role: AUTHORS[2].role,
      author_avatar: AUTHORS[2].avatar,
      categories_names: ['Research Reports'],
      categorySlug: 'research-reports',
      tags_names: ['Reports', 'Budgets', 'CDP'],
      read_time: '12 min read',
      pages: 35 + (i * 3),
      downloadCount: 1200 + (i * 240),
      gated: true
    });
  }
  return list;
};

export const MOCK_DATABASE = {
  articles: generateAllArticles(),
  interviews: generateInterviews(),
  caseStudies: generateCaseStudies(),
  reports: generateReports()
};
