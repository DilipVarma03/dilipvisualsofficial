import { ServiceItem, PricingPackage, WebsiteContent } from '../types';

export const initialWebsiteContent: WebsiteContent = {
  announcement: "NOW ACCEPTING NEW PROJECTS | INDIA & WORLDWIDE",
  heroHeadline: "WE TURN IDEAS INTO EXTRAORDINARY VISUAL EXPERIENCES.",
  heroSubheading: "Creative thinking. Powerful storytelling. Extraordinary execution. We help brands and creators build a strong digital identity through innovative creative solutions.",
  agencyPhone: "+91 9398769483",
  agencyEmail: "dilipvisuals@gmail.com",
  agencyAddress: "Hyderabad, Telangana, India",
  whatsappNumber: "919398769483",
  founderName: "Dilip",
  founderRole: "Founder & Creative Director",
  founderBio: "Visionary creator dedicated to cinematic storytelling, high-retention video craftsmanship, and high-impact digital branding. Leading Dilip Visuals to elevate global creators and brands.",
  instagramUrl: "https://instagram.com/dilipvisuals",
  youtubeUrl: "https://youtube.com/@dilipvisuals",
  linkedinUrl: "https://linkedin.com/company/dilipvisuals",
  twitterUrl: "https://twitter.com/dilipvisuals"
};

export const initialServices: ServiceItem[] = [
  {
    id: "service-video-editing",
    serviceId: "video-editing",
    title: "Professional Video Editing",
    subtitle: "High-Retention, Cinematic & Engaging Video Production",
    description: "Transform raw footage into dynamic stories that captivate audiences. Optimized for viewer retention, pacing, sound design, and visual impact.",
    deliverables: [
      "YouTube long-form video editing",
      "Instagram Reels & YouTube Shorts",
      "Short-form viral content",
      "Promotional & commercial videos",
      "Corporate video presentations",
      "Documentary style story editing",
      "Sound design & color grading"
    ],
    suitableFor: [
      "YouTubers & Content Creators",
      "Influencers & Podcasters",
      "Startups & Tech Companies",
      "D2C Brands"
    ],
    icon: "Video",
    active: true,
    displayOrder: 1
  },
  {
    id: "service-graphic-designing",
    serviceId: "graphic-designing",
    title: "Graphic Designing",
    subtitle: "Posters, Advertising Banners & High-Converting Marketing Creatives",
    description: "High-impact social media creatives, advertising graphics, event posters, and visual collateral engineered to stop the scroll and drive clicks.",
    deliverables: [
      "Instagram carousel & single posts",
      "Social media marketing creatives",
      "Promotional & event posters",
      "High-converting advertising banners",
      "Business decks & presentation graphics",
      "Print-ready promotional collateral"
    ],
    suitableFor: [
      "Agencies & Marketing Teams",
      "E-commerce & direct-to-consumer brands",
      "Small & Medium Businesses",
      "Personal Brands"
    ],
    icon: "Palette",
    active: true,
    displayOrder: 2
  },
  {
    id: "service-youtube-thumbnails",
    serviceId: "youtube-thumbnails",
    title: "YouTube Thumbnail Designing",
    subtitle: "High-CTR, Scroll-Stopping Thumbnails Built For 15%+ Click-Through Rates",
    description: "Engineered specifically for YouTube recommendations and search feeds. We combine subject lighting enhancement, rim glows, high-contrast theory, and clear focal hierarchy.",
    deliverables: [
      "High-CTR custom YouTube thumbnails",
      "A/B testing thumbnail variants",
      "Facial expression & rim lighting polish",
      "Focal hierarchy & contrast calibration",
      "Mobile-feed miniaturized readability testing",
      "Source files & high-res exports"
    ],
    suitableFor: [
      "Creators seeking higher CTR",
      "Documentary & storytelling channels",
      "Tech reviewers & podcasters",
      "Gaming & entertainment creators"
    ],
    icon: "Film",
    active: true,
    displayOrder: 3
  },
  {
    id: "service-branding",
    serviceId: "branding",
    title: "Branding and Visual Identity",
    subtitle: "Cohesive, Memorable Brand Identities for the Digital Age",
    description: "Craft a distinct visual language that builds trust, commands premium positioning, and makes your brand unforgettable across all touchpoints.",
    deliverables: [
      "Custom logo design & icon systems",
      "Complete brand visual identity kit",
      "Custom color palettes & contrast systems",
      "Typography styling & hierarchy",
      "Brand guideline manual (PDF)",
      "Cross-platform visual consistency rules"
    ],
    suitableFor: [
      "New startups & ventures",
      "Creators building personal brand empires",
      "Businesses undergoing rebranding",
      "Agencies"
    ],
    icon: "Sparkles",
    active: true,
    displayOrder: 4
  },
  {
    id: "service-social-media",
    serviceId: "social-media",
    title: "Social Media Management",
    subtitle: "End-to-End Creative Direction & Visual Social Strategy",
    description: "Turn your social profiles into high-converting visual storefronts with cohesive design systems, templates, and content planning.",
    deliverables: [
      "Monthly social media creative design kits",
      "Creative content planning & art direction",
      "Visual grid & feed consistency systems",
      "Brand-aligned editable Canva/Figma templates",
      "Social media creative growth packages"
    ],
    suitableFor: [
      "Brands wanting consistent daily visual presence",
      "Founders building LinkedIn & Twitter presence",
      "Content creators scaling across multiple platforms",
      "Small and medium enterprises"
    ],
    icon: "Share2",
    active: true,
    displayOrder: 5
  },
  {
    id: "service-3d-blender",
    serviceId: "3d-blender",
    title: "3D and Blender Projects",
    subtitle: "Photorealistic 3D Product Renders, Modeling & Immersive Visual Concepts",
    description: "Elevate your product presentation with cutting-edge 3D models, photorealistic studio renders, and immersive visual concepts developed in Blender.",
    deliverables: [
      "3D product modeling & visualization in Blender",
      "Photorealistic studio lighting & render passes",
      "Surreal 3D concept art & backgrounds",
      "Procedural material shaders & texturing",
      "High-resolution 4K still renders",
      "Interactive 3D asset preparation"
    ],
    suitableFor: [
      "E-commerce brands & physical products",
      "Tech hardware startups",
      "Luxury & lifestyle brands",
      "Architectural & industrial designers"
    ],
    icon: "Box",
    active: true,
    displayOrder: 6
  }
];

export const initialPricingPackages: PricingPackage[] = [
  // Video Editing Packages
  {
    id: "pkg-ve-starter",
    packageId: "ve-starter",
    service: "Video Editing",
    packageName: "Starter Package",
    description: "Ideal for emerging creators and short-form video content.",
    inrPrice: 4999,
    usdPrice: 79,
    isCustomQuote: false,
    features: [
      "Up to 3 Short-form videos (Reels/Shorts)",
      "Dynamic captions & kinetic subtitles",
      "Sound effects & royalty-free music",
      "Color correction & basic grading",
      "1080p full HD export"
    ],
    revisions: "2 rounds of revisions",
    deliveryTime: "48 hours",
    isRecommended: false,
    active: true
  },
  {
    id: "pkg-ve-pro",
    packageId: "ve-pro",
    service: "Video Editing",
    packageName: "Professional Package",
    description: "Our most popular package for active YouTubers & growing brands.",
    inrPrice: 12999,
    usdPrice: 189,
    isCustomQuote: false,
    features: [
      "1 Long-form YouTube video (up to 15 mins)",
      "2 Cut-down vertical shorts/reels included",
      "Advanced pacing & retention-focused sound design",
      "Custom motion graphics & lower thirds",
      "Cinematic color grading & LUT matching",
      "High-CTR thumbnail concept included"
    ],
    revisions: "3 rounds of revisions",
    deliveryTime: "3-4 business days",
    isRecommended: true,
    active: true
  },
  {
    id: "pkg-ve-premium",
    packageId: "ve-premium",
    service: "Video Editing",
    packageName: "Premium Package",
    description: "Full production polish for high-stakes launches and elite creators.",
    inrPrice: 24999,
    usdPrice: 349,
    isCustomQuote: false,
    features: [
      "Full documentary/commercial grade editing",
      "Up to 30 mins runtime or 5 high-end shorts",
      "Bespoke motion graphic sequences",
      "Studio-grade audio mastering & spatial sound",
      "4K resolution master files",
      "Priority 24/7 direct communication"
    ],
    revisions: "Unlimited reasonable revisions",
    deliveryTime: "5-6 business days",
    isRecommended: false,
    active: true
  },

  // Graphic Designing Packages
  {
    id: "pkg-gd-basic",
    packageId: "gd-basic",
    service: "Graphic Designing",
    packageName: "Basic Package",
    description: "Essential visual assets for individual creators and quick needs.",
    inrPrice: 2499,
    usdPrice: 39,
    isCustomQuote: false,
    features: [
      "3 High-impact social posts or banners",
      "Source files included (PSD/Figma)",
      "High-resolution exports (PNG/JPG)",
      "Typography & lighting enhancement"
    ],
    revisions: "2 rounds of revisions",
    deliveryTime: "24-48 hours",
    isRecommended: false,
    active: true
  },
  {
    id: "pkg-gd-growth",
    packageId: "gd-growth",
    service: "Graphic Designing",
    packageName: "Growth Package",
    description: "Ideal for weekly marketing campaigns and high-converting ads.",
    inrPrice: 6999,
    usdPrice: 99,
    isCustomQuote: false,
    features: [
      "8 Custom creatives (ad banners, posters, carousels)",
      "A/B testing creative variants",
      "Brand consistency audit",
      "Source files + commercial usage rights",
      "Priority delivery"
    ],
    revisions: "3 rounds of revisions",
    deliveryTime: "3 business days",
    isRecommended: true,
    active: true
  },
  {
    id: "pkg-gd-premium",
    packageId: "gd-premium",
    service: "Graphic Designing",
    packageName: "Premium Package",
    description: "Complete monthly creative bundle for active brands.",
    inrPrice: 15999,
    usdPrice: 219,
    isCustomQuote: false,
    features: [
      "20 Custom high-impact creatives",
      "Ad creative suites for Meta & Google",
      "Branding banner overhaul across channels",
      "Dedicated senior designer access",
      "Next-day turnarounds on key assets"
    ],
    revisions: "Unlimited reasonable revisions",
    deliveryTime: "Flexible monthly pacing",
    isRecommended: false,
    active: true
  },

  // Branding Packages
  {
    id: "pkg-br-essential",
    packageId: "br-essential",
    service: "Branding",
    packageName: "Essential Branding",
    description: "For new startups & creators needing a clean, professional identity.",
    inrPrice: 9999,
    usdPrice: 149,
    isCustomQuote: false,
    features: [
      "Primary & Secondary Logo Concepts (3 initial drafts)",
      "Color Palette & Font Pairing System",
      "Social Media Profile Avatar & Banner Kit",
      "Vector source files (AI, SVG, PDF, PNG)"
    ],
    revisions: "3 rounds of revisions",
    deliveryTime: "4 business days",
    isRecommended: false,
    active: true
  },
  {
    id: "pkg-br-complete",
    packageId: "br-complete",
    service: "Branding",
    packageName: "Complete Brand Identity",
    description: "Comprehensive corporate brand system built for long-term scalability.",
    inrPrice: 24999,
    usdPrice: 349,
    isCustomQuote: false,
    features: [
      "Everything in Essential Branding",
      "Full 20+ page Brand Guideline Manual",
      "Iconography set & brand graphic patterns",
      "Stationery & business card designs",
      "Social media template starter pack (Figma/Canva)",
      "Ownership transfer agreement"
    ],
    revisions: "Unlimited design iterations",
    deliveryTime: "7-10 business days",
    isRecommended: true,
    active: true
  },

  // Social Media Packages
  {
    id: "pkg-sm-starter",
    packageId: "sm-starter",
    service: "Social Media",
    packageName: "Starter Plan",
    description: "Consistent visual presence for emerging businesses.",
    inrPrice: 7999,
    usdPrice: 119,
    isCustomQuote: false,
    features: [
      "12 Social media posts per month",
      "Content theme & grid planning",
      "Copywriting suggestions & hashtags",
      "Instagram & LinkedIn formatted versions"
    ],
    revisions: "2 revisions per batch",
    deliveryTime: "Weekly drops",
    isRecommended: false,
    active: true
  },
  {
    id: "pkg-sm-growth",
    packageId: "sm-growth",
    service: "Social Media",
    packageName: "Growth Plan",
    description: "Dynamic mix of video reels and graphic posts for rapid reach.",
    inrPrice: 18999,
    usdPrice: 259,
    isCustomQuote: false,
    features: [
      "8 Short-form Reels/Shorts + 12 Static creatives",
      "Viral hook scripting and editing",
      "Highlight covers & profile makeover",
      "Monthly performance & creative review"
    ],
    revisions: "Fast revisions within 24h",
    deliveryTime: "Weekly scheduled drops",
    isRecommended: true,
    active: true
  }
];
