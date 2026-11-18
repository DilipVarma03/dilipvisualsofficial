import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MessageSquare, Mail } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Vision', path: '/vision' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const defaultWhatsAppText = encodeURIComponent(
    "Hello Dilip Visuals! I visited your website and I'm interested in your creative services. I would like to discuss a project."
  );

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08090D]/90 border-b border-[#232738]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Agency Logo */}
          <div className="shrink-0">
            <Logo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 rounded-full px-4 py-1.5 bg-[#11131A]/90 border border-[#232738] shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-violet-600/30 to-cyan-600/30 border border-violet-500/40 text-glow'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Direct WhatsApp Button */}
            <a
              href={`https://wa.me/919398769483?text=${defaultWhatsAppText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
              title="Chat directly on WhatsApp (+91 9398769483)"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Email Mailto Button */}
            <a
              href="mailto:dilipvisuals@gmail.com"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-[#141724] hover:bg-[#1c2033] border border-[#232738] transition-all"
              title="Send email to dilipvisuals@gmail.com"
            >
              <Mail className="w-3.5 h-3.5 text-violet-400" />
              <span>Email Us</span>
            </a>

            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={`https://wa.me/919398769483?text=${defaultWhatsAppText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 sm:hidden"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-[#11131A] border border-[#232738] text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-[#08090D]/95 border-b border-[#232738] px-4 pt-3 pb-6 space-y-4 backdrop-blur-2xl animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-[#232738] flex flex-col gap-2.5">
            {/* Mobile WhatsApp Button */}
            <a
              href={`https://wa.me/919398769483?text=${defaultWhatsAppText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 9398769483)</span>
            </a>

            {/* Mobile Email Button */}
            <a
              href="mailto:dilipvisuals@gmail.com"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#141724] border border-[#232738] text-zinc-300 font-semibold text-xs"
            >
              <Mail className="w-4 h-4 text-violet-400" />
              <span>Email dilipvisuals@gmail.com</span>
            </a>

            {/* Mobile Primary CTA */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-violet-600/25"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
