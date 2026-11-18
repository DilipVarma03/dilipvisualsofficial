import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Target,
  Shield,
  Zap,
  Eye,
  CheckCircle2,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';
import { QuoteModal } from '../components/common/QuoteModal';

export const Vision: React.FC = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  const coreValues = [
    {
      title: "Creativity",
      desc: "Pushing visual boundaries with fresh concepts, original artistic direction, and bespoke treatments.",
      icon: Sparkles
    },
    {
      title: "Quality",
      desc: "Zero tolerance for rushed rendering, sloppy transitions, or poor audio mastering. Every pixel matters.",
      icon: Award
    },
    {
      title: "Innovation",
      desc: "Continuously adopting the latest VFX, 3D pipelines, and AI-accelerated workflows to stay ahead.",
      icon: Zap
    },
    {
      title: "Transparency",
      desc: "Honest pricing, realistic delivery estimates, and upfront communication throughout the project lifecycle.",
      icon: Eye
    },
    {
      title: "Reliability",
      desc: "Meeting deadlines consistently. You can depend on our team to deliver on time, every time.",
      icon: Shield
    },
    {
      title: "Client Satisfaction",
      desc: "We don't consider a project done until you are genuinely thrilled with the final deliverable.",
      icon: Target
    },
    {
      title: "Continuous Improvement",
      desc: "Studying global creative trends and audience retention analytics to sharpen our craft daily.",
      icon: TrendingUp
    }
  ];

  const journeyRoadmap = [
    {
      phase: "Phase 01 — Q4 2026",
      title: "Studio Foundation & Hyderabad HQ",
      desc: "Established Dilip Visuals creative operations in Hyderabad, Telangana, installing high-performance post-production suites and calibrating our color & audio mastering workflows.",
      status: "Active & In Operation"
    },
    {
      phase: "Phase 02 — Active Launch",
      title: "Inaugural Creator & Brand Cohort",
      desc: "Partnering closely with select YouTubers, emerging startups, and local brands to produce showcase-grade case studies with direct founder-level creative direction.",
      status: "Currently Welcoming Partners"
    },
    {
      phase: "Phase 03 — 2027",
      title: "International Creator Expansion",
      desc: "Expanding specialized creative offerings for top-tier creators across the US, UK, UAE, and Southeast Asia, streamlining cross-border timezone workflows.",
      status: "Roadmap Milestone"
    },
    {
      phase: "Phase 04 — Long Term",
      title: "Global Creative Hub & Studio Network",
      desc: "Building a premier creative studio recognized globally for cutting-edge digital storytelling, 3D innovation, and transformative brand narratives.",
      status: "Long-term Horizon"
    }
  ];

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-semibold text-violet-300">
          <Compass className="w-3.5 h-3.5" />
          <span>OUR NORTH STAR</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-tight">
          WE DON'T JUST CREATE VISUALS.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">
            WE CREATE IMPACT.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Built on a vision to deliver world-class digital craftsmanship from Hyderabad to ambitious creators and enterprises worldwide.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#141724] to-[#0A0C13] border border-[#232738] space-y-5 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Eye className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest block">
            Our Vision
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Global Recognition Through Unmatched Quality.
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            "To become a trusted creative partner for brands and creators across India and around the world by delivering extraordinary visual experiences and innovative digital solutions."
          </p>
        </div>

        {/* Mission */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#141724] to-[#0A0C13] border border-[#232738] space-y-5 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            Our Mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Transforming Ideas Into Meaningful Experiences.
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            "To transform ideas into meaningful creative experiences through quality, innovation, and professional execution."
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-white">The Values That Guide Every Pixel</h2>
          <p className="text-zinc-400 text-sm">
            Seven foundational commitments that shape how we think, create, and collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#0f111a] border border-[#1e2233] hover:border-violet-500/40 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#161a26] border border-white/5 flex items-center justify-center text-violet-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{val.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Creative Journey Roadmap */}
      <div className="space-y-12 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <TrendingUp className="w-4 h-4" />
            <span>Forward Trajectory</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Our Creative Journey Timeline</h2>
          <p className="text-zinc-400 text-sm">
            An authentic roadmap tracking our evolution from launch to global presence.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {journeyRoadmap.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#0f111a] border border-[#1e2233] relative flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                  {item.phase}
                </span>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="shrink-0">
                <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-[#161a26] border border-cyan-500/30 text-cyan-300">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-900/30 to-cyan-900/20 border border-violet-500/30 p-10 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Be Part of Our Journey
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          Partner with Dilip Visuals for your next video, thumbnail suite, or brand identity.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setQuoteOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-violet-600/25 hover:from-violet-500 hover:to-indigo-500 transition-all"
          >
            <span>Let's Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
};
