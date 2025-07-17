'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useBitmapStore } from '@/store/bitmap-store';
import { processImageToBitmap } from '@/utils/bitmap-processor';

interface BitmapCanvasProps {
  className?: string;
}

export function BitmapCanvas({ className = '' }: BitmapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData, settings, setImageData, setProcessing } = useBitmapStore();

  useEffect(() => {
    if (!imageData?.originalUrl) return;

    const processImage = async () => {
      setProcessing(true);
      
      try {
        const img = new Image();
        img.onload = () => {
          try {
            const processedUrl = processImageToBitmap(img, settings);
            setImageData({ 
              ...imageData,
              processedUrl 
            });
          } catch (error) {
            console.error('Error processing image:', error);
          } finally {
            setProcessing(false);
          }
        };
        img.src = imageData.originalUrl;
      } catch (error) {
        console.error('Error loading image:', error);
        setProcessing(false);
      }
    };

    processImage();
  }, [imageData?.originalUrl, settings, setImageData, setProcessing]);

  if (!imageData?.originalUrl) {
    return (
      <div className={`border-2 border-black p-6 sm:p-8 lg:p-16 text-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-4xl sm:text-6xl lg:text-8xl mb-4 sm:mb-6 lg:mb-8">□</div>
          <p className="wlfv-label text-gray-400 text-sm sm:text-base">
            UPLOAD AN IMAGE TO SEE PREVIEW
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-2 border-black ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Original Image */}
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-black">
          <div className="border-b-2 border-black p-3 sm:p-4">
            <h4 className="wlfv-label text-sm sm:text-base">ORIGINAL</h4>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
            <img
              src={imageData.originalUrl}
              alt="Original"
              className="max-w-full max-h-[200px] sm:max-h-[250px] lg:max-h-[350px] object-contain"
            />
          </div>
        </div>

        {/* Processed Image */}
        <div>
          <div className="border-b-2 border-black p-3 sm:p-4">
            <h4 className="wlfv-label text-sm sm:text-base">BITMAP</h4>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center relative">
            {imageData.processedUrl ? (
              <img
                src={imageData.processedUrl}
                alt="Processed bitmap"
                className="max-w-full max-h-[200px] sm:max-h-[250px] lg:max-h-[350px] object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            ) : (
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-2 sm:border-3 lg:border-4 border-black border-t-transparent animate-spin mx-auto mb-3 sm:mb-4"></div>
                <p className="wlfv-label text-gray-400 text-sm sm:text-base">PROCESSING...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Canvas for processing (hidden) */}
      <canvas
        ref={canvasRef}
        className="hidden"
      />
    </div>
  );
}