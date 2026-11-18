import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Check,
  ArrowRight,
  Clock,
  RotateCcw,
  Globe,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { getPricingPackages } from '../lib/firestoreService';
import { PricingPackage } from '../types';
import { initialPricingPackages } from '../lib/mockData';
import { formatINR, formatUSD } from '../lib/utils';
import { QuoteModal } from '../components/common/QuoteModal';

export const Pricing: React.FC = () => {
  const [packages, setPackages] = useState<PricingPackage[]>(initialPricingPackages);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [quoteOpen, setQuoteOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  useEffect(() => {
    getPricingPackages().then(data => {
      if (data && data.length > 0) setPackages(data.filter(p => p.active));
    });
  }, []);

  const categories = ['All', 'Video Editing', 'Graphic Designing', 'Branding', 'Social Media'];

  const filteredPackages = activeCategory === 'All'
    ? packages
    : packages.filter(p => (p.service || p.category || '').toLowerCase().includes(activeCategory.toLowerCase()));

  const handleGetStarted = (service: string, pkgName: string) => {
    setSelectedService(service);
    setSelectedPackage(pkgName);
    setQuoteOpen(true);
  };

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-semibold text-violet-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TRANSPARENT VALUE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          PRICING &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            PACKAGES.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
          Transparent starting plans tailored for creators, startups, and established enterprises. All packages include dedicated creative direction and master exports.
        </p>

        {/* Currency Switcher & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Currency Toggle */}
          <div className="flex items-center bg-[#11131A] border border-[#232738] rounded-full p-1 text-xs">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-1.5 rounded-full font-bold transition-all ${
                currency === 'INR'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              INR (₹) India
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-full font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              USD ($) International
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-white text-[#08090D]'
                  : 'bg-[#141722] text-zinc-400 hover:text-white border border-[#232738]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {filteredPackages.map((pkg) => {
          const isRecommended = pkg.isRecommended;

          return (
            <div
              key={pkg.id || pkg.packageId}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                isRecommended
                  ? 'bg-gradient-to-b from-[#181b2b] to-[#0f111a] border-2 border-violet-500/60 shadow-2xl shadow-violet-500/15 -translate-y-1'
                  : 'bg-[#0f111a] border border-[#232738] hover:border-zinc-700'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                {/* Service Tag & Package Name */}
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-2">
                  <span className="uppercase tracking-wider font-mono text-violet-400">
                    {pkg.service}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{pkg.packageName}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-2xl bg-[#141722] border border-[#232738]/60">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">
                      {currency === 'INR' ? formatINR(pkg.inrPrice || pkg.startingPriceINR || 15000) : formatUSD(pkg.usdPrice || pkg.startingPriceUSD || 250)}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      / starting quote
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Custom scope available upon consultation
                  </p>
                </div>

                {/* Turnaround & Revisions Specs */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-zinc-300">
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#141722]">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{pkg.deliveryTime || '3-5 Business Days'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#141722]">
                    <RotateCcw className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span>{pkg.revisions || '2 Iterative Rounds'}</span>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                    What's Included:
                  </span>
                  {(Array.isArray(pkg.features) ? pkg.features : typeof pkg.features === 'string' ? JSON.parse(pkg.features || '[]') : []).map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action */}
              <button
                onClick={() => handleGetStarted(pkg.service || 'Creative Services', pkg.packageName || pkg.name || 'Custom')}
                className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  isRecommended
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30'
                    : 'bg-[#181b28] hover:bg-[#202538] text-white border border-[#2a3045]'
                }`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* International Custom Quotation Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#141724] to-[#0d101a] border border-[#232738] p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Globe className="w-3.5 h-3.5" />
              <span>INTERNATIONAL CLIENTS & BESPOKE PRODUCTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Need A Custom Tailored Creative Package?
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              We frequently design custom production retainers for international YouTubers, agencies, and high-growth brands. Whether you need monthly video editing batches, rapid 24-hour thumbnail turnarounds, or comprehensive 3D branding, we will construct a bespoke quotation.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            <button
              onClick={() => handleGetStarted('Custom Creative Suite', 'Bespoke Retainer')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-violet-600/20 text-center transition-all"
            >
              Request Custom Quotation
            </button>
            <a
              href="https://wa.me/919398769483?text=Hello%20Dilip%20Visuals!%20I%20am%20looking%20for%20a%20custom%20production%20package%20for%20my%20brand."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#161a26] hover:bg-[#1f2536] border border-[#2a3045] text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialService={selectedService}
        initialPackage={selectedPackage}
      />
    </div>
  );
};
