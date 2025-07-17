import { DitheringMethod, DitherOptions } from './types';

export const sierra: DitheringMethod = {
  id: 'sierra',
  name: 'Sierra',
  category: 'error-diffusion',
  description: 'Sierra error diffusion with 10-point distribution',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const oldPixel = data[index];
        const newPixel = oldPixel > 128 ? 255 : 0;
        const error = oldPixel - newPixel;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
        
        // Sierra dithering pattern
        distributeError(data, width, height, x + 1, y, error * 5 / 32);
        distributeError(data, width, height, x + 2, y, error * 3 / 32);
        distributeError(data, width, height, x - 2, y + 1, error * 2 / 32);
        distributeError(data, width, height, x - 1, y + 1, error * 4 / 32);
        distributeError(data, width, height, x, y + 1, error * 5 / 32);
        distributeError(data, width, height, x + 1, y + 1, error * 4 / 32);
        distributeError(data, width, height, x + 2, y + 1, error * 2 / 32);
        distributeError(data, width, height, x - 1, y + 2, error * 2 / 32);
        distributeError(data, width, height, x, y + 2, error * 3 / 32);
        distributeError(data, width, height, x + 1, y + 2, error * 2 / 32);
      }
    }
    
    return new ImageData(data, width, height);
  }
};

export const sierraLite: DitheringMethod = {
  id: 'sierra-lite',
  name: 'Sierra Lite',
  category: 'error-diffusion',
  description: 'Simplified Sierra with 4-point distribution',
  apply: (imageData: ImageData, options: DitherOptions): ImageData => {
    const { width, height } = options;
    const data = new Uint8ClampedArray(imageData.data);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const oldPixel = data[index];
        const newPixel = oldPixel > 128 ? 255 : 0;
        const error = oldPixel - newPixel;
        
        data[index] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;
        
        // Sierra Lite dithering pattern
        distributeError(data, width, height, x + 1, y, error * 2 / 4);
        distributeError(data, width, height, x - 1, y + 1, error * 1 / 4);
        distributeError(data, width, height, x, y + 1, error * 1 / 4);
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