import { useMemo } from 'react';
import { calculateCustomDoorPrice } from '../utils/formatters';

/**
 * Hook to dynamically calculate door & frame price with memoization
 * 
 * @param {Object} config
 * @returns {Object} Price calculation results
 */
export const usePriceCalculator = ({
  baseDoorPrice,
  heightInches,
  widthInches,
  woodSpecies,
  frameProfile,
  finish,
  hardware,
}) => {
  return useMemo(() => {
    return calculateCustomDoorPrice({
      baseDoorPrice,
      heightInches,
      widthInches,
      woodSpecies,
      frameProfile,
      finish,
      hardware,
    });
  }, [
    baseDoorPrice,
    heightInches,
    widthInches,
    woodSpecies,
    frameProfile,
    finish,
    hardware,
  ]);
};
