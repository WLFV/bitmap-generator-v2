import { DitheringMethod, DitherOptions } from './types';

export const burkes: DitheringMethod = {
  id: 'burkes',
  name: 'Burkes',
  category: 'error-diffusion',
  description: 'Error diffusion with 8-point distribution pattern',
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
        
        // Burkes dithering pattern
        distributeError(data, width, height, x + 1, y, error * 8 / 32);
        distributeError(data, width, height, x + 2, y, error * 4 / 32);
        distributeError(data, width, height, x - 2, y + 1, error * 2 / 32);
        distributeError(data, width, height, x - 1, y + 1, error * 4 / 32);
        distributeError(data, width, height, x, y + 1, error * 8 / 32);
        distributeError(data, width, height, x + 1, y + 1, error * 4 / 32);
        distributeError(data, width, height, x + 2, y + 1, error * 2 / 32);
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