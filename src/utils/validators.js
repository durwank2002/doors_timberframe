import { DIMENSION_LIMITS } from './constants';

/**
 * Validate custom door dimensions
 * @param {number} height - In inches
 * @param {number} width - In inches
 * @param {number} thickness - In mm
 * @returns {{ isValid: boolean, errors: Object }}
 */
export const validateDimensions = (height, width, thickness) => {
  const errors = {};

  const numHeight = Number(height);
  const numWidth = Number(width);
  const numThickness = Number(thickness);

  if (isNaN(numHeight) || numHeight < DIMENSION_LIMITS.MIN_HEIGHT_INCHES || numHeight > DIMENSION_LIMITS.MAX_HEIGHT_INCHES) {
    errors.height = `Height must be between ${DIMENSION_LIMITS.MIN_HEIGHT_INCHES}" (${DIMENSION_LIMITS.MIN_HEIGHT_INCHES/12} ft) and ${DIMENSION_LIMITS.MAX_HEIGHT_INCHES}" (${DIMENSION_LIMITS.MAX_HEIGHT_INCHES/12} ft).`;
  }

  if (isNaN(numWidth) || numWidth < DIMENSION_LIMITS.MIN_WIDTH_INCHES || numWidth > DIMENSION_LIMITS.MAX_WIDTH_INCHES) {
    errors.width = `Width must be between ${DIMENSION_LIMITS.MIN_WIDTH_INCHES}" and ${DIMENSION_LIMITS.MAX_WIDTH_INCHES}".`;
  }

  if (isNaN(numThickness) || numThickness < DIMENSION_LIMITS.MIN_THICKNESS_MM || numThickness > DIMENSION_LIMITS.MAX_THICKNESS_MM) {
    errors.thickness = `Thickness must be between ${DIMENSION_LIMITS.MIN_THICKNESS_MM}mm and ${DIMENSION_LIMITS.MAX_THICKNESS_MM}mm.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate customer contact / quotation enquiry form
 * @param {Object} formData
 * @returns {{ isValid: boolean, errors: Object }}
 */
export const validateEnquiryForm = (formData) => {
  const errors = {};
  const trimmedName = (formData.name || '').trim();
  const trimmedPhone = (formData.phone || '').trim();
  const trimmedEmail = (formData.email || '').trim();

  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'Please provide your full name (minimum 2 characters).';
  }

  // International phone regex: Allows +, spaces, dashes, 7 to 15 digits
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,14}$/;
  if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
    errors.phone = 'Please provide a valid contact phone number.';
  }

  // Basic email pattern if provided
  if (trimmedEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
