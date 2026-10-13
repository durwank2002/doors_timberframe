import React from 'react';
import { Heart, Trash2, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { Drawer } from '../common/Drawer';
import { Button } from '../common/Button';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatters';

export const WishlistDrawer = ({
  isOpen,
  onClose,
  onQuickView,
  onCustomize,
}) => {
  const { wishlist, wishlistCount, toggleWishlist, clearWishlist } = useWishlist();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Saved Door Portfolio"
      subtitle={`${wishlistCount} doors saved to your wishlist`}
      width="max-w-md"
    >
      {wishlist.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-serif font-bold text-stone-900">Your Wishlist is Empty</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-xs">
              Save your favorite entrance doors, carved pooja shutters, and timber frames while browsing.
            </p>
          </div>
          <Button variant="primary" size="md" onClick={onClose}>
            Browse Door Portfolio
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between space-y-6">
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 flex space-x-3.5 group"
              >
                {/* Image */}
                <div
                  className="w-16 h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 cursor-pointer border border-stone-300"
                  onClick={() => {
                    onClose();
                    onQuickView(item);
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4
                        className="text-sm font-serif font-bold text-stone-900 truncate hover:text-amber-800 cursor-pointer"
                        onClick={() => {
                          onClose();
                          onQuickView(item);
                        }}
                      >
                        {item.title}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">{item.sku}</div>
                    <div className="text-xs text-stone-700 font-serif font-bold mt-1">
                      {formatCurrency(item.price)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onCustomize(item);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg flex items-center space-x-1"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                      <span>Customize</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onQuickView(item);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-stone-100 text-stone-700 rounded-lg border border-stone-200"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-between items-center text-xs">
            <button
              onClick={clearWishlist}
              className="text-stone-400 hover:text-rose-600 transition-colors"
            >
              Clear All Wishlist
            </button>
            <Button variant="primary" size="sm" onClick={onClose}>
              Continue Browsing
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};
