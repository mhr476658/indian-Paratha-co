import React, { useState } from 'react';
import { FRANCHISE_MODELS, FRANCHISE_SUPPORT_LIST, FRANCHISE_CONTACT } from '../data/franchise';
import { FranchiseModel } from '../types';
import { IPCLogo } from './IPCLogo';
import { adminStore } from '../lib/adminStore';
import {
  Building2,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  Send,
  X,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';

export const Franchise: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<FranchiseModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    model: 'HIGHWAY CONSERVATORY',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOpenModal = (model?: FranchiseModel) => {
    if (model) {
      setSelectedModel(model);
      setFormState((prev) => ({ ...prev, model: model.title }));
    }
    setIsModalOpen(true);
    setSubmitSuccess(null);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save lead to admin dashboard and server
    adminStore.submitFranchiseInquiry({
      fullName: formState.fullName,
      phone: formState.phone,
      email: formState.email,
      city: formState.city,
      model: formState.model,
      notes: formState.notes,
    }).catch(err => console.error('Failed to submit franchise lead:', err));

    const message = `*New Franchise Inquiry*\n\n` +
      `*Name:* ${formState.fullName}\n` +
      `*Phone:* ${formState.phone}\n` +
      `*Email:* ${formState.email}\n` +
      `*City/State:* ${formState.city}\n` +
      `*Model Preference:* ${formState.model}\n` +
      `*Notes:* ${formState.notes}`;

    const whatsappUrl = `https://wa.me/919880883061?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsModalOpen(false);
    setFormState({
      fullName: '',
      phone: '',
      email: '',
      city: '',
      model: 'HIGHWAY CONSERVATORY',
      notes: '',
    });
  };

  return (
    <section id="franchise" className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2E4434]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 flex flex-col items-center">
          <IPCLogo variant="light" size="lg" badgeOnly={true} className="mb-4 drop-shadow-xl" />

          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#E5A93C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#E5A93C]">
              PARTNER WITH A LEGACY
            </span>
            <span className="w-6 h-[2px] bg-[#E5A93C]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
            OWN A SLICE OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">IPC</span>
          </h2>

          <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#E5A93C] mb-4">
            Join the Indian Paratha Company journey.
          </h3>

          <p className="text-white/70 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Bring authentic highway flavours, iconic hospitality, and high-margin operational models
            to key highway corridors and thriving urban hubs across India.
          </p>
        </div>

        {/* The Two Investment Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {FRANCHISE_MODELS.map((model) => (
            <div
              key={model.id}
              id={`franchise-card-${model.id}`}
              className="bg-[#0F1712]/95 border border-white/15 hover:border-white/40 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-2xl transition-all duration-300 group hover:-translate-y-1.5 backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#E5A93C]">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E5A93C] bg-black/60 px-3 py-1 rounded-full border border-white/15">
                    {model.badge}
                  </span>
                </div>

                <h4 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
                  {model.title}
                </h4>

                <p className="text-white/70 text-xs sm:text-sm font-sans mb-6 leading-relaxed">
                  {model.description}
                </p>

                {/* Core Metrics Box */}
                <div className="bg-black/50 rounded-2xl p-5 border border-white/10 space-y-3.5 mb-6">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-white/60 font-sans">Footprint Space</span>
                    <strong className="text-white font-semibold">{model.sqft}</strong>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-white/10">
                    <span className="text-white/60 font-sans">Setup Cost</span>
                    <strong className="text-[#E5A93C] font-bold">{model.setupCost}</strong>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-white/10">
                    <span className="text-white/60 font-sans">Franchise Fee</span>
                    <strong className="text-white font-semibold">{model.franchiseFee}</strong>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-white/10">
                    <span className="text-white/60 font-sans">Average ROI</span>
                    <strong className="text-emerald-400 font-bold">{model.averageRoi}</strong>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 mb-6">
                  {model.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/80 font-sans">
                      <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <button
                id={`btn-enquire-${model.id}`}
                onClick={() => handleOpenModal(model)}
                className="w-full py-3.5 bg-white hover:bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EXPLORE FRANCHISE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* 360-Degree Comprehensive Franchise Support */}
        <div className="bg-[#0F1712]/95 border border-white/15 rounded-3xl p-7 sm:p-10 max-w-5xl mx-auto mb-16 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#E5A93C]" />
            <h4 className="font-sans text-xl sm:text-2xl font-bold text-white">
              Comprehensive Partner Support
            </h4>
          </div>

          <p className="text-white/70 text-sm font-sans mb-6 leading-relaxed">
            Our experienced operational leadership guides franchise partners through every step of launch and recurring operations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {FRANCHISE_SUPPORT_LIST.map((support, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white/80"
              >
                <div className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
                <span>{support}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Franchise Contact Box */}
        <div className="max-w-3xl mx-auto bg-[#0F1712]/95 border border-white/15 rounded-3xl p-6 sm:p-8 text-center shadow-xl backdrop-blur-xl">
          <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-[#E5A93C] block mb-2">
            OFFICIAL FRANCHISE REPRESENTATION
          </span>
          <h4 className="font-sans text-xl sm:text-2xl font-bold text-white mb-4">
            Franchise Ready Advisory
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-white/80 mb-6">
            <a
              href={`mailto:${FRANCHISE_CONTACT.email}`}
              className="flex items-center justify-center gap-2 p-3 bg-black/30 rounded-2xl hover:bg-black/50 transition-colors border border-white/10"
            >
              <Mail className="w-4 h-4 text-[#E5A93C]" />
              <span>{FRANCHISE_CONTACT.email}</span>
            </a>

            <a
              href={`tel:${FRANCHISE_CONTACT.phoneClean}`}
              className="flex items-center justify-center gap-2 p-3 bg-black/30 rounded-2xl hover:bg-black/50 transition-colors border border-white/10"
            >
              <Phone className="w-4 h-4 text-[#E5A93C]" />
              <span>{FRANCHISE_CONTACT.phone}</span>
            </a>

            <a
              href={`https://wa.me/919880883061`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-[#25D366]/20 rounded-2xl hover:bg-[#25D366]/40 transition-colors border border-[#25D366]/30"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal Inquiry Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F1712] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-sans text-2xl font-bold text-white mb-1">
              Franchise Partnership Form
            </h3>
            <p className="text-white/60 text-xs mb-6 font-sans">
              Connect with our franchise management team for detailed unit economics.
            </p>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center text-emerald-200">
                <CheckCircle className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
                <h4 className="font-bold text-white text-base mb-1 font-sans">Inquiry Submitted!</h4>
                <p className="text-xs text-emerald-300 mb-2">Reference ID: <strong className="font-mono text-white">{submitSuccess}</strong></p>
                <p className="text-xs text-white/70 font-sans">Our business expansion director will get in touch within 24 hours.</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div>
                  <label className="text-xs font-mono uppercase text-white/70 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                    placeholder="e.g. Rajesh Kumar"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase text-white/70 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-white/70 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                      placeholder="rajesh@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase text-white/70 block mb-1">Target City / State</label>
                    <input
                      type="text"
                      required
                      value={formState.city}
                      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                      placeholder="e.g. Hyderabad / NH44"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-white/70 block mb-1">Model Preference</label>
                    <select
                      value={formState.model}
                      onChange={(e) => setFormState({ ...formState, model: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                    >
                      <option value="HIGHWAY CONSERVATORY">Highway Conservatory Flagship</option>
                      <option value="URBAN EXPRESS">Urban Highway Express</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-white/70 block mb-1">Notes / Site Details</label>
                  <textarea
                    rows={3}
                    value={formState.notes}
                    onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                    placeholder="Tell us about your proposed highway land or retail location..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Send Franchise Application'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
