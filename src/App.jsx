import React, { useState, useMemo } from 'react';
import {
  DoorClosed,
  Frame,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/layout/HeroBanner';
import { Footer } from './components/layout/Footer';
import { SearchBar } from './components/catalog/SearchBar';
import { SortDropdown } from './components/catalog/SortDropdown';
import { FilterSidebar } from './components/catalog/FilterSidebar';
import { CatalogGrid } from './components/catalog/CatalogGrid';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CustomDoorConfigurator } from './components/configurator/CustomDoorConfigurator';
import { RoomVisualizer } from './components/product/RoomVisualizer';
import { TimberSpeciesGuide } from './components/catalog/TimberSpeciesGuide';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { EnquiryModal } from './components/enquiry/EnquiryModal';
import { Drawer } from './components/common/Drawer';
import { PRODUCTS } from './data/products';
import { useDebounce } from './hooks/useDebounce';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

function TimberCraftApp() {
  // Primary Section: 'doors' (Wooden Doors) | 'frames' (Door Side Frames) | 'visualizer' | 'woods'
  const [activeSection, setActiveSection] = useState('doors');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWood, setSelectedWood] = useState('all');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Modals & Drawers
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [configuratorProduct, setConfiguratorProduct] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter products based on current activeSection ('doors' vs 'frames')
  const sectionFilteredProducts = useMemo(() => {
    // Determine target itemType
    const targetType = activeSection === 'frames' ? 'frame' : 'door';

    return PRODUCTS.filter((product) => {
      // Must match section type
      if (product.itemType !== targetType) {
        return false;
      }

      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Wood species match
      if (selectedWood !== 'all') {
        const matchesWood = product.woodType.toLowerCase().includes(selectedWood.replace('-', ' '));
        if (!matchesWood) return false;
      }

      // Max price match
      if (product.price > maxPrice) {
        return false;
      }

      // Featured only match
      if (featuredOnly && !product.isFeatured) {
        return false;
      }

      // Search query match
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesWoodType = product.woodType.toLowerCase().includes(query);
        const matchesTag = product.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesSku && !matchesWoodType && !matchesTag) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [activeSection, selectedCategory, selectedWood, maxPrice, featuredOnly, debouncedSearch, sortBy]);

  // Counts for each section
  const totalDoorsCount = useMemo(() => PRODUCTS.filter(p => p.itemType === 'door').length, []);
  const totalFramesCount = useMemo(() => PRODUCTS.filter(p => p.itemType === 'frame').length, []);

  // Handlers
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedWood('all');
    setMaxPrice(100000);
    setFeaturedOnly(false);
    setSortBy('featured');
  };

  const handleSwitchSection = (section) => {
    setActiveSection(section);
    setSelectedCategory('all');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleOpenConfigurator = (product = null) => {
    setConfiguratorProduct(product);
    setIsConfiguratorOpen(true);
  };

  const handleQuickView = (product) => {
    setActiveDetailProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleOpenEnquiry = (product = null) => {
    setEnquiryProduct(product);
    setIsEnquiryOpen(true);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenConfigurator={() => handleOpenConfigurator(null)}
        onOpenEnquiry={() => handleOpenEnquiry(null)}
      />

      {/* Hero Banner */}
      <HeroBanner
        onOpenConfigurator={() => handleOpenConfigurator(null)}
        onExploreCatalog={scrollToCatalog}
        onOpenVisualizer={() => setActiveSection('visualizer')}
      />

      {/* Main Catalog & Content Workspace */}
      <main id="catalog-showcase" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Prominent Section Switcher (Wooden Doors vs Door Side Frames) */}
        <section className="bg-white rounded-3xl p-3 sm:p-4 border border-stone-200/90 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Section Tab 1: Wooden Doors */}
            <button
              onClick={() => handleSwitchSection('doors')}
              className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between transition-all duration-200 text-left border-2 ${
                activeSection === 'doors'
                  ? 'bg-amber-50/70 border-amber-600 shadow-md ring-2 ring-amber-600/20'
                  : 'bg-stone-50 border-stone-200 hover:border-stone-300 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeSection === 'doors' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  <DoorClosed className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base sm:text-lg font-serif font-black text-stone-900">
                      Wooden Doors Section
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-200/80 text-amber-900">
                      {totalDoorsCount} Designs
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Main entrance, Deepalakshmi pooja, sunburst, & curved panel doors
                  </p>
                </div>
              </div>
              <div className={`hidden md:block text-xs font-bold uppercase tracking-wider ${
                activeSection === 'doors' ? 'text-amber-800' : 'text-stone-400'
              }`}>
                {activeSection === 'doors' ? 'Currently Viewing' : 'View Doors →'}
              </div>
            </button>

            {/* Section Tab 2: Door Side Frames */}
            <button
              onClick={() => handleSwitchSection('frames')}
              className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between transition-all duration-200 text-left border-2 ${
                activeSection === 'frames'
                  ? 'bg-amber-50/70 border-amber-600 shadow-md ring-2 ring-amber-600/20'
                  : 'bg-stone-50 border-stone-200 hover:border-stone-300 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeSection === 'frames' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  <Frame className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base sm:text-lg font-serif font-black text-stone-900">
                      Door Side Frames (Choukaths)
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-200/80 text-amber-900">
                      {totalFramesCount} Models
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Om & elephant frames, Gaja Lakshmi lintels, & spiral lotus side jambs
                  </p>
                </div>
              </div>
              <div className={`hidden md:block text-xs font-bold uppercase tracking-wider ${
                activeSection === 'frames' ? 'text-amber-800' : 'text-stone-400'
              }`}>
                {activeSection === 'frames' ? 'Currently Viewing' : 'View Frames →'}
              </div>
            </button>
          </div>
        </section>

        {/* Section View: Either Doors Catalog OR Frames Catalog */}
        {(activeSection === 'doors' || activeSection === 'frames') && (
          <section className="space-y-8">
            {/* Search & Sort Controls Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
                placeholder={activeSection === 'doors' ? 'Search wooden doors by style, wood, SKU...' : 'Search side frames, choukaths, lintels...'}
              />

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs text-stone-500 hidden md:inline">
                  Showing <strong className="text-stone-900">{sectionFilteredProducts.length}</strong> {activeSection === 'doors' ? 'doors' : 'side frames'}
                </span>
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Catalog Grid with Sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Desktop Filter Sidebar (3 cols) */}
              <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-28">
                <FilterSidebar
                  activeSection={activeSection}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  selectedWood={selectedWood}
                  onSelectWood={setSelectedWood}
                  maxPrice={maxPrice}
                  onMaxPriceChange={setMaxPrice}
                  featuredOnly={featuredOnly}
                  onToggleFeatured={setFeaturedOnly}
                  onResetFilters={handleResetFilters}
                />
              </div>

              {/* Product Grid (9 cols) */}
              <div className="md:col-span-8 lg:col-span-9">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-serif font-black text-stone-900">
                    {activeSection === 'doors'
                      ? 'Solid Wood Door Shutters Collection'
                      : 'Hand-Carved Door Side Frames & Choukaths'}
                  </h3>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {activeSection === 'doors' ? '100% Solid Teak' : 'Kiln-Dried Choukaths'}
                  </span>
                </div>

                <CatalogGrid
                  products={sectionFilteredProducts}
                  totalCount={activeSection === 'doors' ? totalDoorsCount : totalFramesCount}
                  onQuickView={handleQuickView}
                  onCustomize={handleOpenConfigurator}
                  onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          </section>
        )}

        {/* Room Visualizer View */}
        {activeSection === 'visualizer' && (
          <section className="space-y-6">
            <RoomVisualizer
              door={PRODUCTS[0]}
              onCustomize={() => handleOpenConfigurator(PRODUCTS[0])}
            />
          </section>
        )}

        {/* Hardwood Species Guide View */}
        {activeSection === 'woods' && (
          <TimberSpeciesGuide
            onSelectWoodFilter={(woodId) => {
              setSelectedWood(woodId);
              setActiveSection('doors');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(categoryId) => {
          setSelectedCategory(categoryId);
          scrollToCatalog();
        }}
      />

      {/* Mobile Filters Drawer */}
      <Drawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        title="Refine Selection"
        subtitle="Filter by wood species, dimensions, and price"
      >
        <FilterSidebar
          activeSection={activeSection}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setIsMobileFiltersOpen(false);
          }}
          selectedWood={selectedWood}
          onSelectWood={(wood) => {
            setSelectedWood(wood);
            setIsMobileFiltersOpen(false);
          }}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          featuredOnly={featuredOnly}
          onToggleFeatured={setFeaturedOnly}
          onResetFilters={() => {
            handleResetFilters();
            setIsMobileFiltersOpen(false);
          }}
        />
      </Drawer>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeDetailProduct}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setActiveDetailProduct(null);
        }}
        onOpenConfigurator={(product) => {
          setIsDetailModalOpen(false);
          handleOpenConfigurator(product);
        }}
      />

      {/* Custom Door & Frame Dynamic Configurator Modal */}
      <CustomDoorConfigurator
        isOpen={isConfiguratorOpen}
        onClose={() => {
          setIsConfiguratorOpen(false);
          setConfiguratorProduct(null);
        }}
        initialProduct={configuratorProduct}
      />

      {/* Cart & Quotation Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRequestFormalQuote={() => handleOpenEnquiry(null)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onQuickView={handleQuickView}
        onCustomize={handleOpenConfigurator}
      />

      {/* Request For Quote (RFQ) Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => {
          setIsEnquiryOpen(false);
          setEnquiryProduct(null);
        }}
        targetProduct={enquiryProduct}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <TimberCraftApp />
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
