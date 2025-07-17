// Basic Bitmap Method
export { bitmap } from './bitmap';

// Error Diffusion Methods
export { floydSteinberg } from './floyd-steinberg';
export { burkes } from './burkes';
export { sierra, sierraLite } from './sierra';
export { jarvisJudiceNinke, stucki, atkinson, stevensonArce } from './error-diffusion';

// Ordered Dithering Methods
export { bayer2x2, bayer4x4, bayer8x8, clustered4x4, dotDiffusion, voidAndCluster } from './ordered';

// Noise-Based Methods
export { randomDithering, whiteNoise, blueNoise } from './noise-based';

// Experimental Methods
export { halftoneCircles, hybridDithering, thresholdModulation } from './experimental';

// Types
export type { DitheringMethod, DitherOptions, DitheringCategory } from './types';

import { DitheringMethod, DitheringCategory, DitherOptions } from './types';
import { bitmap } from './bitmap';
import { floydSteinberg } from './floyd-steinberg';
import { burkes } from './burkes';
import { sierra, sierraLite } from './sierra';
import { jarvisJudiceNinke, stucki, atkinson, stevensonArce } from './error-diffusion';
import { bayer2x2, bayer4x4, bayer8x8, clustered4x4, dotDiffusion, voidAndCluster } from './ordered';
import { randomDithering, whiteNoise, blueNoise } from './noise-based';
import { halftoneCircles, hybridDithering, thresholdModulation } from './experimental';

// Registry of all dithering methods
export const ditheringMethods: DitheringMethod[] = [
  // Basic Bitmap
  bitmap,
  
  // Error Diffusion
  floydSteinberg,
  burkes,
  sierra,
  sierraLite,
  jarvisJudiceNinke,
  stucki,
  atkinson,
  stevensonArce,
  
  // Ordered
  bayer2x2,
  bayer4x4,
  bayer8x8,
  clustered4x4,
  dotDiffusion,
  voidAndCluster,
  
  // Noise-Based
  randomDithering,
  whiteNoise,
  blueNoise,
  
  // Experimental
  halftoneCircles,
  hybridDithering,
  thresholdModulation
];

// Categorized methods for UI organization
export const ditheringCategories: DitheringCategory[] = [
  {
    id: 'error-diffusion',
    name: 'Error Diffusion',
    methods: ditheringMethods.filter(method => method.category === 'error-diffusion')
  },
  {
    id: 'ordered',
    name: 'Ordered/Bayer',
    methods: ditheringMethods.filter(method => method.category === 'ordered')
  },
  {
    id: 'noise-based',
    name: 'Noise-Based',
    methods: ditheringMethods.filter(method => method.category === 'noise-based')
  },
  {
    id: 'experimental',
    name: 'Experimental',
    methods: ditheringMethods.filter(method => method.category === 'experimental')
  }
];

// Utility function to get method by ID
export function getDitheringMethod(id: string): DitheringMethod | undefined {
  return ditheringMethods.find(method => method.id === id);
}

// Utility function to apply dithering with preprocessing
export function applyDithering(
  imageData: ImageData,
  methodId: string,
  options: Partial<DitherOptions> = {}
): ImageData {
  const method = getDitheringMethod(methodId);
  if (!method) {
    throw new Error(`Dithering method '${methodId}' not found`);
  }
  
  // Convert to grayscale first
  const grayscaleData = convertToGrayscale(imageData);
  
  const ditherOptions: DitherOptions = {
    width: imageData.width,
    height: imageData.height,
    threshold: 128,
    serpentine: false,
    ...options
  };
  
  return method.apply(grayscaleData, ditherOptions);
}

function convertToGrayscale(imageData: ImageData): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = gray;     // Red
    data[i + 1] = gray; // Green
    data[i + 2] = gray; // Blue
    // Alpha remains unchanged
  }
  
  return new ImageData(data, imageData.width, imageData.height);
}