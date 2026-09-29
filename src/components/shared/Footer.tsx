import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Phone, Mail, Award, Leaf, Truck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F281E] text-gray-300 pt-16 pb-12 border-t border-[#1B4332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TRUST BANNER ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#1B4332]/60 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#1B4332] rounded-xl text-[#C5A880]">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">100% Pure Herbs</h4>
              <p className="text-[11px] text-gray-400">Zero synthetic adulterants</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#1B4332] rounded-xl text-[#C5A880]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">AYUSH Standards</h4>
              <p className="text-[11px] text-gray-400">Classical pharmacopeia formulations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#1B4332] rounded-xl text-[#C5A880]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Direct from Hathras</h4>
              <p className="text-[11px] text-gray-400">Fresh production batch dispatch</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#1B4332] rounded-xl text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Secure UPI & Cards</h4>
              <p className="text-[11px] text-gray-400">256-bit encrypted checkout</p>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Column 1: Brand & Official Hathras Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-white tracking-tight">AADHYA ENTERPRISES</span>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A880] font-bold uppercase">
                AUTHENTIC AYURVEDIC FORMULATIONS
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400 max-w-sm">
              Dedicated to manufacturing and distributing authentic classical Ayurvedic medicines, herbal churnas, medicated tailas, and rejuvenating rasayanas with reverence to ancient Vedic scriptures.
            </p>

            <div className="space-y-2 pt-2 text-xs text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>
                  B.H Oil Meal Road, Next to Bank of Maharashtra, Dobra Bal Colony, Hathras, Uttar Pradesh 204101
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <a href="tel:7017840020" className="hover:text-white transition-colors">
                  +91 7017840020
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <a href="mailto:contact@aadhyaenterprises.com" className="hover:text-white transition-colors">
                  contact@aadhyaenterprises.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 bg-[#1B4332] text-[#C5A880] text-[11px] font-mono rounded-md border border-[#2D6A4F]">
                GSTIN / UIN: 09ANCPV6879P1ZP
              </span>
            </div>
          </div>

          {/* Column 2: Ayurvedic Catalog */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Classical Remedies</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/category/herbal-churnas" className="hover:text-white transition-colors">
                  Herbal Churnas (Powders)
                </Link>
              </li>
              <li>
                <Link href="/category/asava-arishta" className="hover:text-white transition-colors">
                  Classical Asava & Arishta
                </Link>
              </li>
              <li>
                <Link href="/category/ayurvedic-oils" className="hover:text-white transition-colors">
                  Medicated Scalp & Body Tailas
                </Link>
              </li>
              <li>
                <Link href="/category/vati-tablets" className="hover:text-white transition-colors">
                  Classical Vati & Gutika
                </Link>
              </li>
              <li>
                <Link href="/category/immunity-rasayana" className="hover:text-white transition-colors">
                  Immunity & Rasayanas
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Explore & Guides</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Ayurvedic Health Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Hathras Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Customer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Trust & Policies</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/policies/shipping-policy" className="hover:text-white transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/refund-policy" className="hover:text-white transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 mt-4 border-t border-[#1B4332]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} AADHYA ENTERPRISES. All Rights Reserved. Hathras, Uttar Pradesh, India.</p>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>Made with pure botanical devotion in Hathras, U.P.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
