import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare, ArrowUpRight, Mail } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const defaultWhatsAppText = encodeURIComponent(
    "Hello Dilip Visuals! I visited your website and I'm interested in your creative services. I would like to discuss a project."
  );

  return (
    <footer className="bg-[#08090D] border-t border-[#1C202F] pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-violet-900/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1C202F]">
          {/* Brand Info & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showTagline={true} />
            <p className="text-sm font-semibold text-violet-300 italic">
              "Let's create something extraordinary."
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Dilip Visuals is a creative digital agency based in Hyderabad, Telangana. We help creators, startups, and ambitious brands command digital attention through high-retention video editing, visual branding, and 3D visual storytelling.
            </p>

            {/* Direct Contact Action Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={`https://wa.me/919398769483?text=${defaultWhatsAppText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 9398769483</span>
              </a>

              <a
                href="mailto:dilipvisuals@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141724] border border-[#232738] text-zinc-300 hover:text-white text-xs font-semibold hover:border-violet-500/40 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                <span>dilipvisuals@gmail.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com/dilipvisuals"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-[#11131A] border border-[#232738] flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@dilipvisuals"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-[#11131A] border border-[#232738] flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/dilipvisuals"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-[#11131A] border border-[#232738] flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/dilipvisuals"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-xl bg-[#11131A] border border-[#232738] flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Quick Navigation</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-violet-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-violet-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/vision" className="hover:text-violet-400 transition-colors">Our Vision</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-violet-400 transition-colors">Portfolio & Showcase</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-violet-400 transition-colors">Pricing & Plans</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-violet-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Creative Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Our Services</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">Professional Video Editing</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">Graphic Designing</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">YouTube Thumbnail Designing</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">Branding and Visual Identity</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">Social Media Management</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">3D and Blender Projects</Link>
              </li>
            </ul>
          </div>

          {/* Direct Studio Contacts */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Direct Contacts</h3>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/919398769483?text=${defaultWhatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-mono"
                >
                  +91 9398769483
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:dilipvisuals@gmail.com"
                  className="hover:text-cyan-400 transition-colors font-mono"
                >
                  dilipvisuals@gmail.com
                </a>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-md shadow-violet-600/20"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 DILIP VISUALS. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Hyderabad, Telangana, India • Serving Worldwide</span>
            <Link to="/contact" className="hover:text-zinc-300 transition-colors">Privacy & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
