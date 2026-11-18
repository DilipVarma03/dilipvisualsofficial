import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnnouncementBarProps {
  text?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = "NOW ACCEPTING NEW PROJECTS | INDIA & WORLDWIDE"
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0d0f17] via-[#161226] to-[#0d0f17] border-b border-violet-500/20 py-2 text-xs">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden w-full justify-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wider text-zinc-300 uppercase">
            {text}
          </span>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1 text-violet-400 hover:text-cyan-400 font-medium ml-3 transition-colors group"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
