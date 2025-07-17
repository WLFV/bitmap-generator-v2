import { DitheringMethod, DitherOptions } from './types';

export const jarvisJudiceNinke: DitheringMethod = {
  id: 'jarvis-judice-ninke',
  name: 'Jarvis-Judice-Ninke',
  category: 'error-diffusion',
  description: 'Complex 12-point error diffusion pattern',
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
        
        // Jarvis-Judice-Ninke dithering pattern
        distributeError(data, width, height, x + 1, y, error * 7 / 48);
        distributeError(data, width, height, x + 2, y, error * 5 / 48);
        distributeError(data, width, height, x - 2, y + 1, error * 3 / 48);
        distributeError(data, width, height, x - 1, y + 1, error * 5 / 48);
        distributeError(data, width, height, x, y + 1, error * 7 / 48);
        distributeError(data, width, height, x + 1, y + 1, error * 5 / 48);
        distributeError(data, width, height, x + 2, y + 1, error * 3 / 48);
        distributeError(data, width, height, x - 2, y + 2, error * 1 / 48);
        distributeError(data, width, height, x - 1, y + 2, error * 3 / 48);
        distributeError(data, width, height, x, y + 2, error * 5 / 48);
        distributeError(data, width, height, x + 1, y + 2, error * 3 / 48);
        distributeError(data, width, height, x + 2, y + 2, error * 1 / 48);
      }
    }
    
    return new ImageData(data, width, height);
  }
};

export const stucki: DitheringMethod = {
  id: 'stucki',
  name: 'Stucki',
  category: 'error-diffusion',
  description: 'Stucki error diffusion with 12-point distribution',
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
        
        // Stucki dithering pattern
        distributeError(data, width, height, x + 1, y, error * 8 / 42);
        distributeError(data, width, height, x + 2, y, error * 4 / 42);
        distributeError(data, width, height, x - 2, y + 1, error * 2 / 42);
        distributeError(data, width, height, x - 1, y + 1, error * 4 / 42);
        distributeError(data, width, height, x, y + 1, error * 8 / 42);
        distributeError(data, width, height, x + 1, y + 1, error * 4 / 42);
        distributeError(data, width, height, x + 2, y + 1, error * 2 / 42);
        distributeError(data, width, height, x - 2, y + 2, error * 1 / 42);
        distributeError(data, width, height, x - 1, y + 2, error * 2 / 42);
        distributeError(data, width, height, x, y + 2, error * 4 / 42);
        distributeError(data, width, height, x + 1, y + 2, error * 2 / 42);
        distributeError(data, width, height, x + 2, y + 2, error * 1 / 42);
      }
    }
    
    return new ImageData(data, width, height);
  }
};

export const atkinson: DitheringMethod = {
  id: 'atkinson',
  name: 'Atkinson',
  category: 'error-diffusion',
  description: 'Apple\'s dithering algorithm with 6-point distribution',
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
        
        // Atkinson dithering pattern
        distributeError(data, width, height, x + 1, y, error / 8);
        distributeError(data, width, height, x + 2, y, error / 8);
        distributeError(data, width, height, x - 1, y + 1, error / 8);
        distributeError(data, width, height, x, y + 1, error / 8);
        distributeError(data, width, height, x + 1, y + 1, error / 8);
        distributeError(data, width, height, x, y + 2, error / 8);
      }
    }
    
    return new ImageData(data, width, height);
  }
};

export const stevensonArce: DitheringMethod = {
  id: 'stevenson-arce',
  name: 'Stevenson-Arce',
  category: 'error-diffusion',
  description: 'Advanced error diffusion with 12-point asymmetric pattern',
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
        
        // Stevenson-Arce dithering pattern
        distributeError(data, width, height, x + 1, y, error * 32 / 200);
        distributeError(data, width, height, x + 2, y, error * 12 / 200);
        distributeError(data, width, height, x - 3, y + 1, error * 5 / 200);
        distributeError(data, width, height, x - 1, y + 1, error * 12 / 200);
        distributeError(data, width, height, x, y + 1, error * 26 / 200);
        distributeError(data, width, height, x + 1, y + 1, error * 30 / 200);
        distributeError(data, width, height, x + 3, y + 1, error * 16 / 200);
        distributeError(data, width, height, x - 2, y + 2, error * 12 / 200);
        distributeError(data, width, height, x, y + 2, error * 26 / 200);
        distributeError(data, width, height, x + 1, y + 2, error * 12 / 200);
        distributeError(data, width, height, x + 2, y + 2, error * 5 / 200);
        distributeError(data, width, height, x - 1, y + 3, error * 12 / 200);
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