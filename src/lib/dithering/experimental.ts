import { DitheringMethod, DitherOptions } from './types';

export const halftoneCircles: DitheringMethod = {
  id: 'halftone-circles',
  name: 'Halftone Circles',
  category: 'experimental',
  description: 'Geometric halftone pattern with circular dots',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height } = options;
    const data = new Uint8ClampedArray(imageData.data);
    const cellSize = 8;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const pixel = data[index];
        
        // Calculate position within halftone cell
        const cellX = x % cellSize;
        const cellY = y % cellSize;
        const centerX = cellSize / 2;
        const centerY = cellSize / 2;
        
        // Distance from center of cell
        const distance = Math.sqrt(
          Math.pow(cellX - centerX, 2) + Math.pow(cellY - centerY, 2)
        );
        
        // Radius based on pixel intensity
        const maxRadius = cellSize / 2;
        const radius = (pixel / 255) * maxRadius;
        
        const newPixel = distance <= radius ? 0 : 255;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
      }
    }
    
    return new ImageData(data, width, height);
  }
};

export const hybridDithering: DitheringMethod = {
  id: 'hybrid',
  name: 'Hybrid (Floyd-Steinberg + Bayer)',
  category: 'experimental',
  description: 'Combination of error diffusion and ordered dithering',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    // Bayer 4x4 matrix
    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5]
    ];
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const oldPixel = data[index];
        
        // Apply Bayer threshold modulation
        const bayerValue = bayerMatrix[y % 4][x % 4];
        const bayerThreshold = (bayerValue / 16) * 64 - 32; // -32 to +32 range
        
        const modulatedPixel = Math.min(255, Math.max(0, oldPixel + bayerThreshold));
        const newPixel = modulatedPixel > 128 ? 255 : 0;
        const error = oldPixel - newPixel;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
        
        // Apply Floyd-Steinberg error diffusion
        distributeError(data, width, height, x + 1, y, error * 7 / 16);
        distributeError(data, width, height, x - 1, y + 1, error * 3 / 16);
        distributeError(data, width, height, x, y + 1, error * 5 / 16);
        distributeError(data, width, height, x + 1, y + 1, error * 1 / 16);
      }
    }
    
    return new ImageData(data, width, height);
  }
};

export const thresholdModulation: DitheringMethod = {
  id: 'threshold-modulation',
  name: 'Threshold Modulation',
  category: 'experimental',
  description: 'Dynamic threshold adjustment based on local contrast',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height, threshold = 128 } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    // Calculate local contrast for each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const pixel = data[index];
        
        // Calculate local average in 3x3 neighborhood
        let sum = 0;
        let count = 0;
        
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const neighborIndex = (ny * width + nx) * 4;
              sum += data[neighborIndex];
              count++;
            }
          }
        }
        
        const localAverage = sum / count;
        const contrast = Math.abs(pixel - localAverage);
        
        // Modulate threshold based on local contrast
        const modulatedThreshold = threshold + (contrast - 32) * 0.5;
        const newPixel = pixel > modulatedThreshold ? 255 : 0;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
      }
    }
    
    return new ImageData(data, width, height);
  }
};

function distributeError(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
  error: number
): void {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    const index = (y * width + x) * 4;
    const newValue = Math.min(255, Math.max(0, data[index] + error));
    data[index] = newValue;
    data[index + 1] = newValue;
    data[index + 2] = newValue;
  }
}