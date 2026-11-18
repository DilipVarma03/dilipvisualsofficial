import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { api } from '../lib/api';
import { useToast } from '../context/ToastContext';

export const Contact: React.FC = () => {
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Professional Video Editing',
    description: '',
    budgetRange: '₹30,000 – ₹60,000 / $400 – $800',
    expectedDeadline: 'Within 2 Weeks',
    website_url: '' // Honeypot anti-spam trap (must stay empty)
  });

  const servicesList = [
    'Professional Video Editing',
    'Graphic Designing',
    'YouTube Thumbnail Designing',
    'Branding and Visual Identity',
    'Social Media Management',
    '3D and Blender Projects',
    'Other / Custom Creative Suite'
  ];

  const budgetOptions = [
    'Under ₹15,000 / $200',
    '₹15,000 – ₹30,000 / $200 – $400',
    '₹30,000 – ₹60,000 / $400 – $800',
    '₹60,000 – ₹1,20,000 / $800 – $1,500',
    '₹1,20,000+ / $1,500+ (Enterprise / Retainer)'
  ];

  const deadlineOptions = [
    'Urgent (Within 48–72 Hours)',
    'Within 1 Week',
    'Within 2 Weeks',
    'Within 1 Month',
    'Flexible / Ongoing Retainer'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Validation
    if (!formData.name.trim()) {
      toastError('Name Required', 'Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      toastError('Email Required', 'Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toastError('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      toastError('Phone Required', 'Please enter your phone or WhatsApp number.');
      return;
    }
    if (!formData.description.trim()) {
      toastError('Description Required', 'Please provide a brief description of your project.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        description: formData.description.trim(),
        budgetRange: formData.budgetRange,
        expectedDeadline: formData.expectedDeadline,
        website_url: formData.website_url // Honeypot
      });

      const refId = res.enquiryNumber || `DV-ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedId(refId);
      success(
        'Enquiry Submitted Successfully!',
        `Your Reference ID is ${refId}. We have dispatched a confirmation email to ${formData.email}.`
      );
    } catch (err: any) {
      console.error('Contact submission error:', err);
      // Graceful fallback: Still provide user with direct WhatsApp option
      toastError(
        'Submission Notice',
        'Could not reach server right now. You can chat with us instantly on WhatsApp at +91 9398769483.'
      );
    } finally {
      setLoading(false);
    }
  };

  const defaultWhatsAppText = encodeURIComponent(
    "Hello Dilip Visuals! I visited your website and I'm interested in your creative services. I would like to discuss a project."
  );

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Contact Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-semibold text-violet-300">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>LET'S CONNECT</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          HAVE A PROJECT IN MIND?
        </h1>

        <p className="text-base sm:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Let's turn your ideas into extraordinary visual experiences.
        </p>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Choose your preferred contact method below or fill out our project brief form. Our creative team in Hyderabad is ready to collaborate.
        </p>
      </div>

      {/* Two Primary Contact Options: WhatsApp & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* OPTION 1: WhatsApp */}
        <a
          href={`https://wa.me/919398769483?text=${defaultWhatsAppText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-3xl bg-gradient-to-b from-[#0c2419] to-[#091512] border border-emerald-500/30 hover:border-emerald-400/60 p-8 flex items-center justify-between shadow-2xl hover:shadow-emerald-500/15 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                Option 01 • Instant Response
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
              Chat With Us on WhatsApp
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-xs">
              Fastest route to discuss pricing, turnaround times, and availability directly with our lead team.
            </p>
            <p className="text-sm font-bold font-mono text-emerald-400 pt-1">
              +91 9398769483
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-7 h-7" />
          </div>
        </a>

        {/* OPTION 2: Email */}
        <a
          href="mailto:dilipvisuals@gmail.com"
          className="group rounded-3xl bg-gradient-to-b from-[#18152b] to-[#0c0d17] border border-violet-500/30 hover:border-violet-400/60 p-8 flex items-center justify-between shadow-2xl hover:shadow-violet-500/15 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-400">
                Option 02 • Detailed Brief
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-violet-300 transition-colors">
              Send Us an Email
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-xs">
              Click to open your default email app with our receiving address pre-populated.
            </p>
            <p className="text-sm font-bold font-mono text-violet-300 pt-1">
              dilipvisuals@gmail.com
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-110 transition-transform">
            <Mail className="w-7 h-7" />
          </div>
        </a>
      </div>

      {/* Main Contact Form & Studio Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
        {/* Left Side: Agency Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-[#0f111a] border border-[#232738] p-8 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white">Agency Information</h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Studio Headquarters</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">Hyderabad, Telangana, India</p>
                  <p className="text-[11px] text-zinc-500">Serving creators & brands globally</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Direct WhatsApp</h3>
                  <a
                    href={`https://wa.me/919398769483?text=${defaultWhatsAppText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-mono font-bold mt-0.5 inline-block"
                  >
                    +91 9398769483
                  </a>
                  <p className="text-[11px] text-zinc-500">Click to start instant chat</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Official Receiving Email</h3>
                  <a
                    href="mailto:dilipvisuals@gmail.com"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-bold mt-0.5 inline-block"
                  >
                    dilipvisuals@gmail.com
                  </a>
                  <p className="text-[11px] text-zinc-500">Responses within 12–24 business hours</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#232738] space-y-3">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Clock className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Operating Hours: Mon - Sat (9:00 AM - 8:00 PM IST)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>NDA & Confidentiality Protected on All Enquiries</span>
              </div>
            </div>
          </div>

          {/* Brand Philosophy Box */}
          <div className="rounded-3xl bg-gradient-to-b from-[#141724] to-[#0A0C13] border border-[#232738] p-6 space-y-3 text-center sm:text-left">
            <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-widest block">
              Brand Philosophy
            </span>
            <p className="text-sm font-bold text-white italic">
              "Let's create something extraordinary."
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every great brand starts with a vision. Whether you need a high-retention video editor, standout thumbnails, or an end-to-end brand identity, we are ready to build yours.
            </p>
          </div>
        </div>

        {/* Right Side: The Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-[#0f111a] border border-[#232738] p-8 sm:p-12 shadow-2xl relative">
            {submittedId ? (
              <div className="py-10 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Project Enquiry Submitted!
                  </h2>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you! Your enquiry has been received and routed directly to Dilip Visuals. An automatic confirmation email has been dispatched to <strong className="text-violet-300">{formData.email}</strong>.
                  </p>
                </div>

                <div className="p-4 bg-[#141724] border border-[#232738] rounded-2xl max-w-xs mx-auto space-y-1">
                  <span className="text-[11px] text-zinc-400 uppercase tracking-widest block font-medium">
                    Your Reference ID
                  </span>
                  <span className="text-xl font-mono font-bold text-violet-400">{submittedId}</span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/919398769483?text=${encodeURIComponent(
                      `Hello Dilip Visuals! I submitted an enquiry (Ref: ${submittedId}) for ${formData.service}. I would love to connect!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedId(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: 'Professional Video Editing',
                        description: '',
                        budgetRange: '₹30,000 – ₹60,000 / $400 – $800',
                        expectedDeadline: 'Within 2 Weeks',
                        website_url: ''
                      });
                    }}
                    className="px-6 py-3.5 rounded-xl bg-[#161a26] hover:bg-[#1e2333] text-zinc-300 font-semibold text-xs border border-[#2a3045] transition-all"
                  >
                    Submit Another Project Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-white">Project Enquiry Form</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill in your project details below. All enquiries are reviewed personally by our lead creatives.
                  </p>
                </div>

                {/* Honeypot Spam Protection (Hidden from legitimate users) */}
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_url}
                  onChange={e => setFormData({ ...formData, website_url: e.target.value })}
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Reddy"
                      className="w-full bg-[#141724] border border-[#232738] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@gmail.com"
                      className="w-full bg-[#141724] border border-[#232738] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone / WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 93987 69483"
                      className="w-full bg-[#141724] border border-[#232738] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Company / Channel / Brand Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. YouTube Channel or Startup Name"
                      className="w-full bg-[#141724] border border-[#232738] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Required */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Service Required *
                  </label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#141724] border border-[#232738] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    {servicesList.map(srv => (
                      <option key={srv} value={srv} className="bg-[#0f111a] text-white">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Budget Range */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Budget Range *
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-[#141724] border border-[#232738] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      {budgetOptions.map(b => (
                        <option key={b} value={b} className="bg-[#0f111a] text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Expected Deadline */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Expected Deadline *
                    </label>
                    <select
                      value={formData.expectedDeadline}
                      onChange={e => setFormData({ ...formData, expectedDeadline: e.target.value })}
                      className="w-full bg-[#141724] border border-[#232738] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      {deadlineOptions.map(d => (
                        <option key={d} value={d} className="bg-[#0f111a] text-white">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Project Description & Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about your project: target audience, vision, inspiration links, editing style, deliverables needed, etc."
                    className="w-full bg-[#141724] border border-[#232738] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Project Brief to Studio...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Enquiry</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-500 text-center">
                  Your enquiry is securely sent to <strong>dilipvisuals@gmail.com</strong>. You'll receive an automatic confirmation email immediately.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
