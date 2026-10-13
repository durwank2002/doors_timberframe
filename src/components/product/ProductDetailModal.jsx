import React, { useState } from 'react';
import {
  Heart,
  SlidersHorizontal,
  ShoppingBag,
  MessageCircle,
  Star,
  Check,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { ProductGallery } from './ProductGallery';
import { formatCurrency } from '../../utils/formatters';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  onOpenConfigurator,
}) => {
  const [activeTab, setActiveTab] = useState('specs');
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      sku: product.sku,
      category: product.category,
      price: product.price,
      totalPrice: product.price,
      image: product.images[0],
      woodType: product.woodType,
      standardDimensions: product.standardDimensions,
      isCustomized: false,
    });
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppLink({
      type: 'product_enquiry',
      data: product,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.title}
      subtitle={`Model SKU: ${product.sku} | ${product.categoryLabel}`}
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Media Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Right Col: Details & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Badges & Rating */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Badge variant="wood">{product.woodType}</Badge>
                {product.inStock && <Badge variant="success">Seasoned Timber In Stock</Badge>}
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-stone-900">{product.rating}</span>
                <span className="text-stone-500">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="text-xs text-stone-500 uppercase tracking-wider">Base Architectural Shutter Price</div>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="text-3xl font-serif font-black text-stone-900">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs text-stone-500">Excl. applicable GST & delivery</span>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Standard Size: <span className="font-semibold text-stone-800">{product.standardDimensions}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Tabs for Specifications */}
            <div className="border-b border-stone-200">
              <div className="flex space-x-6 text-xs font-semibold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors border-b-2 ${
                    activeTab === 'specs'
                      ? 'border-amber-700 text-amber-900'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab('guarantee')}
                  className={`pb-2 transition-colors border-b-2 ${
                    activeTab === 'guarantee'
                      ? 'border-amber-700 text-amber-900'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Timber Certification
                </button>
              </div>
            </div>

            {/* Tab 1: Specs Table */}
            {activeTab === 'specs' && product.specifications && (
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-medium text-stone-800 mt-0.5 block">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Guarantee */}
            {activeTab === 'guarantee' && (
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs space-y-2 text-stone-700">
                <div className="flex items-center space-x-2 font-semibold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>10-Year Comprehensive Anti-Warpage Warranty</span>
                </div>
                <p className="leading-relaxed">
                  Every TimberCraft door is vacuum pressure impregnated (VPI) with organic eco-friendly timber preservatives, then oven kiln-dried down to 8-10% equilibrium moisture content.
                </p>
                <div className="flex items-center space-x-4 pt-1 text-[11px] text-stone-600">
                  <span className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Termite Proof</span>
                  <span className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Borer Proof</span>
                  <span className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Precision Jointed</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenConfigurator(product);
                }}
                className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Customize Size & Frame</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Add Standard to Quote</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleWhatsApp}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Enquiry</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isLiked
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-stone-200 hover:bg-stone-100 text-stone-600'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
