import React from 'react';
import { RotateCcw, Filter, Check } from 'lucide-react';
import { CATEGORIES, WOOD_SPECIES_LIST } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export const FilterSidebar = ({
  activeSection = 'doors',
  selectedCategory,
  onSelectCategory,
  selectedWood,
  onSelectWood,
  maxPrice,
  onMaxPriceChange,
  priceLimit = 100000,
  featuredOnly,
  onToggleFeatured,
  onResetFilters,
  className = '',
}) => {
  const visibleCategories = CATEGORIES.filter((category) => {
    if (activeSection === 'doors') {
      return category.id === 'all' || category.id === 'main-entrance' || category.id === 'pooja-doors';
    }
    if (activeSection === 'frames') {
      return category.id === 'all' || category.id === 'wooden-frames';
    }
    return true;
  });

  return (
    <aside className={`bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-7 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center space-x-2 text-stone-900 font-serif font-bold text-base">
          <Filter className="w-4 h-4 text-amber-600" />
          <span>Refine {activeSection === 'doors' ? 'Doors' : 'Side Frames'}</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-amber-700 hover:text-amber-900 font-medium flex items-center space-x-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">
          {activeSection === 'doors' ? 'Door Styles' : 'Frame Profiles'}
        </label>
        <div className="space-y-1">
          {visibleCategories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-stone-900 text-stone-50'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <span>
                  {category.id === 'all'
                    ? activeSection === 'doors'
                      ? 'All Wooden Doors'
                      : 'All Door Side Frames'
                    : category.label}
                </span>
                {isActive && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wood Species */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">
          Hardwood Species
        </label>
        <div className="space-y-1">
          <button
            onClick={() => onSelectWood('all')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
              selectedWood === 'all'
                ? 'bg-amber-50 text-amber-900 border border-amber-200 font-semibold'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <span>All Hardwoods</span>
            {selectedWood === 'all' && <Check className="w-3 h-3 text-amber-600" />}
          </button>
          {WOOD_SPECIES_LIST.map((wood) => {
            const isSelected = selectedWood === wood.id;
            return (
              <button
                key={wood.id}
                onClick={() => onSelectWood(wood.id)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-amber-50 text-amber-900 border border-amber-200 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                    style={{ backgroundColor: wood.colorHex }}
                  />
                  <span className="truncate">{wood.name}</span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="uppercase tracking-wider font-semibold text-stone-500">Max Budget</span>
          <span className="font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
            {formatCurrency(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="15000"
          max={priceLimit}
          step="2500"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-amber-600 cursor-pointer"
          aria-label="Filter products by maximum price"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-medium">
          <span>{formatCurrency(15000)}</span>
          <span>{formatCurrency(priceLimit)}</span>
        </div>
      </div>

      {/* Featured Checkbox */}
      <div className="pt-2 border-t border-stone-100">
        <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-stone-700">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => onToggleFeatured(e.target.checked)}
            className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
          />
          <span>Show Featured Only</span>
        </label>
      </div>
    </aside>
  );
};
