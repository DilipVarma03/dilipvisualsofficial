import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Video,
  Palette,
  Layers,
  Film,
  Box,
  Share2,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  MessageSquare,
  Mail,
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { QuoteModal } from '../components/common/QuoteModal';

export const Home: React.FC = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openQuote = (service = '') => {
    setSelectedService(service);
    setQuoteModalOpen(true);
  };

  const services = [
    {
      title: "Professional Video Editing",
      icon: Video,
      color: "from-violet-500 to-indigo-500",
      description: "High-retention editing for YouTube, viral short-form reels, documentaries, and commercial campaigns with cinematic pacing, dynamic visual hooks, and audio mastering.",
      tags: ["YouTube Longform", "Instagram Reels", "Shorts", "Sound Design"]
    },
    {
      title: "Graphic Designing",
      icon: Palette,
      color: "from-cyan-500 to-blue-500",
      description: "High-impact visual marketing assets, advertising banners, event posters, presentation decks, and commercial graphics engineered to command digital attention.",
      tags: ["Ad Creatives", "Social Creatives", "Ad Banners", "Marketing Art"]
    },
    {
      title: "YouTube Thumbnail Designing",
      icon: Palette,
      color: "from-amber-500 to-orange-500",
      description: "Scroll-stopping, high-CTR YouTube thumbnails built with facial expression enhancements, 3D rim glows, extreme contrast theory, and focal hierarchy.",
      tags: ["15%+ CTR Target", "3D Glows", "High Contrast", "Mobile Optimized"]
    },
    {
      title: "Branding and Visual Identity",
      icon: Layers,
      color: "from-fuchsia-500 to-purple-500",
      description: "Distinguished brand identities, vector logo marks, typography hierarchies, and complete design guideline systems built for modern digital authority.",
      tags: ["Logo Systems", "Brand Guidelines", "Color Systems", "Brand Manual"]
    },
    {
      title: "Social Media Management",
      icon: Share2,
      color: "from-rose-500 to-pink-500",
      description: "End-to-end creative direction, monthly content design packages, swipeable educational carousels, and visual grid architectures tailored for creators and enterprises.",
      tags: ["Content Systems", "Carousels", "Grid Layouts", "Growth Kits"]
    },
    {
      title: "3D and Blender Projects",
      icon: Box,
      color: "from-emerald-500 to-teal-500",
      description: "Photorealistic 3D product visualization, studio product renders, procedural texturing, and surreal concept animations engineered in Blender.",
      tags: ["Cycles Renders", "Product Visuals", "Physics Motion", "3D Concepts"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Creative Brief",
      desc: "We analyze your audience, content style, brand positioning, and objectives to define a clear creative roadmap."
    },
    {
      step: "02",
      title: "Concept & Art Direction",
      desc: "Our creative directors blueprint pacing, visual motifs, typography, color palettes, and auditory storytelling."
    },
    {
      step: "03",
      title: "High-Caliber Production",
      desc: "We bring your footage and assets into our editing suite, applying frame-by-frame cuts, sound design, and motion design."
    },
    {
      step: "04",
      title: "Review & Precision Polish",
      desc: "Direct collaboration via WhatsApp and email, ensuring smooth review and precision polish until absolute perfection."
    },
    {
      step: "05",
      title: "Master Delivery & Impact",
      desc: "You receive high-bitrate master files ready for multi-platform distribution and maximum audience engagement."
    }
  ];

  const whyChooseUs = [
    {
      title: "Bold Creativity",
      desc: "We break away from repetitive templates to create visually unique, attention-commanding creative work.",
      icon: Sparkles
    },
    {
      title: "Professional Execution",
      desc: "Strict adherence to deadlines, structured communication, and uncompromising quality standards.",
      icon: ShieldCheck
    },
    {
      title: "Modern Thinking",
      desc: "We study algorithms, viewer retention curves, and visual psychology to maximize engagement.",
      icon: Zap
    },
    {
      title: "Attention to Detail",
      desc: "Every cut, sound effect, font pairing, and color grade is calibrated to perfection.",
      icon: Compass
    },
    {
      title: "Client-Centric Collaboration",
      desc: "Transparent workflows with direct WhatsApp communication, swift turnaround, and structured revision rounds.",
      icon: MessageSquare
    },
    {
      title: "Global Standards from Hyderabad",
      desc: "Proudly based in Hyderabad, Telangana, delivering international-standard production for creators worldwide.",
      icon: Radio
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background ambient lighting and grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,0.22),rgba(8,9,13,0))]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          {/* Animated Official DILIP VISUALS Logo */}
          <div className="flex justify-center -mb-2">
            <div className="relative group p-1.5 rounded-3xl bg-gradient-to-b from-amber-500/25 via-amber-500/10 to-transparent shadow-2xl shadow-amber-500/15">
              <img
                src="/logo.jpg"
                alt="Dilip Visuals Official Logo"
                className="w-28 sm:w-36 md:w-40 h-auto object-contain rounded-2xl border border-amber-500/30 group-hover:scale-105 group-hover:border-amber-400/60 transition-all duration-500 shadow-inner"
              />
            </div>
          </div>

          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141722]/90 border border-amber-500/30 text-xs font-semibold text-amber-200 shadow-lg shadow-amber-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span>HYDERABAD, INDIA • SERVING CREATORS & BRANDS GLOBALLY</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] max-w-4xl mx-auto uppercase">
            WE TURN IDEAS INTO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#8B5CF6] to-[#06B6D4]">
              EXTRAORDINARY
            </span>{' '}
            VISUAL EXPERIENCES.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Creative thinking. Powerful storytelling. Extraordinary execution. We help brands and creators build a strong digital identity through innovative creative solutions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/919398769483?text=Hello%20Dilip%20Visuals!%20I%20visited%20your%20website%20and%20I'm%20interested%20in%20your%20creative%20services.%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 hover:scale-105 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>

            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-zinc-300 bg-[#12141F] hover:bg-[#1A1D2B] border border-[#232738] hover:border-violet-500/40 transition-all duration-300"
            >
              <span>Explore Services</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>

          {/* Target Audience Badges */}
          <div className="pt-10 border-t border-[#1C202F]/60 max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Crafted For Visionaries
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-300">
              <span className="px-3 py-1.5 rounded-full bg-[#141722] border border-[#232738]">YouTubers & Creators</span>
              <span className="px-3 py-1.5 rounded-full bg-[#141722] border border-[#232738]">Influencers & Podcasters</span>
              <span className="px-3 py-1.5 rounded-full bg-[#141722] border border-[#232738]">Startups & Tech Ventures</span>
              <span className="px-3 py-1.5 rounded-full bg-[#141722] border border-[#232738]">Small & Medium Businesses</span>
              <span className="px-3 py-1.5 rounded-full bg-[#141722] border border-[#232738]">International Brands</span>
              <span className="px-3 py-1.5 rounded-full bg-[#141722] border border-[#232738]">Personal Brands</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Full-Spectrum Creative Agency</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Crafted To Command Attention.
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            From high-retention video cuts to complete brand identity systems, we deliver digital assets that set you miles apart from competitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#0f111a] border border-[#1e2233] p-7 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${srv.color} p-0.5 shadow-lg mb-6`}>
                    <div className="w-full h-full bg-[#08090D] rounded-[10px] flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {srv.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#161926] text-zinc-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1C202F] flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/919398769483?text=${encodeURIComponent(
                      `Hello Dilip Visuals! I visited your website and I'm interested in your ${srv.title} services. I would like to discuss a project.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => openQuote(srv.title)}
                    className="text-xs font-bold text-violet-400 hover:text-cyan-400 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Authentic Coming-Soon Portfolio Section (Honest Agency Launch) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#111422] to-[#0A0C13] border border-[#232738] p-8 sm:p-14 overflow-hidden">
          {/* Ambient background effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-semibold text-violet-400">
              <Clock className="w-3.5 h-3.5" />
              <span>THE CREATIVE JOURNEY BEGINS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Our Studio Is In Full Motion.
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Dilip Visuals is a brand-new, independent creative agency based in Hyderabad. We believe in 100% honesty and genuine excellence: we do not use fake portfolio items, inflated client numbers, or synthetic testimonials.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Our studio suites are actively humming with initial production drops, high-retention video frameworks, and custom identity experiments. We are currently welcoming our inaugural cohort of creator and brand partners with dedicated founder-level focus.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#141722]/80 border border-[#232738]">
                <div className="text-violet-400 font-mono text-xs font-bold uppercase mb-1">Status</div>
                <div className="text-white font-bold text-base">Inaugural Cohort Open</div>
                <div className="text-zinc-400 text-xs mt-1">Accepting select new projects</div>
              </div>
              <div className="p-4 rounded-xl bg-[#141722]/80 border border-[#232738]">
                <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-1">Standard</div>
                <div className="text-white font-bold text-base">Cinema & Retention</div>
                <div className="text-zinc-400 text-xs mt-1">Zero shortcuts, zero fluff</div>
              </div>
              <div className="p-4 rounded-xl bg-[#141722]/80 border border-[#232738]">
                <div className="text-emerald-400 font-mono text-xs font-bold uppercase mb-1">Founder Direct</div>
                <div className="text-white font-bold text-base">Personal Attention</div>
                <div className="text-zinc-400 text-xs mt-1">Direct creative leadership</div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-violet-600/25 transition-all"
              >
                <span>Explore Creative Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/919398769483?text=Hello%20Dilip%20Visuals!%20I%20visited%20your%20website%20and%20I'm%20interested%20in%20your%20creative%20services.%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#161a26] hover:bg-[#1f2536] border border-[#2a3045] text-emerald-400 font-semibold text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Flame className="w-4 h-4" />
            <span>Why Dilip Visuals</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Built On Uncompromising Standards.
          </h2>
          <p className="text-zinc-400 text-sm">
            We don't merely provide services; we function as your dedicated in-house creative force, obsessing over every frame and pixel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#0f111a] border border-[#1e2233] hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#161926] border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Creative Process Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1C202F]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
            <Compass className="w-4 h-4" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Creative Process.
          </h2>
          <p className="text-zinc-400 text-sm">
            A battle-tested workflow from initial consultation to final high-resolution render.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-[#0f111a] border border-[#1e2233] flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500 mb-4 block">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-violet-900/40 via-[#11131A] to-cyan-900/30 border border-violet-500/30 p-10 sm:p-16 text-center space-y-6 overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 mx-auto">
            <div className="w-full h-full bg-[#08090D] rounded-[14px] flex items-center justify-center text-white">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Ready To Create Something Extraordinary?
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto">
            Whether you need a high-retention video editor, a complete rebrand, or scroll-stopping graphics, we are ready to elevate your vision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-600/30 transition-all"
            >
              Start Your Project
            </Link>
            <a
              href="https://wa.me/919398769483?text=Hello%20Dilip%20Visuals!%20I%20visited%20your%20website%20and%20I'm%20interested%20in%20your%20creative%20services.%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct (+91 9398769483)</span>
            </a>
            <a
              href="mailto:dilipvisuals@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-zinc-300 bg-[#141724] hover:bg-[#1a1e2f] border border-[#232738] transition-all"
            >
              <Mail className="w-4 h-4 text-violet-400" />
              <span>Email dilipvisuals@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};
