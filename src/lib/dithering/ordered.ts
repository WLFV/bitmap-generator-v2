import { DitheringMethod, DitherOptions } from './types';

export const bayer2x2: DitheringMethod = {
  id: 'bayer-2x2',
  name: 'Bayer 2×2',
  category: 'ordered',
  description: 'Simple 2×2 Bayer matrix dithering',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const matrix = [
      [0, 2],
      [3, 1]
    ];
    return applyBayerMatrix(imageData, options, matrix, 2);
  }
};

export const bayer4x4: DitheringMethod = {
  id: 'bayer-4x4',
  name: 'Bayer 4×4',
  category: 'ordered',
  description: 'Standard 4×4 Bayer matrix dithering',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const matrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5]
    ];
    return applyBayerMatrix(imageData, options, matrix, 4);
  }
};

export const bayer8x8: DitheringMethod = {
  id: 'bayer-8x8',
  name: 'Bayer 8×8',
  category: 'ordered',
  description: 'High-resolution 8×8 Bayer matrix dithering',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const matrix = [
      [0, 32, 8, 40, 2, 34, 10, 42],
      [48, 16, 56, 24, 50, 18, 58, 26],
      [12, 44, 4, 36, 14, 46, 6, 38],
      [60, 28, 52, 20, 62, 30, 54, 22],
      [3, 35, 11, 43, 1, 33, 9, 41],
      [51, 19, 59, 27, 49, 17, 57, 25],
      [15, 47, 7, 39, 13, 45, 5, 37],
      [63, 31, 55, 23, 61, 29, 53, 21]
    ];
    return applyBayerMatrix(imageData, options, matrix, 8);
  }
};

export const clustered4x4: DitheringMethod = {
  id: 'clustered-4x4',
  name: 'Clustered 4×4',
  category: 'ordered',
  description: 'Clustered dot dithering for halftone effects',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const matrix = [
      [12, 5, 6, 13],
      [4, 0, 1, 7],
      [11, 3, 2, 8],
      [15, 10, 9, 14]
    ];
    return applyBayerMatrix(imageData, options, matrix, 4);
  }
};

export const dotDiffusion: DitheringMethod = {
  id: 'dot-diffusion',
  name: 'Dot Diffusion',
  category: 'ordered',
  description: 'Dot diffusion pattern for smooth gradients',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    // Dot diffusion uses a spiral pattern
    const dotMatrix = generateDotMatrix(8);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const pixel = data[index];
        
        const matrixValue = dotMatrix[y % 8][x % 8];
        const threshold = (matrixValue / 64) * 255;
        
        const newPixel = pixel > threshold ? 255 : 0;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
      }
    }
    
    return new ImageData(data, width, height);
  }
};

export const voidAndCluster: DitheringMethod = {
  id: 'void-and-cluster',
  name: 'Void-and-Cluster',
  category: 'ordered',
  description: 'Advanced void-and-cluster dithering',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    // Simplified void-and-cluster implementation
    const voidMatrix = generateVoidClusterMatrix(16);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const pixel = data[index];
        
        const matrixValue = voidMatrix[y % 16][x % 16];
        const threshold = (matrixValue / 256) * 255;
        
        const newPixel = pixel > threshold ? 255 : 0;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
      }
    }
    
    return new ImageData(data, width, height);
  }
};

function applyBayerMatrix(
  imageData: ImageData,
  options: DitherOptions,
  matrix: number[][],
  size: number
): ImageData {
  const { width, height } = options;
  const data = new Uint8ClampedArray(imageData.data);
  const threshold = Math.pow(size, 2);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const pixel = data[index];
      
      const matrixValue = matrix[y % size][x % size];
      const adjustedThreshold = (matrixValue / threshold) * 255;
      
      const newPixel = pixel > adjustedThreshold ? 255 : 0;
      
      data[index] = newPixel;
      data[index + 1] = newPixel;
      data[index + 2] = newPixel;
    }
  }
  
  return new ImageData(data, width, height);
}

function generateDotMatrix(size: number): number[][] {
  const matrix: number[][] = [];
  const center = size / 2;
  
  for (let y = 0; y < size; y++) {
    matrix[y] = [];
    for (let x = 0; x < size; x++) {
      const dx = x - center + 0.5;
      const dy = y - center + 0.5;
      const distance = Math.sqrt(dx * dx + dy * dy);
      matrix[y][x] = Math.floor(distance * 8) % 64;
    }
  }
  
  return matrix;
}

function generateVoidClusterMatrix(size: number): number[][] {
  const matrix: number[][] = [];
  
  for (let y = 0; y < size; y++) {
    matrix[y] = [];
    for (let x = 0; x < size; x++) {
      // Simplified void-cluster pattern
      const value = ((x * 17 + y * 23) % 256);
      matrix[y][x] = value;
    }
  }
  
  return matrix;
}