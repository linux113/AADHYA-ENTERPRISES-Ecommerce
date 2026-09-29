'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { ReviewSection } from '@/components/storefront/ReviewSection';
import {
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Star,
  BookOpen,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, openMiniCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'dosage' | 'safety'>('desc');
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const images = product.images || [];
  const activeImage = images[selectedImageIndex]?.imageUrl || images[0]?.imageUrl || '';
  const variants = product.variants || [];
  const selectedVariant: ProductVariant = variants[selectedVariantIndex] || variants[0];

  const inWishlist = isInWishlist(product.id);
  const sellingPrice = selectedVariant?.sellingPrice || 0;
  const mrp = selectedVariant?.mrp || 0;
  const discountPercent = mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;
  const stock = selectedVariant?.stockQuantity || 0;
  const isOutOfStock = stock <= 0;

  const handleAddToCart = async () => {
    if (isOutOfStock || !selectedVariant) return;
    setIsAdding(true);
    await addItem(selectedVariant.id, quantity);
    setIsAdding(false);
    openMiniCart();
  };

  const handleBuyNow = async () => {
    if (isOutOfStock || !selectedVariant) return;
    setIsBuyingNow(true);
    await addItem(selectedVariant.id, quantity);
    router.push('/checkout');
  };

  return (
    <div className="space-y-12">
      {/* TOP SECTION: MEDIA & DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* MEDIA GALLERY */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-[#FAF7F2] border border-[#F3EFE6] overflow-hidden shadow-sm">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                🌿 Classical Formulation
              </div>
            )}

            {discountPercent > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-[#C62828] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                SAVE {discountPercent}%
              </div>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md transition-all hover:scale-110"
              aria-label="Wishlist toggle"
            >
              <Heart
                className={`w-5 h-5 ${inWishlist ? 'fill-red-600 text-red-600' : 'text-gray-600'}`}
              />
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.imageUrl} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT DETAILS & BUY BOX */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B08968] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#F3EFE6]">
                {product.ayurvedicFormulation?.replace('_', ' ')}
              </span>
              {product.isBestseller && (
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                  ★ Bestseller
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex text-[#C5A880]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.ratingAverage || 5)
                        ? 'fill-current text-[#C5A880]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">
                {product.ratingAverage || 4.9} / 5.0
              </span>
              <span className="text-xs text-gray-400">
                ({product.ratingCount || 14} verified customer reviews)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F3EFE6] space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-serif font-black text-[#1B4332]">
                ₹{sellingPrice}
              </span>
              {mrp > sellingPrice && (
                <span className="text-lg text-gray-400 line-through">₹{mrp}</span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-extrabold text-[#C62828] bg-red-100 px-2 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500">
              Inclusive of all taxes. Free shipping on orders above ₹999.
            </p>
          </div>

          {/* VARIANT PICKER */}
          {variants.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Select Packaging Size / Weight:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariantIndex(idx);
                      setQuantity(1);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      idx === selectedVariantIndex
                        ? 'border-[#1B4332] bg-[#1B4332]/5 ring-1 ring-[#1B4332]'
                        : 'border-gray-200 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-gray-900">{v.sizeLabel}</div>
                    <div className="text-xs font-bold text-[#1B4332] mt-0.5">₹{v.sellingPrice}</div>
                    {v.stockQuantity <= 5 && v.stockQuantity > 0 && (
                      <div className="text-[10px] text-amber-600 font-medium">Only {v.stockQuantity} left</div>
                    )}
                    {v.stockQuantity <= 0 && (
                      <div className="text-[10px] text-red-600 font-bold">Out of stock</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STOCK STATUS */}
          <div className="flex items-center gap-2 text-xs">
            {isOutOfStock ? (
              <span className="flex items-center gap-1.5 text-red-600 font-bold">
                <AlertTriangle className="w-4 h-4" /> Currently Out of Stock
              </span>
            ) : stock <= 5 ? (
              <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                <AlertTriangle className="w-4 h-4" /> Low Stock: Only {stock} remaining in Hathras warehouse
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" /> In Stock & Ready to Dispatch ({stock} units)
              </span>
            )}
          </div>

          {/* QUANTITY AND ACTIONS */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 rounded-lg disabled:opacity-40"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  disabled={quantity >= stock || isOutOfStock}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 rounded-lg disabled:opacity-40"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className="flex-1 py-4 px-6 rounded-2xl bg-[#1B4332] text-white font-bold text-sm hover:bg-[#2D6A4F] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdding ? 'Adding...' : 'Add to Bag'}</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock || isBuyingNow}
              className="w-full py-4 px-6 rounded-2xl bg-[#C5A880] text-[#1B4332] font-black text-sm uppercase tracking-wider hover:bg-[#d8bc94] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isBuyingNow ? 'Proceeding...' : 'Buy Now with 1-Click Checkout'}</span>
            </button>
          </div>

          {/* TRUST PILLARS */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] text-xs text-gray-700">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% Shastriya Pure</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] text-xs text-gray-700">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Hathras GMP Facility</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] text-xs text-gray-700">
              <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Pan-India Dispatch</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] text-xs text-gray-700">
              <RotateCcw className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>7-Day Return Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS TABS (DESCRIPTION, INGREDIENTS, DOSAGE, SAFETY) */}
      <div className="border border-[#F3EFE6] rounded-3xl bg-white overflow-hidden shadow-sm">
        <div className="flex border-b border-[#F3EFE6] bg-[#FAF7F2] overflow-x-auto">
          {[
            { id: 'desc', label: 'Classical Overview' },
            { id: 'ingredients', label: 'Key Herbal Ingredients' },
            { id: 'dosage', label: 'Dosage & Anupana' },
            { id: 'safety', label: 'Safety & Storage' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider shrink-0 transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#1B4332] border-b-2 border-[#1B4332]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'desc' && (
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed font-light">
              <p>{product.description}</p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1">
                <h4 className="font-bold text-xs text-emerald-950 uppercase tracking-wider">
                  Shastriya Reference:
                </h4>
                <p className="text-xs text-emerald-900">
                  Prepared strictly according to classical methods codified in Ayurvedic pharmacopeia (AFI Part-I) under direct supervision of experienced Vaidyas.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-gray-900">
                100% Pure Botanical Ingredients:
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.ingredients || 'Standardized herbal extracts and classical ingredients.'}
              </p>
              <div className="text-xs text-gray-500 italic">
                * Zero added artificial colors, synthetic flavors, or synthetic gelatin/preservatives.
              </div>
            </div>
          )}

          {activeTab === 'dosage' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-gray-900">
                Recommended Usage & Anupana:
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.dosage || 'Take as directed by an Ayurvedic physician.'}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Anupana (Vehicle):</strong> Best consumed with warm cow milk, lukewarm water, or pure honey as advised for optimal bioavailability.
              </p>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-gray-900">
                Storage & Precautions:
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1.5 font-light">
                <li>Store in a cool, dry place away from direct sunlight.</li>
                <li>Keep jar/bottle tightly closed after each use to prevent moisture absorption.</li>
                <li>Keep out of reach of children.</li>
                <li>Pregnant or lactating women should consult a physician before use.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* VERIFIED CUSTOMER REVIEWS */}
      <section className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-gray-900">
          Verified Customer Experiences & Reviews
        </h3>
        <ReviewSection productId={product.id} productName={product.name} />
      </section>
    </div>
  );
}
