import React, { useState, useEffect } from 'react';
import {
  Video,
  Palette,
  Sparkles,
  Film,
  Box,
  Share2,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Users
} from 'lucide-react';
import { getServices } from '../lib/firestoreService';
import { ServiceItem } from '../types';
import { initialServices } from '../lib/mockData';
import { QuoteModal } from '../components/common/QuoteModal';

export const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [selectedService, setSelectedService] = useState<string>('');
  const [quoteOpen, setQuoteOpen] = useState<boolean>(false);

  useEffect(() => {
    getServices().then(data => {
      if (data && data.length > 0) setServices(data.filter(s => s.active));
    });
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return Video;
      case 'Palette':
        return Palette;
      case 'Sparkles':
        return Sparkles;
      case 'Film':
        return Film;
      case 'Box':
        return Box;
      case 'Share2':
        return Share2;
      default:
        return Sparkles;
    }
  };

  const handleRequestQuote = (title: string) => {
    setSelectedService(title);
    setQuoteOpen(true);
  };

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION-GRADE CAPABILITIES</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          OUR CREATIVE{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            SERVICES.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
          From viral retention video editing to complete brand identity systems, we combine aesthetic mastery with deep digital psychology to elevate your presence.
        </p>
      </div>

      {/* Services List / Cards */}
      <div className="space-y-12">
        {services.map((srv, idx) => {
          const Icon = getServiceIcon(srv.icon);
          const isEven = idx % 2 === 0;

          return (
            <div
              key={srv.id || idx}
              id={srv.serviceId}
              className={`rounded-3xl bg-[#0f111a] border border-[#232738] p-8 sm:p-12 transition-all hover:border-violet-500/40 relative overflow-hidden`}
            >
              {/* Ambient accent background glow */}
              <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none`} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 shrink-0">
                      <div className="w-full h-full bg-[#08090D] rounded-[14px] flex items-center justify-center text-white">
                        <Icon className="w-7 h-7 text-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-violet-400 uppercase tracking-widest block">
                        Service 0{idx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-cyan-300">
                    {srv.subtitle}
                  </p>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Suitable For */}
                  <div className="p-4 rounded-xl bg-[#141724] border border-[#232738] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                      <Users className="w-3.5 h-3.5 text-violet-400" />
                      <span>Ideal For:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(srv.suitableFor) ? srv.suitableFor : typeof srv.suitableFor === 'string' ? JSON.parse(srv.suitableFor || '[]') : []).map((item: string, sIdx: number) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-[#1d2233] text-zinc-300 border border-white/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => handleRequestQuote(srv.title)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-violet-600/20 transition-all"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/919398769483?text=${encodeURIComponent(
                        `Hello Dilip Visuals! I visited your website and I'm interested in your ${srv.title} services. I would like to discuss a project.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Right Deliverables */}
                <div className="lg:col-span-7 rounded-2xl bg-[#131622]/90 border border-[#232738] p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#232738]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Standard Production Deliverables
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-mono font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Master Quality
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(Array.isArray(srv.deliverables) ? srv.deliverables : typeof srv.deliverables === 'string' ? JSON.parse(srv.deliverables || '[]') : []).map((item: string, dIdx: number) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#232738] flex items-center justify-between text-xs text-zinc-400">
                    <span>Includes high-resolution assets & revision rounds</span>
                    <button
                      onClick={() => handleRequestQuote(`${srv.title} Custom Package`)}
                      className="text-violet-400 hover:text-cyan-400 font-semibold transition-colors"
                    >
                      Need Custom Scope? →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};
