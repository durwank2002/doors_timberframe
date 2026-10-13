import { APP_CONFIG } from './constants';

/**
 * Currency formatter with Indian Rupee formatting or fallback
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return `${APP_CONFIG.CURRENCY_SYMBOL}0`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: APP_CONFIG.CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate door shutter area in square feet
 * Formula: (Height in inches * Width in inches) / 144
 * @param {number} heightInches
 * @param {number} widthInches
 * @returns {number} Area in sq.ft rounded to 2 decimals
 */
export const calculateDoorAreaSqFt = (heightInches, widthInches) => {
  if (!heightInches || !widthInches || heightInches <= 0 || widthInches <= 0) return 0;
  const sqInches = heightInches * widthInches;
  return Number((sqInches / 144).toFixed(2));
};

/**
 * Calculate frame running feet (Rft) for a 3-sided door choukath
 * Formula: 2 upright jambs + 1 top header lintel
 * (2 * Height + Width) / 12
 * @param {number} heightInches
 * @param {number} widthInches
 * @returns {number} Running feet rounded to 2 decimals
 */
export const calculateFrameRunningFeet = (heightInches, widthInches) => {
  if (!heightInches || !widthInches || heightInches <= 0 || widthInches <= 0) return 0;
  const totalInches = (2 * heightInches) + widthInches;
  return Number((totalInches / 12).toFixed(2));
};

/**
 * Dynamic price computation engine for custom doors
 * SonarQube compliant: Pure deterministic calculation, no external side effects.
 * 
 * @param {Object} params
 * @param {number} params.baseDoorPrice - Base design & carving craftsmanship cost
 * @param {number} params.heightInches - Shutter height
 * @param {number} params.widthInches - Shutter width
 * @param {Object} params.woodSpecies - Selected wood object
 * @param {Object} params.frameProfile - Selected frame profile
 * @param {Object} params.finish - Selected finish
 * @param {Object} params.hardware - Selected hardware pack
 * @returns {Object} Comprehensive itemized price breakdown
 */
export const calculateCustomDoorPrice = ({
  baseDoorPrice = 0,
  heightInches = 84,
  widthInches = 38,
  woodSpecies = null,
  frameProfile = null,
  finish = null,
  hardware = null,
}) => {
  const areaSqFt = calculateDoorAreaSqFt(heightInches, widthInches);
  const frameRft = calculateFrameRunningFeet(heightInches, widthInches);

  // Wood cost for shutter leaf
  const woodRatePerSqFt = woodSpecies ? woodSpecies.pricePerSqFt : 1000;
  const woodShutterCost = Math.round(areaSqFt * woodRatePerSqFt);

  // Frame cost if frame is selected
  let frameCost = 0;
  if (frameProfile && frameProfile.id !== 'none' && woodSpecies) {
    const baseFrameRate = woodSpecies.frameRatePerRft || 500;
    const adjustedFrameRate = baseFrameRate * (frameProfile.rateMultiplier || 1.0);
    frameCost = Math.round(frameRft * adjustedFrameRate);
  }

  // Finish addon cost
  const finishCost = finish ? (finish.priceAddon || 0) : 0;

  // Hardware cost
  const hardwareCost = hardware ? (hardware.price || 0) : 0;

  // Carving & architectural craft complexity (base price)
  const craftCarvingCost = Math.max(0, baseDoorPrice);

  const subtotal = woodShutterCost + frameCost + finishCost + hardwareCost + craftCarvingCost;
  const estimatedTax = Math.round(subtotal * APP_CONFIG.DEFAULT_TAX_RATE);
  const grandTotal = subtotal + estimatedTax;

  return {
    areaSqFt,
    frameRft,
    woodShutterCost,
    frameCost,
    finishCost,
    hardwareCost,
    craftCarvingCost,
    subtotal,
    estimatedTax,
    grandTotal,
  };
};
