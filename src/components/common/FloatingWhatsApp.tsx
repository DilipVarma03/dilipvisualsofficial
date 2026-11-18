import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface FloatingWhatsAppProps {
  customService?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ customService }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = customService
    ? `Hello Dilip Visuals! I visited your website and I'm interested in your ${customService} services. I would like to discuss a project.`
    : "Hello Dilip Visuals! I visited your website and I'm interested in your creative services. I would like to discuss a project.";

  const [message, setMessage] = useState(defaultMessage);

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919398769483?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#0f111a] border border-[#232738] shadow-2xl p-4 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#232738]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dilip Visuals Studio</h4>
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct WhatsApp Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-zinc-300 leading-relaxed">
            <p className="bg-[#161a26] p-3 rounded-xl border border-white/5">
              👋 Hey there! Need video editing, thumbnails, branding, or 3D visuals? Chat with us directly on WhatsApp for instant project quotes.
            </p>
          </div>

          <div className="space-y-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full text-xs bg-[#090b10] border border-[#232738] rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-emerald-500/60 resize-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleOpenWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start Chat on WhatsApp</span>
            </button>
          </div>
          <p className="text-[10px] text-zinc-400 text-center mt-2">
            Opens official WhatsApp chat with +91 9398769483
          </p>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp with Dilip Visuals"
      >
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-40 blur group-hover:opacity-75 transition duration-300" />
        <MessageSquare className="w-7 h-7 relative z-10" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
      </button>
    </div>
  );
};
