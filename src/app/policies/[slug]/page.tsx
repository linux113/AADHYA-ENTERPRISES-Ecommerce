import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { settingsRepository } from '@/repositories/settings.repository';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

interface PolicyPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 300;

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = params;
  const business = await settingsRepository.getBusinessSettings();

  const policies: Record<
    string,
    { title: string; subtitle: string; content: React.ReactNode }
  > = {
    'privacy-policy': {
      title: 'Privacy Policy',
      subtitle: 'How AADHYA ENTERPRISES protects your personal information and health data.',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          <p>
            This Privacy Policy governs the manner in which <strong>AADHYA ENTERPRISES</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), registered at <strong>{business.addressLine1}, {business.addressLine2}, {business.city}, {business.state} {business.postalCode}</strong>, collects, uses, maintains, and discloses information collected from users of this e-commerce platform.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">1. Information We Collect</h3>
          <p>
            We collect personal identification information from Users in various ways, including when Users visit our site, register on the site, place an order, subscribe to the newsletter, and engage in consultation requests. This may include Name, Email Address, Mailing Address, Phone Number, and GSTIN details if applicable.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">2. Payment Security</h3>
          <p>
            All online transactions are processed through secure, PCI-DSS compliant payment gateways (Razorpay). We do not store credit card or UPI security pins on our servers.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">3. Contacting Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact our Data Officer at {business.email} or call +91 {business.phone}.
          </p>
        </div>
      ),
    },
    'terms-and-conditions': {
      title: 'Terms & Conditions',
      subtitle: 'Terms of service and use for AADHYA ENTERPRISES e-commerce store.',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          <p>
            By accessing or purchasing from the website operated by <strong>AADHYA ENTERPRISES (GSTIN: {business.gstin})</strong>, you agree to be bound by these terms.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">1. Classical Herbal Formulations</h3>
          <p>
            All products listed are prepared according to recognized classical Ayurvedic texts. Users should verify dosage guidelines with a registered Ayurvedic physician prior to use.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">2. Pricing & Server Validation</h3>
          <p>
            All prices are listed in Indian Rupees (INR) and inclusive of applicable GST taxes. We reserve the right to correct any typographical pricing errors prior to order dispatch.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">3. Jurisdiction</h3>
          <p>
            Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in Hathras, Uttar Pradesh.
          </p>
        </div>
      ),
    },
    'shipping-policy': {
      title: 'Shipping & Delivery Policy',
      subtitle: 'Pan-India delivery guidelines and logistics SLAs from our Hathras unit.',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          <p>
            We take pride in packaging and dispatching all orders directly from our Hathras formulation warehouse within 24 hours of order confirmation.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">1. Pan-India Delivery Timelines</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Uttar Pradesh & Delhi-NCR:</strong> 1 to 2 business days.</li>
            <li><strong>Metro Cities (Mumbai, Bangalore, Kolkata, Chennai):</strong> 2 to 3 business days.</li>
            <li><strong>Rest of India:</strong> 3 to 5 business days.</li>
          </ul>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">2. Shipping Charges</h3>
          <p>
            We offer <strong>FREE EXPRESS SHIPPING</strong> on all orders above ₹999 across India. For orders below ₹999, a nominal delivery charge of ₹50 is applied at checkout.
          </p>
        </div>
      ),
    },
    'refund-policy': {
      title: 'Refund & Cancellation Policy',
      subtitle: 'Transparent return policies for authentic Ayurvedic products.',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          <p>
            Due to the botanical purity and health-safety regulations governing Ayurvedic products, returned goods must be in their original unopened packaging with tamper-evident seals intact.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">1. 7-Day Return Window</h3>
          <p>
            If you receive a damaged, leaked, or incorrect product, you may request a free replacement or 100% refund within 7 days of delivery by contacting +91 {business.phone} or emailing photos to {business.email}.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">2. Refund Processing</h3>
          <p>
            Approved refunds are credited directly back to the original payment source (UPI / Bank Account / Card) within 3-5 business days.
          </p>
        </div>
      ),
    },
    'ayush-compliance': {
      title: 'AYUSH Compliance & Medical Disclaimer',
      subtitle: 'Classical Ayurvedic pharmacopeia regulatory notices.',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          <p>
            The products and statements provided by <strong>AADHYA ENTERPRISES</strong> have not been evaluated to diagnose, treat, cure, or prevent any severe medical condition in lieu of professional healthcare.
          </p>
          <h3 className="font-serif font-bold text-base text-gray-900 pt-2">Classical Shastriya Formulations</h3>
          <p>
            All products are manufactured adhering to classical Ayurvedic recipes codified in authoritative pharmacopeial treatises (such as AFI Part I & II, Charaka Samhita, and Sharangadhara Samhita). Consumers are advised to seek guidance from certified Ayurvedic Vaidyas.
          </p>
        </div>
      ),
    },
  };

  const policy = policies[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#1B4332]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">{policy.title}</span>
      </div>

      {/* Header */}
      <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#F3EFE6] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#B08968] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Official Hathras Policy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
          {policy.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-light">{policy.subtitle}</p>
      </div>

      {/* Content */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#F3EFE6] shadow-sm">
        {policy.content}
      </div>

      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1B4332] underline hover:text-[#2D6A4F]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </Link>
      </div>
    </div>
  );
}
