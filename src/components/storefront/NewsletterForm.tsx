'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 400);
  };

  if (subscribed) {
    return (
      <div className="p-4 bg-[#C5A880]/20 rounded-2xl border border-[#C5A880]/40 text-[#FAF7F2] text-xs font-bold flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
        <span>Dhanyavaad! Use coupon code <strong>WELCOME10</strong> for 10% off your first order!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address..."
        className="flex-1 px-5 py-3.5 rounded-full bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3.5 rounded-full bg-[#C5A880] text-[#1B4332] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bc94] transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5 disabled:opacity-50"
      >
        <span>{loading ? 'Joining...' : 'Claim 10% Off'}</span>
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
