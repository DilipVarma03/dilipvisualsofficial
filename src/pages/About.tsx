import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Award, Heart, CheckCircle2, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { getWebsiteContent } from '../lib/firestoreService';
import { WebsiteContent } from '../types';
import { initialWebsiteContent } from '../lib/mockData';
import { QuoteModal } from '../components/common/QuoteModal';

export const About: React.FC = () => {
  const [content, setContent] = useState<WebsiteContent>(initialWebsiteContent);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    getWebsiteContent().then(setContent);
  }, []);

  const workingPrinciples = [
    {
      title: "Visual Authenticity",
      desc: "We prioritize distinct, brand-specific aesthetics over cookie-cutter trends, giving each project its own unmistakable signature."
    },
    {
      title: "Viewer Psychology",
      desc: "Great visuals are engineered to evoke emotion and sustain retention. We design with pacing, contrast, and cognitive flow in mind."
    },
    {
      title: "Uncompromising Polish",
      desc: "A single loose cut or misaligned typography element ruins immersion. We obsess over the microscopic details."
    },
    {
      title: "Transparent Collaboration",
      desc: "Clear timelines, open feedback loops, and direct WhatsApp communication so you're always in complete control of your creative assets."
    }
  ];

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Hero / Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-semibold text-violet-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT DILIP VISUALS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          CREATIVITY WITH A{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            PURPOSE.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
          Dilip Visuals is a creative digital agency built with a vision to transform ideas into powerful visual experiences. We believe every brand has a story worth telling.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-400 pt-2">
          <MapPin className="w-4 h-4 text-violet-400" />
          <span>Based in Hyderabad, Telangana, India — Creating Worldwide</span>
        </div>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Award className="w-4 h-4" />
            <span>Our Story & Mission</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Transforming Ideas Into Meaningful Creative Realities.
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Our mission is to help businesses, creators, and entrepreneurs communicate their unique story through professional video editing, creative graphic design, and modern digital branding.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We focus on creativity, consistency, quality, and meaningful client relationships. We are just beginning our journey, and we are excited to create something extraordinary with visionary partners across India and internationally.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#111420] border border-[#232738]">
              <div className="text-xl font-bold text-white mb-1">0% Fake Fluff</div>
              <div className="text-xs text-zinc-400">Pure, genuine commitment and authentic creative dedication.</div>
            </div>
            <div className="p-4 rounded-xl bg-[#111420] border border-[#232738]">
              <div className="text-xl font-bold text-white mb-1">100% Focused</div>
              <div className="text-xs text-zinc-400">Founder-led attention on every project we accept.</div>
            </div>
          </div>
        </div>

        {/* Philosophy Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141724] to-[#0A0C13] border border-[#232738] p-8 sm:p-10 space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl p-1 bg-gradient-to-b from-amber-500/20 to-transparent border border-amber-500/30 overflow-hidden shadow-lg shadow-amber-500/10">
            <img src="/logo-mark.jpg" alt="Dilip Visuals Emblem" className="w-full h-full object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-white">Our Creative Philosophy</h3>
          <p className="text-zinc-300 text-sm leading-relaxed">
            "Visuals are not decorative ornaments; they are the frontline ambassadors of your identity. When an audience encounters your video or brand graphic, they form an impression in milliseconds. We make sure that impression radiates authority, taste, and excellence."
          </p>
          <div className="pt-4 border-t border-[#232738] flex items-center justify-between">
            <span className="text-xs font-mono text-violet-400 uppercase">Dilip Visuals Ethos</span>
            <span className="text-xs text-zinc-400">Hyderabad Studio</span>
          </div>
        </div>
      </div>

      {/* Working Principles */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Our Working Principles</h2>
          <p className="text-zinc-400 text-sm">
            How we approach every frame, canvas, and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workingPrinciples.map((principle, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0f111a] border border-[#1e2233] space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-mono text-xs font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white">{principle.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founding Leadership Section */}
      <div className="space-y-12 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Creative Leadership</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Meet The Founder</h2>
          <p className="text-zinc-400 text-sm">
            Direct creative vision from our Hyderabad headquarters.
          </p>
        </div>

        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#0f111a] border border-[#232738] flex flex-col sm:flex-row items-center gap-8 shadow-2xl">
          {/* Avatar with gradient border */}
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-1 shrink-0">
            <div className="w-full h-full bg-[#141724] rounded-[14px] flex items-center justify-center text-3xl font-black text-white">
              {(content.founderName || 'Dilip').charAt(0)}
            </div>
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <div>
              <h3 className="text-2xl font-bold text-white">{content.founderName || 'Dilip'}</h3>
              <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                {content.founderRole || 'Founder & Creative Lead'}
              </p>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {content.founderBio}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <a
                href="https://wa.me/919398769483?text=Hello%20Dilip!%20I%20visited%20the%20Dilip%20Visuals%20About%20page%20and%20would%20like%20to%20discuss%20a%20creative%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 9398769483</span>
              </a>
              <a
                href="mailto:dilipvisuals@gmail.com"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141724] border border-[#232738] text-zinc-300 hover:text-white text-xs font-semibold hover:border-violet-500/40 transition-colors"
              >
                <span>dilipvisuals@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-900/30 to-cyan-900/20 border border-violet-500/30 p-10 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Begin Your Creative Partnership With Us
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          We are currently taking on select new projects. Let's discuss your timeline and creative objectives.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-violet-600/25 hover:from-violet-500 hover:to-indigo-500 transition-all"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/919398769483?text=Hello%20Dilip%20Visuals!%20I%20would%20like%20to%20discuss%20a%20creative%20partnership."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
};
