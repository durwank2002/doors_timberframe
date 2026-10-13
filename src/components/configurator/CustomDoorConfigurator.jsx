import React, { useState, useEffect } from 'react';
import {
  Ruler,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  ShoppingBag,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import {
  DIMENSION_LIMITS,
  WOOD_SPECIES_LIST,
  FINISH_OPTIONS,
  FRAME_PROFILES,
  HARDWARE_PACKAGES,
  APP_CONFIG,
} from '../../utils/constants';
import {
  formatCurrency,
  calculateDoorAreaSqFt,
  calculateFrameRunningFeet,
  calculateCustomDoorPrice,
} from '../../utils/formatters';
import { validateDimensions } from '../../utils/validators';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { useCart } from '../../context/CartContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

export const CustomDoorConfigurator = ({
  isOpen,
  onClose,
  initialProduct = null,
}) => {
  // Dimensions
  const [heightInches, setHeightInches] = useState(
    initialProduct?.defaultHeight || DIMENSION_LIMITS.DEFAULT_HEIGHT_INCHES
  );
  const [widthInches, setWidthInches] = useState(
    initialProduct?.defaultWidth || DIMENSION_LIMITS.DEFAULT_WIDTH_INCHES
  );
  const [thicknessMm, setThicknessMm] = useState(
    initialProduct?.defaultThickness || DIMENSION_LIMITS.DEFAULT_THICKNESS_MM
  );

  // Configuration options
  const [selectedWood, setSelectedWood] = useState(WOOD_SPECIES_LIST[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_PROFILES[1]); // Default standard choukath
  const [selectedFinish, setSelectedFinish] = useState(FINISH_OPTIONS[0]);
  const [selectedHardware, setSelectedHardware] = useState(HARDWARE_PACKAGES[0]);

  // Base craftsmanship price from initial product (or standard)
  const baseCraftPrice = initialProduct ? initialProduct.price * 0.4 : 18000;

  const { addToCart } = useCart();

  // Update defaults when initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      if (initialProduct.defaultHeight) setHeightInches(initialProduct.defaultHeight);
      if (initialProduct.defaultWidth) setWidthInches(initialProduct.defaultWidth);
      if (initialProduct.defaultThickness) setThicknessMm(initialProduct.defaultThickness);
    }
  }, [initialProduct]);

  // Dimension validation
  const validation = validateDimensions(heightInches, widthInches, thicknessMm);

  // Dynamic price calculation
  const priceBreakdown = calculateCustomDoorPrice({
    baseDoorPrice: baseCraftPrice,
    heightInches: Number(heightInches) || 84,
    widthInches: Number(widthInches) || 38,
    woodSpecies: selectedWood,
    frameProfile: selectedFrame,
    finish: selectedFinish,
    hardware: selectedHardware,
  });

  const handleAddToCart = () => {
    if (!validation.isValid) return;

    const configKey = `${initialProduct?.id || 'custom'}-${selectedWood.id}-${selectedFrame.id}-${selectedFinish.id}-${heightInches}x${widthInches}`;

    addToCart({
      id: initialProduct?.id || 'custom-door',
      configKey,
      title: initialProduct ? `Custom ${initialProduct.title}` : `Custom Artisan Door & Frame`,
      sku: initialProduct ? `${initialProduct.sku}-CUST` : 'TC-CUSTOM-SPEC',
      totalPrice: priceBreakdown.grandTotal,
      image: initialProduct?.images[0] || '/images/doors/teak-curved-panel-door-0406.png',
      isCustomized: true,
      customSpecs: {
        heightInches,
        widthInches,
        thicknessMm,
        areaSqFt: priceBreakdown.areaSqFt,
        frameRft: priceBreakdown.frameRft,
        woodSpecies: selectedWood,
        frameProfile: selectedFrame,
        finish: selectedFinish,
        hardware: selectedHardware,
        priceBreakdown,
      },
    });

    onClose();
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppLink({
      type: 'custom_config',
      data: {
        productTitle: initialProduct?.title || 'Architectural Custom Door',
        productSku: initialProduct?.sku || 'TC-CUSTOM-SPEC',
        heightInches,
        widthInches,
        thicknessMm,
        areaSqFt: priceBreakdown.areaSqFt,
        frameRft: priceBreakdown.frameRft,
        woodSpecies: selectedWood,
        frameProfile: selectedFrame,
        finish: selectedFinish,
        hardware: selectedHardware,
        priceBreakdown,
      },
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialProduct ? `Bespoke Customizer: ${initialProduct.title}` : 'Custom Architectural Door & Frame Studio'}
      subtitle="Tailor exact dimensions, hardwood lumber, frame choukath profiles, and luxury finishes with dynamic live pricing"
      maxWidth="max-w-6xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-2">
          {/* Step 1: Precision Dimensions */}
          <section className="space-y-4 bg-stone-50/70 p-5 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-stone-900 font-serif font-bold text-sm">
                <Ruler className="w-4 h-4 text-amber-700" />
                <span>1. Millwork Dimensions (Inches & MM)</span>
              </div>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                Area: {priceBreakdown.areaSqFt} sq.ft
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Height */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-600 flex justify-between">
                  <span>Height</span>
                  <span className="text-stone-900 font-mono font-bold">{heightInches}" ({(heightInches / 12).toFixed(1)} ft)</span>
                </label>
                <input
                  type="number"
                  min={DIMENSION_LIMITS.MIN_HEIGHT_INCHES}
                  max={DIMENSION_LIMITS.MAX_HEIGHT_INCHES}
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono"
                />
                <input
                  type="range"
                  min={DIMENSION_LIMITS.MIN_HEIGHT_INCHES}
                  max={DIMENSION_LIMITS.MAX_HEIGHT_INCHES}
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  className="w-full accent-amber-700 cursor-pointer"
                />
                {validation.errors.height && (
                  <p className="text-[11px] text-rose-600 font-medium">{validation.errors.height}</p>
                )}
              </div>

              {/* Width */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-600 flex justify-between">
                  <span>Width</span>
                  <span className="text-stone-900 font-mono font-bold">{widthInches}" ({(widthInches / 12).toFixed(1)} ft)</span>
                </label>
                <input
                  type="number"
                  min={DIMENSION_LIMITS.MIN_WIDTH_INCHES}
                  max={DIMENSION_LIMITS.MAX_WIDTH_INCHES}
                  value={widthInches}
                  onChange={(e) => setWidthInches(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono"
                />
                <input
                  type="range"
                  min={DIMENSION_LIMITS.MIN_WIDTH_INCHES}
                  max={DIMENSION_LIMITS.MAX_WIDTH_INCHES}
                  value={widthInches}
                  onChange={(e) => setWidthInches(Number(e.target.value))}
                  className="w-full accent-amber-700 cursor-pointer"
                />
                {validation.errors.width && (
                  <p className="text-[11px] text-rose-600 font-medium">{validation.errors.width}</p>
                )}
              </div>

              {/* Thickness */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-600 flex justify-between">
                  <span>Thickness</span>
                  <span className="text-stone-900 font-mono font-bold">{thicknessMm} mm</span>
                </label>
                <select
                  value={thicknessMm}
                  onChange={(e) => setThicknessMm(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono"
                >
                  <option value={32}>32 mm (Lightweight Internal)</option>
                  <option value={35}>35 mm (Standard Interior)</option>
                  <option value={40}>40 mm (Standard Entrance)</option>
                  <option value={45}>45 mm (Heavy Luxury Entrance)</option>
                  <option value={50}>50 mm (Ultra Grand Villa)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Step 2: Wood Species Selection */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-stone-500">
                2. Hardwood Timber Species
              </span>
              <span className="text-xs text-amber-700 font-medium">
                {selectedWood.name} ({formatCurrency(selectedWood.pricePerSqFt)}/sq.ft)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WOOD_SPECIES_LIST.map((wood) => {
                const isSelected = selectedWood.id === wood.id;
                return (
                  <div
                    key={wood.id}
                    onClick={() => setSelectedWood(wood)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-700 bg-amber-50/50 shadow-sm'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-xs"
                          style={{ backgroundColor: wood.colorHex }}
                        />
                        <div>
                          <div className="text-xs font-bold text-stone-900">{wood.name}</div>
                          <div className="text-[10px] text-stone-500">{wood.origin}</div>
                        </div>
                      </div>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-amber-700" />
                      ) : (
                        <span className="text-[10px] text-stone-400 font-mono font-medium">
                          {formatCurrency(wood.pricePerSqFt)}/sqft
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-[10px] text-stone-500 line-clamp-1">
                      {wood.grain}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Step 3: Wooden Frame (Choukath) Profile */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-stone-500">
                3. Wooden Frame (Choukath) Profile
              </span>
              <span className="text-xs text-stone-500">
                Frame Running Length: <strong className="text-stone-800">{priceBreakdown.frameRft} Rft</strong>
              </span>
            </div>

            <div className="space-y-2">
              {FRAME_PROFILES.map((frame) => {
                const isSelected = selectedFrame.id === frame.id;
                return (
                  <div
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-700 bg-amber-50/60 font-medium'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-stone-900">{frame.name}</div>
                      <div className="text-[11px] text-stone-500">{frame.description}</div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      {isSelected && <Check className="w-4 h-4 text-amber-700 ml-auto" />}
                      <span className="text-[11px] text-stone-600 block">
                        {frame.id === 'none' ? 'Excluded' : frame.rebateType.split('(')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Step 4: Finish & Polishing */}
          <section className="space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-stone-500 block">
              4. Finish & Surface Treatment
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FINISH_OPTIONS.map((fin) => {
                const isSelected = selectedFinish.id === fin.id;
                return (
                  <div
                    key={fin.id}
                    onClick={() => setSelectedFinish(fin)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-700 bg-amber-50/60'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-xs font-bold text-stone-900">{fin.name}</div>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-amber-700" />
                      ) : (
                        <span className="text-[10px] text-stone-400 font-mono">
                          {fin.priceAddon === 0 ? 'Included' : `+${formatCurrency(fin.priceAddon)}`}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1">{fin.description}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Step 5: Hardware Pack */}
          <section className="space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-stone-500 block">
              5. Architectural Hardware Package
            </span>

            <div className="space-y-2">
              {HARDWARE_PACKAGES.map((hw) => {
                const isSelected = selectedHardware.id === hw.id;
                return (
                  <div
                    key={hw.id}
                    onClick={() => setSelectedHardware(hw)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-700 bg-amber-50/60'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">{hw.name}</div>
                      <div className="text-[11px] text-stone-500">{hw.description}</div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      {isSelected && <Check className="w-4 h-4 text-amber-700 ml-auto" />}
                      <span className="text-xs font-mono font-bold text-stone-800">
                        {hw.price === 0 ? 'None' : `+${formatCurrency(hw.price)}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Live Sticky Quotation Engine Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 bg-stone-900 text-stone-100 rounded-3xl p-6 shadow-2xl border border-stone-800 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Real-Time Calculation
                </span>
                <h3 className="text-lg font-serif font-bold text-white">Itemized Quotation</h3>
              </div>
              <Badge variant="luxury">SonarQube Engine</Badge>
            </div>

            {/* Dynamic Specification Breakdown */}
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Door Shutter Surface ({priceBreakdown.areaSqFt} sq.ft):</span>
                <span className="font-mono font-semibold text-white">
                  {formatCurrency(priceBreakdown.woodShutterCost)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Choukath Frame ({priceBreakdown.frameRft} Rft):</span>
                <span className="font-mono font-semibold text-white">
                  {formatCurrency(priceBreakdown.frameCost)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Selected Polish & Finish:</span>
                <span className="font-mono font-semibold text-white">
                  {formatCurrency(priceBreakdown.finishCost)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Hardware Package:</span>
                <span className="font-mono font-semibold text-white">
                  {formatCurrency(priceBreakdown.hardwareCost)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Artisan Joinery & Relief Craft:</span>
                <span className="font-mono font-semibold text-white">
                  {formatCurrency(priceBreakdown.craftCarvingCost)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-800/60 text-stone-400">
                <span>Subtotal (Millwork):</span>
                <span className="font-mono font-semibold text-stone-200">
                  {formatCurrency(priceBreakdown.subtotal)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-800/60 text-stone-400">
                <span>Estimated GST (18%):</span>
                <span className="font-mono font-semibold text-stone-200">
                  {formatCurrency(priceBreakdown.estimatedTax)}
                </span>
              </div>
            </div>

            {/* Total Price Box */}
            <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/80">
              <span className="text-[11px] text-amber-300 uppercase tracking-wider block font-semibold">
                Estimated Net Investment
              </span>
              <div className="text-3xl font-serif font-black text-white mt-1">
                {formatCurrency(priceBreakdown.grandTotal)}
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Includes seasoning, precision calibration, packaging, and warranty.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!validation.isValid}
                className="w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-stone-950 flex items-center justify-center space-x-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Customized Spec to Quote</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-600 text-white flex items-center justify-center space-x-2 transition-colors border border-emerald-500/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Specification to WhatsApp</span>
              </button>
            </div>

            {/* Reassurance points */}
            <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 space-y-1.5">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Includes {APP_CONFIG.WARRANTY_YEARS}-Year Timber Warranty certificate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Workshop Lead Time: {APP_CONFIG.ESTIMATED_DELIVERY_DAYS}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
