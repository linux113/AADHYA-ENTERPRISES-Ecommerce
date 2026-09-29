import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { settingsRepository } from '@/repositories/settings.repository';
import { Leaf, Award, ShieldCheck, HeartHandshake, BookOpen, MapPin, Sparkles } from 'lucide-react';

export const revalidate = 300;

export default async function AboutPage() {
  const business = await settingsRepository.getBusinessSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#F3EFE6] text-[#B08968] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          <span>Hathras Classical Heritage</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Purity, Classical Wisdom, and Shastriya Authenticity
        </h1>
        <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
          Founded in the historic town of Hathras, Uttar Pradesh, <strong>AADHYA ENTERPRISES</strong> was established with a singular mission: to restore the uncompromising integrity of classical Ayurvedic pharmacology.
        </p>
      </div>

      {/* STORY & HERITAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-[#F3EFE6]">
          <Image
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
            alt="Ayurvedic herbs and traditional vessels in Hathras"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B08968]">
            <BookOpen className="w-4 h-4 text-[#C5A880]" />
            <span>The Hathras Tradition</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            Formulating According to Ancient Shastras
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
            <p>
              Located on <strong>{business.addressLine1}, {business.addressLine2}, {business.city}, {business.state} ({business.postalCode})</strong>, our facility adheres strictly to the authoritative texts: <em>Charaka Samhita</em>, <em>Sushruta Samhita</em>, <em>Ashtanga Hridaya</em>, and <em>Sharangadhara Samhita</em>.
            </p>
            <p>
              In a modern market flooded with heavily diluted syrups and synthetically preserved tablets, we maintain age-old traditions: slow wood-fired and steam boiling in copper and brass vessels, natural fermentations (Asavas & Arishtas) using Woodfordia fruticosa (Dhataki flowers), and unadulterated cold-pressed medicated tailas.
            </p>
            <p>
              Every batch undergoes strict microbial and heavy metal chromatography to guarantee supreme clinical safety and potency.
            </p>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center gap-4 text-xs font-bold text-gray-900">
            <div>
              <span className="block text-gray-400 font-normal">Registered Entity</span>
              <span>AADHYA ENTERPRISES</span>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <span className="block text-gray-400 font-normal">GSTIN / UIN</span>
              <span className="text-[#1B4332] font-mono">{business.gstin}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE PILLARS */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            Our Unshakeable Commitments
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            The fundamental standards that govern every single bottle and jar leaving our Hathras unit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#F3EFE6] space-y-4">
            <div className="w-12 h-12 bg-[#1B4332] text-white rounded-2xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-[#C5A880]" />
            </div>
            <h4 className="font-serif font-bold text-lg text-gray-900">100% Wild-Harvested Herbs</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              We source raw botanicals directly from certified tribal and organic agricultural regions across the Himalayas and Western Ghats.
            </p>
          </div>

          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#F3EFE6] space-y-4">
            <div className="w-12 h-12 bg-[#1B4332] text-white rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
            </div>
            <h4 className="font-serif font-bold text-lg text-gray-900">AYUSH & GMP Compliance</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Manufactured under certified Good Manufacturing Practices with full batch transparency, standardized active markers, and rigorous testing.
            </p>
          </div>

          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#F3EFE6] space-y-4">
            <div className="w-12 h-12 bg-[#1B4332] text-white rounded-2xl flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-[#C5A880]" />
            </div>
            <h4 className="font-serif font-bold text-lg text-gray-900">Direct Vaidya Support</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              We provide free Ayurvedic consultation and personalized dosage guidance to ensure each formulation yields its intended therapeutic outcome.
            </p>
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="bg-[#1B4332] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold">
          Experience Classical Ayurvedic Healing Today
        </h3>
        <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto font-light">
          Order authentic Shastriya herbal formulas crafted in Hathras, delivered straight to your door with Pan-India express logistics.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3.5 rounded-full bg-[#C5A880] text-[#1B4332] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bc94] transition-all shadow-lg"
        >
          Explore Catalog
        </Link>
      </div>
    </div>
  );
}
