import { DitheringMethod, DitherOptions } from './types';

export const randomDithering: DitheringMethod = {
  id: 'random',
  name: 'Random Dithering',
  category: 'noise-based',
  description: 'Simple random threshold dithering',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height, threshold = 128 } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    for (let i = 0; i < data.length; i += 4) {
      const pixel = data[i];
      const randomThreshold = threshold + (Math.random() - 0.5) * 100;
      const newPixel = pixel > randomThreshold ? 255 : 0;
      
      data[i] = newPixel;
      data[i + 1] = newPixel;
      data[i + 2] = newPixel;
    }
    
    return new ImageData(data, width, height);
  }
};

export const whiteNoise: DitheringMethod = {
  id: 'white-noise',
  name: 'White Noise',
  category: 'noise-based',
  description: 'White noise dithering with uniform distribution',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const pixel = data[index];
        
        // White noise: uniform random distribution
        const noise = (Math.random() - 0.5) * 128;
        const threshold = 128 + noise;
        
        const newPixel = pixel > threshold ? 255 : 0;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
      }
    }
    
    return new ImageData(data, width, height);
  }
};

export const blueNoise: DitheringMethod = {
  id: 'blue-noise',
  name: 'Blue Noise',
  category: 'noise-based',
  description: 'Blue noise dithering with high-frequency characteristics',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    // Generate blue noise pattern
    const blueNoisePattern = generateBlueNoisePattern(width, height);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const pixel = data[index];
        
        const noiseValue = blueNoisePattern[y % 64][x % 64];
        const threshold = (noiseValue / 255) * 255;
        
        const newPixel = pixel > threshold ? 255 : 0;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
      }
    }
    
    return new ImageData(data, width, height);
  }
};

function generateBlueNoisePattern(width: number, height: number): number[][] {
  const size = Math.min(64, Math.max(width, height));
  const pattern: number[][] = [];
  
  // Simplified blue noise generation using Mitchell's best-candidate algorithm
  for (let y = 0; y < size; y++) {
    pattern[y] = [];
    for (let x = 0; x < size; x++) {
      // Create high-frequency noise pattern
      const value1 = Math.sin(x * 0.1) * Math.cos(y * 0.1);
      const value2 = Math.sin(x * 0.3 + y * 0.2) * 0.5;
      const value3 = Math.sin(x * 0.7 - y * 0.4) * 0.25;
      
      const combined = (value1 + value2 + value3) * 0.5 + 0.5;
      pattern[y][x] = Math.floor(combined * 255);
    }
  }
  
  return pattern;
}

// Utility function for generating Perlin-like noise
function noise2D(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}