import { DitheringMethod, DitherOptions } from './types';

/**
 * Simple bitmap dithering - converts to pure black and white using threshold
 * This is the most basic form of bitmap conversion without any dithering patterns
 */
function applyBitmapDithering(imageData: ImageData, options: DitherOptions): ImageData {
  const { width, height, threshold = 128 } = options;
  const data = new Uint8ClampedArray(imageData.data);
  
  for (let i = 0; i < data.length; i += 4) {
    // Get grayscale value (assuming input is already grayscale)
    const gray = data[i];
    
    // Apply threshold - pure black or white
    const value = gray >= threshold ? 255 : 0;
    
    data[i] = value;     // Red
    data[i + 1] = value; // Green
    data[i + 2] = value; // Blue
    // Alpha remains unchanged
  }
  
  return new ImageData(data, width, height);
}

export const bitmap: DitheringMethod = {
  id: 'bitmap',
  name: 'Bitmap',
  category: 'ordered',
  description: 'Simple threshold-based bitmap conversion to pure black and white',
  apply: applyBitmapDithering
};