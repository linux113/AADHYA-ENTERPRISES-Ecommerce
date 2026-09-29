import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/storefront/ProductCard';
import { NewsletterForm } from '@/components/storefront/NewsletterForm';
import { productRepository } from '@/repositories/product.repository';
import { cmsRepository } from '@/repositories/cms.repository';
import {
  ShieldCheck,
  Leaf,
  Truck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  BookOpen,
} from 'lucide-react';

export const revalidate = 60; // 1 minute ISR

export default async function HomePage() {
  const [bestsellers, banners, categories] = await Promise.all([
    productRepository.findMany({ isBestseller: true, limit: 8 }),
    cmsRepository.getActiveBanners(),
    productRepository.getAllCategories(),
  ]);

  const primaryBanner = banners.find((b) => b.slot === 'HERO_PRIMARY') || {
    title: 'Pure Shastriya Ayurveda From Hathras',
    subtitle: '100% classical herbals formulated according to ancient Ayurvedic texts. Certified, authentic, and delivered fresh to your home.',
    ctaText: 'Explore Formulations',
    ctaLink: '/shop',
    linkUrl: '/shop',
    buttonText: 'Explore Formulations',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
  };

  const classicalCategories = [
    {
      title: 'Classical Awalehas',
      slug: 'classical-formulations',
      desc: 'Rejuvenating herbal jams & Chyawanprash',
      icon: '🍯',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Medicated Oils & Tailas',
      slug: 'herbal-oils',
      desc: 'Kshirabala, Kumkumadi & Bhringraj oils',
      icon: '🌿',
      image: 'https://images.unsplash.com/photo-1608248597359-00f72f87a8b3?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Pure Herbal Churnas',
      slug: 'digestive-health',
      desc: 'Single herb & classical synergistic powders',
      icon: '🍃',
      image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Vatis & Rasayanas',
      slug: 'immunity-vitality',
      desc: 'Standardized classical tablets & mineral herbals',
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION */}
      <section className="relative bg-[#1B4332] text-white overflow-hidden rounded-3xl mx-4 sm:mx-8 lg:mx-12 mt-4 sm:mt-6 shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#FAF7F2] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Direct From Hathras, Uttar Pradesh</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FAF7F2]">
              {primaryBanner.title}
            </h1>

            <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              {primaryBanner.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href={primaryBanner.ctaLink || primaryBanner.linkUrl || '/shop'}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A880] text-[#1B4332] font-bold text-sm hover:bg-[#d8bc94] transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
              >
                <span>{primaryBanner.ctaText || primaryBanner.buttonText || 'Explore Formulations'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center backdrop-blur-sm"
              >
                Our Hathras Heritage
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center lg:text-left">
              <div>
                <span className="block text-2xl font-serif font-bold text-[#C5A880]">100%</span>
                <span className="text-[11px] text-gray-300">Shastriya Pure</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#C5A880]">GMP</span>
                <span className="text-[11px] text-gray-300">Certified Facility</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#C5A880]">50K+</span>
                <span className="text-[11px] text-gray-300">Orders Delivered</span>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-4/3 lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
            <Image
              src={primaryBanner.imageUrl}
              alt="Ayurvedic herbs and formulations"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-gray-900 border border-white/40 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center font-serif font-bold">
                  ॐ
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1B4332]">
                    Sharangadhara & Charaka Samhita Formulations
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    Handcrafted in copper and brass vessels with pure wild-harvested herbs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITIONS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#FAF7F2] border border-[#F3EFE6]">
            <div className="p-3 bg-[#1B4332] text-white rounded-xl shadow-xs shrink-0">
              <Leaf className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">100% Shastriya Herbs</h4>
              <p className="text-xs text-gray-600 mt-1">Zero synthetic fillers, chemical extracts, or artificial preservatives.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#FAF7F2] border border-[#F3EFE6]">
            <div className="p-3 bg-[#1B4332] text-white rounded-xl shadow-xs shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">AYUSH & GMP Certified</h4>
              <p className="text-xs text-gray-600 mt-1">Standardized manufacturing adhering strictly to classical pharmacopeia.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#FAF7F2] border border-[#F3EFE6]">
            <div className="p-3 bg-[#1B4332] text-white rounded-xl shadow-xs shrink-0">
              <Award className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Hathras Roots</h4>
              <p className="text-xs text-gray-600 mt-1">Aadhya Enterprises, Dobra Bal Colony, Hathras (U.P. 204101).</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#FAF7F2] border border-[#F3EFE6]">
            <div className="p-3 bg-[#1B4332] text-white rounded-xl shadow-xs shrink-0">
              <Truck className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Express Pan-India</h4>
              <p className="text-xs text-gray-600 mt-1">Free delivery above ₹999. Secure Cash on Delivery & UPI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSICAL CATEGORIES EXPLORATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B08968]">
            Classical Formulations
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Shop by Ayurvedic Category
          </h2>
          <p className="text-sm text-gray-600">
            Targeted wellness remedies prepared with time-honored Ayurvedic preparation methods.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classicalCategories.map((cat) => (
            <Link
              key={cat.title}
              href={`/category/${cat.slug}`}
              className="group relative h-80 rounded-3xl overflow-hidden border border-[#F3EFE6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="relative z-10 space-y-1 text-white">
                <div className="text-2xl mb-1">{cat.icon}</div>
                <h3 className="font-serif text-lg font-bold group-hover:text-[#C5A880] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-300 font-light line-clamp-2">{cat.desc}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-[#C5A880] pt-2">
                  <span>Explore Formulation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLING FORMULATIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B08968]">
              Most Loved Formulations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              Bestsellers in Classical Ayurveda
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-[#1B4332] hover:text-[#2D6A4F] flex items-center gap-1.5 underline"
          >
            <span>View All Products ({bestsellers.total})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* HATHRAS HERITAGE & AYURVEDIC PURITY */}
      <section className="bg-[#FAF7F2] py-16 sm:py-24 border-y border-[#F3EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Authentic Hathras Tradition</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Rooted in Hathras, Dedicated to Timeless Healing
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
              At <strong className="font-bold text-gray-900">AADHYA ENTERPRISES</strong>, based on B.H Oil Meal Road, next to Bank of Maharashtra in Hathras, Uttar Pradesh, we honor the ancient science of Ayurveda. Every formulation is prepared according to strict Shastriya texts, utilizing slow heating, copper vats, and hand-selected raw herbs.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-800">
                  Strict adherence to Charaka, Sushruta & Sharangadhara Samhitas
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-800">
                  Heavy metal tested & microbially cleared batches
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-800">
                  Direct manufacturer pricing with 100% transparent ingredients
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1B4332] text-white font-bold text-xs hover:bg-[#2D6A4F] transition-all shadow-md"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-[#F3EFE6] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
              alt="Ayurvedic preparation in copper vessels"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* AYURVEDIC NEWSLETTER & FIRST ORDER DISCOUNT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#1B4332] text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl text-center space-y-6">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-[#C5A880] text-[#1B4332] text-xs font-bold uppercase tracking-wider">
              Exclusive 10% Off
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold">
              Join the Aadhya Ayurvedic Circle
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              Subscribe to receive weekly Ayurvedic health guidance, seasonal diet tips, and a 10% coupon code for your first classical formulation order.
            </p>

            <NewsletterForm />

            <p className="text-[10px] text-gray-400">
              No spam. Unsubscribe at any time. Hathras, Uttar Pradesh.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
