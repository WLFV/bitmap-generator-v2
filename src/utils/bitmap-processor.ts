import { BitmapSettings } from '@/types/bitmap';
import { applyDithering } from '@/lib/dithering';

export function processImageToBitmap(
  imageElement: HTMLImageElement,
  settings: BitmapSettings
): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Calculate dimensions based on pixelation size
  const pixelSize = settings.size;
  const width = Math.floor(imageElement.width / pixelSize);
  const height = Math.floor(imageElement.height / pixelSize);
  
  canvas.width = width;
  canvas.height = height;
  
  // Draw scaled down image
  ctx.drawImage(imageElement, 0, 0, width, height);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height);
  
  // Apply dithering using the modular system
  const processedImageData = applyDithering(imageData, settings.ditheringMethod, {
    threshold: settings.threshold,
    width,
    height
  });
  
  // Put processed data back
  ctx.putImageData(processedImageData, 0, 0);
  
  // Scale up to create pixelated effect
  const outputCanvas = document.createElement('canvas');
  const outputCtx = outputCanvas.getContext('2d');
  
  if (!outputCtx) {
    throw new Error('Could not get output canvas context');
  }
  
  outputCanvas.width = width * pixelSize;
  outputCanvas.height = height * pixelSize;
  
  // Disable image smoothing for crisp pixels
  outputCtx.imageSmoothingEnabled = false;
  outputCtx.drawImage(canvas, 0, 0, width * pixelSize, height * pixelSize);
  
  return outputCanvas.toDataURL('image/png');
}