import React, { useState } from 'react';
import { Heart, SlidersHorizontal, Eye, MessageCircle, Star, Ruler, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { useWishlist } from '../../context/WishlistContext';
import { Badge } from '../common/Badge';

export const ProductCard = ({
  product,
  onQuickView,
  onCustomize,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const url = generateWhatsAppLink({
      type: 'product_enquiry',
      data: product,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fallbackImageUrl = '/images/doors/teak-curved-panel-door-0406.png';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Media Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onQuickView(product)}>
        {/* Skeleton Loader behind image */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse" />
        )}

        <img
          src={imageError ? fallbackImageUrl : product.images[0]}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isFeatured && (
            <Badge variant="luxury">Featured Design</Badge>
          )}
          <Badge variant="wood">{product.woodType.split(' ')[0]}</Badge>
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            isLiked
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/80 text-stone-600 hover:text-stone-950 hover:bg-white shadow-xs'
          }`}
          aria-label={isLiked ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
        </button>

        {/* Hover Quick View Overlay Action */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 bg-white/95 text-stone-900 text-xs font-semibold rounded-full shadow-lg flex items-center space-x-1.5 hover:bg-white hover:scale-105 transition-transform"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>Inspect Details & Zoom</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          {/* Rating and SKU */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-mono text-[11px] text-stone-400">{product.sku}</span>
            <div className="flex items-center space-x-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-stone-800">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-serif font-bold text-stone-900 line-clamp-1 hover:text-amber-800 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Dimension spec indicator */}
          <div className="flex items-center space-x-1.5 text-xs text-stone-600 pt-1">
            <Ruler className="w-3.5 h-3.5 text-stone-400" />
            <span className="truncate">{product.standardDimensions}</span>
          </div>
        </div>

        {/* Price & CTA Section */}
        <div className="pt-4 mt-4 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Base Shutter From</span>
              <span className="text-lg font-serif font-black text-stone-900">
                {formatCurrency(product.price)}
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center">
              <ShieldCheck className="w-3 h-3 mr-1" />
              10-Yr Timber
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onCustomize(product)}
              className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Customize</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60 flex items-center justify-center space-x-1.5 transition-colors"
              title="Chat with Woodcraft Specialist on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
