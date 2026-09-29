'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Product Inquiry',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormState({ name: '', email: '', phone: '', subject: 'Product Inquiry', message: '' });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#B08968]">
          Connect with Hathras Apothecary
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
          Get in Touch with Aadhya Enterprises
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-light">
          Have queries about classical formulations, dosage guidance, or bulk inquiries? Our team in Hathras is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CONTACT INFO CARDS */}
        <div className="space-y-4">
          <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-[#F3EFE6] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif font-bold text-base text-gray-900">Apothecary & Office Address</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              <strong>AADHYA ENTERPRISES</strong><br />
              B.H Oil Meal Road, Next to Bank of Maharashtra,<br />
              Dobra Bal Colony, Hathras,<br />
              Uttar Pradesh - 204101, India
            </p>
          </div>

          <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-[#F3EFE6] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif font-bold text-base text-gray-900">Phone & WhatsApp Desk</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              Helpline: <strong>+91 7017840020</strong><br />
              Mon – Sat: 9:00 AM – 7:00 PM IST
            </p>
          </div>

          <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-[#F3EFE6] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif font-bold text-base text-gray-900">Official Registration</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>GSTIN/UIN: <span className="font-mono font-bold text-gray-900">09ANCPV6879P1ZP</span></div>
              <div>AYUSH & GMP Compliant Formulation Unit</div>
            </div>
          </div>
        </div>

        {/* CONTACT INQUIRY FORM */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-3xl border border-[#F3EFE6] shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Send Us an Inquiry / Vaidya Consultation
          </h2>

          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Dhanyavaad! Your message has been received. Our Hathras team will contact you within 24 hours.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Anand Varma"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="anand@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] bg-white"
                >
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Dosage & Vaidya Guidance">Dosage & Vaidya Guidance</option>
                  <option value="Order Tracking & Support">Order Tracking & Support</option>
                  <option value="Bulk & Wholesale Supply">Bulk & Wholesale Supply</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Your Message *
              </label>
              <textarea
                rows={5}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Please describe your health query or order details..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-2xl bg-[#1B4332] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2D6A4F] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
