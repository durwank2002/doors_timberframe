import React, { useState } from 'react';
import {
  DoorClosed,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  MessageCircle,
  Menu,
  X,
  Compass,
  Frame,
} from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const Navbar = ({
  activeSection, // 'doors' | 'frames' | 'visualizer' | 'woods'
  setActiveSection,
  onOpenCart,
  onOpenWishlist,
  onOpenConfigurator,
  onOpenEnquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('doors')}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-stone-900 to-amber-950 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform">
              <DoorClosed className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-serif font-black tracking-tight text-stone-900 block leading-none">
                {APP_CONFIG.BRAND_NAME}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-700 block mt-1">
                Doors & Side Frames Atelier
              </span>
            </div>
          </div>

          {/* Desktop Navigation with Distinct Door & Side Frame Sections */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {/* Section 1: Wooden Doors */}
            <button
              onClick={() => handleNavClick('doors')}
              className={`text-sm font-semibold transition-all flex items-center space-x-1.5 py-1.5 px-3 rounded-xl ${
                activeSection === 'doors'
                  ? 'bg-amber-100/70 text-amber-900 ring-1 ring-amber-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <DoorClosed className="w-4 h-4 text-amber-700" />
              <span>Wooden Doors</span>
            </button>

            {/* Section 2: Door Side Frames */}
            <button
              onClick={() => handleNavClick('frames')}
              className={`text-sm font-semibold transition-all flex items-center space-x-1.5 py-1.5 px-3 rounded-xl ${
                activeSection === 'frames'
                  ? 'bg-amber-100/70 text-amber-900 ring-1 ring-amber-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Frame className="w-4 h-4 text-amber-700" />
              <span>Door Side Frames (Choukaths)</span>
            </button>

            {/* Configurator */}
            <button
              onClick={() => {
                onOpenConfigurator();
                setMobileMenuOpen(false);
              }}
              className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors flex items-center space-x-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>Configurator</span>
            </button>

            {/* Room Visualizer */}
            <button
              onClick={() => handleNavClick('visualizer')}
              className={`text-sm font-medium transition-colors hover:text-amber-700 flex items-center space-x-1.5 ${
                activeSection === 'visualizer' ? 'text-amber-800 font-bold' : 'text-stone-600'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Room Visualizer</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors focus:outline-none"
              aria-label="View saved wishlist doors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-amber-600 text-white rounded-full text-xs font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart / Quote Summary Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors focus:outline-none"
              aria-label="View custom door quotations in cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-stone-900 text-amber-300 rounded-full text-xs font-bold flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Request Quote Button */}
            <button
              onClick={onOpenEnquiry}
              className="hidden lg:inline-flex items-center space-x-2 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 active:bg-stone-950 transition-all shadow-sm"
            >
              <span>Get Estimate</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-4 px-2 space-y-3 bg-white">
            <button
              onClick={() => handleNavClick('doors')}
              className={`w-full text-left px-3 py-2 text-sm font-semibold rounded-lg flex items-center justify-between ${
                activeSection === 'doors' ? 'bg-amber-100 text-amber-900' : 'text-stone-800'
              }`}
            >
              <span>🚪 Wooden Doors Section</span>
            </button>
            <button
              onClick={() => handleNavClick('frames')}
              className={`w-full text-left px-3 py-2 text-sm font-semibold rounded-lg flex items-center justify-between ${
                activeSection === 'frames' ? 'bg-amber-100 text-amber-900' : 'text-stone-800'
              }`}
            >
              <span>🖼️ Door Side Frames (Choukaths) Section</span>
            </button>
            <button
              onClick={() => {
                onOpenConfigurator();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50 rounded-lg flex items-center justify-between"
            >
              <span>Custom Door & Frame Configurator</span>
              <SlidersHorizontal className="w-4 h-4 text-amber-700" />
            </button>
            <button
              onClick={() => handleNavClick('visualizer')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50 rounded-lg flex items-center justify-between"
            >
              <span>Room Simulation Visualizer</span>
              <Compass className="w-4 h-4 text-amber-700" />
            </button>
            <button
              onClick={() => {
                onOpenEnquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-stone-900 text-stone-50"
            >
              Request Custom Estimate
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
