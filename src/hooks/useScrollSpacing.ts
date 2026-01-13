import { useState, useEffect, useRef } from 'react';

interface UseScrollSpacingOptions {
  baseSpacing?: number;
  minSpacing?: number;
  velocityThreshold?: number;
}

export const useScrollSpacing = ({
  baseSpacing = 6,
  minSpacing = 2,
  velocityThreshold = 5,
}: UseScrollSpacingOptions = {}) => {
  // Disabled for performance optimization
  // Previously caused layout thrashing by changing margin during scroll
  return baseSpacing;
};
