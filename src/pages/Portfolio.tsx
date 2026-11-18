import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Video,
  Palette,
  Image as ImageIcon,
  Layers,
  Box,
  Share2,
  ArrowRight,
  MessageSquare,
  Mail,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  service: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: string;
  color: string;
  icon: any;
}

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Professional Video Editing',
    'YouTube Thumbnail Designing',
    'Graphic Designing',
    'Branding and Visual Identity',
    '3D and Blender Projects',
    'Social Media Management'
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'video-editing-longform',
      title: 'High-Retention YouTube Longform Editing',
      category: 'Professional Video Editing',
      service: 'Professional Video Editing',
      tagline: 'Cinematic Pacing • Retention Engineering • Sound Design',
      description: 'Engineered specifically for creators and documentary channels to sustain viewer engagement. We implement meticulous pacing, micro-transitions, cinematic sound design, and custom motion graphics to eliminate viewer drop-off.',
      highlights: [
        'Hook optimization in the first 30 seconds',
        'Multi-layer Foley audio & atmospheric soundscapes',
        'Dynamic zoom cuts, motion blur & speed ramping',
        'Kinetic title overlays & illustrative graphics'
      ],
      specs: '4K Ultra HD • 60 FPS • Rec.709 Master Export',
      color: 'from-violet-600 to-indigo-600',
      icon: Video
    },
    {
      id: 'video-editing-shortform',
      title: 'Viral Short-Form Reels & YouTube Shorts',
      category: 'Professional Video Editing',
      service: 'Professional Video Editing',
      tagline: 'Scroll-Stopping Hooks • Dynamic Captions • High Pacing',
      description: 'Crafted for Instagram Reels, YouTube Shorts, and TikTok. Built around retention psychology with fast-paced cuts every 1.5–2 seconds, custom highlighted animated captions, and sound effects that drive algorithmic distribution.',
      highlights: [
        'Instant pattern-interrupt visual hooks',
        'Custom stylized animated subtitles with emojis',
        'Sound effects aligned to key phrases',
        'Vertical 9:16 optimized visual hierarchy'
      ],
      specs: '1080x1920 Vertical • 60 FPS • High Bitrate',
      color: 'from-fuchsia-600 to-pink-600',
      icon: Video
    },
    {
      id: 'thumbnails-high-ctr',
      title: 'High-CTR YouTube Thumbnail Systems',
      category: 'YouTube Thumbnail Designing',
      service: 'YouTube Thumbnail Designing',
      tagline: 'Visual Hook Hierarchy • Contrast Theory • 15%+ CTR Target',
      description: 'Designed to dominate YouTube recommended feeds and search results. We combine facial expression enhancement, 3D rim lighting, background depth separation, and crisp focal points that trigger curiosity without cheap clickbait.',
      highlights: [
        'Extreme contrast & complementary color palettes',
        'Subject cutouts with custom lighting & rim glows',
        'Mobile-tested readability at miniature display scales',
        'Bold 2-3 word typography hooks'
      ],
      specs: '1920x1080 Full HD • sRGB Color Calibrated',
      color: 'from-amber-500 to-orange-500',
      icon: ImageIcon
    },
    {
      id: 'branding-identity',
      title: 'Modern Brand Identity & Vector Systems',
      category: 'Branding and Visual Identity',
      service: 'Branding and Visual Identity',
      tagline: 'Distinct Logo Marks • Color Palettes • Typography Rules',
      description: 'Complete brand foundations for startups, creators, and modern businesses. We design cohesive visual identities that look commanding on digital screens, apps, social platforms, and physical collateral.',
      highlights: [
        'Minimalist, scalable vector logo marks',
        'Curated color palettes with high-contrast accessibility',
        'Typography hierarchy for headlines & body text',
        'Comprehensive brand guidelines manual (PDF)'
      ],
      specs: 'Vector SVG • AI • High-Resolution PNG & Brand Book',
      color: 'from-cyan-500 to-blue-600',
      icon: Layers
    },
    {
      id: 'blender-3d-visuals',
      title: '3D Product & Blender Visual Concepts',
      category: '3D and Blender Projects',
      service: '3D and Blender Projects',
      tagline: 'Photorealistic Lighting • Blender Physics • Product Renders',
      description: 'Cutting-edge 3D product visualizations, procedural textures, studio product mockups, and abstract motion loops built in Blender. Perfect for tech hardware, premium lifestyle goods, and modern digital campaigns.',
      highlights: [
        'Photorealistic Cycles rendering with ray-tracing',
        'Physical material properties & micro-textures',
        'Dramatic studio three-point key lighting',
        '360° product showcase animations & still hero frames'
      ],
      specs: '4K Still Renders • 60 FPS Loop Animations',
      color: 'from-emerald-500 to-teal-600',
      icon: Box
    },
    {
      id: 'graphic-designing-creatives',
      title: 'Digital Marketing Graphics & Ad Creatives',
      category: 'Graphic Designing',
      service: 'Graphic Designing',
      tagline: 'High-Converting Creatives • Event Posters • Banners',
      description: 'High-impact visual creatives designed for paid advertising campaigns, promotional launches, website banners, and print-ready event posters that convey immediate brand prestige.',
      highlights: [
        'Engineered for Meta Ads, Google Display & LinkedIn',
        'Clear visual CTA hierarchy that increases conversion',
        'Sharp typography balancing elegance and readability',
        'Multi-format export presets for desktop and mobile'
      ],
      specs: '1:1 Square, 4:5 Portrait, 16:9 Landscape',
      color: 'from-purple-600 to-violet-600',
      icon: Palette
    },
    {
      id: 'social-media-management',
      title: 'Social Media Grid Architecture & Carousels',
      category: 'Social Media Management',
      service: 'Social Media Management',
      tagline: 'Feed Consistency • Swipeable Carousels • Content Kits',
      description: 'Strategic visual frameworks for brands looking to maintain a cohesive, authoritative digital footprint. We design swipeable educational carousels, custom story templates, and monthly asset suites.',
      highlights: [
        'Swipe-optimized multi-slide Instagram carousels',
        'Cohesive feed aesthetic that communicates authority',
        'Editable Figma & Canva master templates',
        'Story engagement stickers & highlighted covers'
      ],
      specs: '1080x1350 High-Resolution Carousel Presets',
      color: 'from-rose-500 to-pink-600',
      icon: Share2
    }
  ];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-semibold text-violet-300">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>AGENCY CREATIVE SHOWCASE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          OUR WORK.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">
            OUR STANDARD.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          We combine cutting-edge visual aesthetics, high-retention editing techniques, and digital storytelling to build extraordinary brand identities.
        </p>

        {/* Authenticity Pledge Notice */}
        <div className="p-5 rounded-2xl bg-[#0f111a] border border-[#232738] max-w-2xl mx-auto text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>100% Genuine Agency Launch Pledge</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Dilip Visuals is a newly launched creative agency operating from Hyderabad, Telangana. We reject fake statistics, fabricated client logos, and manufactured testimonials. Instead, our actual creative disciplines, style treatments, and technical standards are showcased below.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-600/25'
                : 'bg-[#12141F] text-zinc-400 hover:text-white border border-[#232738] hover:border-violet-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const whatsappUrl = `https://wa.me/919398769483?text=${encodeURIComponent(
            `Hello Dilip Visuals! I saw your portfolio showcase for "${item.title}". I would like to discuss a similar project for my brand.`
          )}`;

          return (
            <div
              key={item.id}
              className="rounded-3xl bg-[#0f111a] border border-[#1e2233] hover:border-violet-500/40 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl relative overflow-hidden"
            >
              {/* Background gradient orb */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-[#08090D] rounded-[10px] flex items-center justify-center text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-violet-400 uppercase tracking-widest block">
                        {item.category}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">Production Capability</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs font-semibold text-cyan-300 font-mono">{item.tagline}</p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Key Execution Standards:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {item.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specs Pill */}
                <div className="p-3 rounded-xl bg-[#141724] border border-[#232738] flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Standard Output:</span>
                  <span className="text-white font-mono font-bold">{item.specs}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t border-[#1C202F] flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss on WhatsApp</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#161a26] hover:bg-[#1e2333] border border-[#2a3045] text-zinc-200 font-semibold text-xs hover:border-violet-500/50 transition-all"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inaugural Partnership Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-900/40 via-[#11131A] to-cyan-900/30 border border-violet-500/30 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 mx-auto">
            <div className="w-full h-full bg-[#08090D] rounded-[14px] flex items-center justify-center text-white">
              <Sparkles className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Be Part of Our Inaugural Partner Cohort.
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Every great brand starts with a vision. We are currently accepting select creators, entrepreneurs, and startups for our inaugural portfolio drop with direct founder-level creative leadership from Dilip.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/919398769483?text=Hello%20Dilip%20Visuals!%20I%20would%20like%20to%20discuss%20partnering%20with%20your%20inaugural%20cohort."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-600/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Directly on WhatsApp</span>
            </a>

            <a
              href="mailto:dilipvisuals@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-zinc-200 bg-[#141724] hover:bg-[#1a1e2f] border border-[#232738] hover:border-violet-500/40 transition-all"
            >
              <Mail className="w-4 h-4 text-violet-400" />
              <span>Email dilipvisuals@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
