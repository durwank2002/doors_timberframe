import React from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  FileText,
  Ruler,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Drawer } from '../common/Drawer';
import { Button } from '../common/Button';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { APP_CONFIG } from '../../utils/constants';

export const CartDrawer = ({
  isOpen,
  onClose,
  onRequestFormalQuote,
}) => {
  const { cartItems, totalCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleWhatsAppCart = () => {
    if (cartItems.length === 0) return;
    const url = generateWhatsAppLink({
      type: 'cart_quote',
      data: {
        items: cartItems,
        totalValue: subtotal,
      },
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Project Quotation Cart"
      subtitle={`${totalCount} door & frame items in your specification`}
      width="max-w-lg"
    >
      {cartItems.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-serif font-bold text-stone-900">Your Quote Cart is Empty</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-xs">
              Explore our architectural collections or customize a door with exact room dimensions to build your estimate.
            </p>
          </div>
          <Button variant="primary" size="md" onClick={onClose}>
            Explore Door Collections
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between space-y-6">
          {/* Items List */}
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            {cartItems.map((item) => {
              const itemKey = item.configKey || item.id;
              return (
                <div
                  key={itemKey}
                  className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 space-y-3 relative group"
                >
                  <div className="flex space-x-3.5">
                    {/* Thumbnail */}
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-serif font-bold text-stone-900 truncate">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(itemKey)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">{item.sku}</div>

                      {/* Customized Specs breakdown if customized */}
                      {item.isCustomized && item.customSpecs && (
                        <div className="mt-2 text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-200 space-y-1">
                          <div className="flex items-center space-x-1 font-medium text-stone-800">
                            <Ruler className="w-3 h-3 text-amber-700" />
                            <span>
                              {item.customSpecs.heightInches}" H × {item.customSpecs.widthInches}" W ({item.customSpecs.areaSqFt} sq.ft)
                            </span>
                          </div>
                          <div>Timber: <strong className="text-stone-800">{item.customSpecs.woodSpecies.name}</strong></div>
                          <div>Frame: <strong className="text-stone-800">{item.customSpecs.frameProfile.name}</strong></div>
                          <div>Finish: <strong className="text-stone-800">{item.customSpecs.finish.name}</strong></div>
                        </div>
                      )}

                      {!item.isCustomized && (
                        <div className="mt-1 text-xs text-stone-500">
                          <span>Timber: {item.woodType}</span>
                        </div>
                      )}

                      {/* Price & Quantity Bar */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-200">
                        <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(itemKey, -1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemKey, 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-stone-400 font-mono">
                            {formatCurrency(item.totalPrice)} × {item.quantity} =
                          </span>
                          <div className="text-sm font-serif font-black text-stone-900">
                            {formatCurrency(item.totalPrice * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtotal & Action Bar */}
          <div className="pt-4 border-t border-stone-200 space-y-4 bg-white">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Total Items:</span>
                <span className="font-semibold text-stone-900">{totalCount} shutters/frames</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Subtotal:</span>
                <span className="font-mono font-semibold text-stone-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Estimate:</span>
                <span className="text-amber-800 font-black">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-[10px] text-stone-400">
                Final invoice will include detailed CAD dimension drawings and workshop warranty.
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppCart}
                className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Instant WhatsApp Quotation</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onRequestFormalQuote();
                }}
                className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-stone-900 hover:bg-stone-800 text-stone-50 flex items-center justify-center space-x-2 shadow-sm transition-colors"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Request Formal PDF Estimate</span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                Empty Quote Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
