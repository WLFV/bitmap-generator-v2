import { BitmapSettings } from '@/types/bitmap';
import { applyDithering } from '@/lib/dithering';

export function generateSVGFromBitmap(
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

  // Generate SVG from processed pixel data
  const svgWidth = width * pixelSize;
  const svgHeight = height * pixelSize;
  
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;">`;
  
  // Process each pixel
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = processedImageData.data[index];
      const g = processedImageData.data[index + 1];
      const b = processedImageData.data[index + 2];
      const a = processedImageData.data[index + 3];
      
      // Only add rectangles for non-transparent pixels
      if (a > 0) {
        const color = `rgb(${r},${g},${b})`;
        const rectX = x * pixelSize;
        const rectY = y * pixelSize;
        
        svgContent += `<rect x="${rectX}" y="${rectY}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`;
      }
    }
  }
  
  svgContent += '</svg>';
  
  return svgContent;
}

export function downloadSVG(svgContent: string, filename: string = `bitmap-${Date.now()}.svg`): void {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the object URL
  URL.revokeObjectURL(url);
}