import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { createEnquiry } from '../../lib/firestoreService';
import { useToast } from '../../context/ToastContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialPackage?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
  initialPackage = ''
}) => {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    service: initialService || 'Video Editing',
    package: initialPackage || '',
    budget: '₹10,000 - ₹25,000',
    description: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'email' | 'call'
  });

  useEffect(() => {
    if (initialService) setFormData(prev => ({ ...prev, service: initialService }));
    if (initialPackage) setFormData(prev => ({ ...prev, package: initialPackage }));
    setSubmittedEnquiryId(null);
  }, [initialService, initialPackage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const result = await createEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        service: formData.service,
        package: formData.package || undefined,
        budget: formData.budget,
        description: formData.description || `Interested in ${formData.service}${formData.package ? ` (${formData.package})` : ''}`,
        preferredContact: formData.preferredContact
      });

      setSubmittedEnquiryId(result.enquiryId || result.enquiryNumber || 'DV-ENQ-2026');
      success("Enquiry Submitted Successfully!", `Your Reference ID: ${result.enquiryId || result.enquiryNumber || 'DV-ENQ-2026'}`);
    } catch (err) {
      error("Failed to submit enquiry. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppFollowup = () => {
    const text = encodeURIComponent(
      `Hello Dilip Visuals! I submitted an enquiry (Ref: ${submittedEnquiryId || 'New Project'}) for ${formData.service} (${formData.package || 'Custom'}). I would like to connect!`
    );
    window.open(`https://wa.me/919398769483?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#0e1017] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedEnquiryId ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">We Received Your Request!</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              Thank you for reaching out to <span className="text-white font-semibold">Dilip Visuals</span>. Our creative team will review your project requirements and respond within 12 hours.
            </p>

            <div className="p-4 bg-[#141722] border border-[#232738] rounded-xl max-w-xs mx-auto">
              <span className="text-xs text-zinc-400 uppercase tracking-wider block">Your Enquiry Reference</span>
              <span className="text-lg font-mono font-bold text-violet-400">{submittedEnquiryId}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
              <button
                onClick={handleWhatsAppFollowup}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Connect on WhatsApp Now</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-[#1c202e] hover:bg-[#252b3e] text-zinc-300 font-semibold text-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Project Consultation & Quote</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Let's Create Something Extraordinary</h2>
            <p className="text-xs text-zinc-400">
              Fill out your details below and our Hyderabad creative studio will prepare a tailored proposal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Reddy"
                  className="w-full bg-[#141722] border border-[#232738] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Gmail / Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@gmail.com"
                  className="w-full bg-[#141722] border border-[#232738] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9398769483"
                  className="w-full bg-[#141722] border border-[#232738] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                  placeholder="India, USA, UAE, etc."
                  className="w-full bg-[#141722] border border-[#232738] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Selected Service</label>
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#141722] border border-[#232738] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="Video Editing">Video Editing</option>
                  <option value="Graphic Designing">Graphic Designing</option>
                  <option value="Branding and Visual Identity">Branding and Visual Identity</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                  <option value="3D Design and Creative Visuals">3D Design & Creative Visuals</option>
                  <option value="Social Media Creative Solutions">Social Media Creative Solutions</option>
                  <option value="Custom Creative Consultation">Custom Creative Consultation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Package (Optional)</label>
                <input
                  type="text"
                  value={formData.package}
                  onChange={e => setFormData({ ...formData, package: e.target.value })}
                  placeholder="e.g. Professional Package"
                  className="w-full bg-[#141722] border border-[#232738] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Estimated Budget</label>
                <select
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-[#141722] border border-[#232738] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="Under ₹10,000 / $150">Under ₹10,000 / $150</option>
                  <option value="₹10,000 - ₹25,000 / $150 - $350">₹10,000 - ₹25,000 / $150 - $350</option>
                  <option value="₹25,000 - ₹50,000 / $350 - $700">₹25,000 - ₹50,000 / $350 - $700</option>
                  <option value="₹50,000+ / $700+">₹50,000+ / $700+ (Enterprise)</option>
                  <option value="Flexible / Custom Quotation">Flexible / Custom Quotation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Preferred Contact Method</label>
                <select
                  value={formData.preferredContact}
                  onChange={e => setFormData({ ...formData, preferredContact: e.target.value as any })}
                  className="w-full bg-[#141722] border border-[#232738] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="whatsapp">WhatsApp (Recommended for fast response)</option>
                  <option value="email">Email</option>
                  <option value="call">Phone Call</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Project Brief / Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about your project, your channel or brand, deadlines, reference links..."
                className="w-full bg-[#141722] border border-[#232738] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-violet-600/25 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Project Enquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
