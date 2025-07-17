'use client';

import { useState } from 'react';
import { useBitmapStore } from '@/store/bitmap-store';
import { generateSVGFromBitmap, downloadSVG } from '@/utils/svg-exporter';

interface DownloadButtonProps {
  className?: string;
}

export function DownloadButton({ className = '' }: DownloadButtonProps) {
  const { imageData, isProcessing, settings } = useBitmapStore();
  const [exportFormat, setExportFormat] = useState<'png' | 'svg'>('png');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDownload = async () => {
    if (!imageData?.processedUrl || !imageData?.originalUrl) return;

    if (exportFormat === 'png') {
      // Download PNG (existing functionality)
      const link = document.createElement('a');
      link.download = `bitmap-${Date.now()}.png`;
      link.href = imageData.processedUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (exportFormat === 'svg') {
      // Download SVG (new functionality)
      try {
        const img = new Image();
        img.onload = () => {
          const svgContent = generateSVGFromBitmap(img, settings);
          downloadSVG(svgContent);
        };
        img.src = imageData.originalUrl;
      } catch (error) {
        console.error('Error generating SVG:', error);
      }
    }
  };

  const isDisabled = !imageData?.processedUrl || isProcessing;

  return (
    <div className={className}>
      {/* Format Selection Dropdown */}
      <div className="relative mb-4 sm:mb-6">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full border-2 border-black bg-white text-black px-3 sm:px-4 py-2 sm:py-3 
                     font-medium text-sm sm:text-base uppercase tracking-wide
                     hover:bg-gray-50 transition-colors duration-200
                     flex items-center justify-between"
        >
          <span>FORMAT: {exportFormat.toUpperCase()}</span>
          <span className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 z-10 border-2 border-black border-t-0 bg-white">
            <button
              onClick={() => {
                setExportFormat('png');
                setIsDropdownOpen(false);
              }}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium uppercase tracking-wide
                         hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200
                         ${exportFormat === 'png' ? 'bg-gray-100' : ''}`}
            >
              PNG - RASTER IMAGE
            </button>
            <button
              onClick={() => {
                setExportFormat('svg');
                setIsDropdownOpen(false);
              }}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base font-medium uppercase tracking-wide
                         hover:bg-gray-100 transition-colors duration-200
                         ${exportFormat === 'svg' ? 'bg-gray-100' : ''}`}
            >
              SVG - VECTOR IMAGE
            </button>
          </div>
        )}
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isDisabled}
        className="w-full bg-black text-white border-2 border-black 
                   hover:bg-white hover:text-black transition-colors duration-200
                   disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500
                   disabled:cursor-not-allowed
                   px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent animate-spin"></div>
            <span>PROCESSING</span>
          </div>
        ) : imageData?.processedUrl ? (
          <span>DOWNLOAD {exportFormat.toUpperCase()}</span>
        ) : (
          <span className="text-xs sm:text-sm lg:text-base">UPLOAD IMAGE FIRST</span>
        )}
      </button>
      
      {imageData?.processedUrl && !isProcessing && (
        <div className="mt-3 sm:mt-4 text-center">
          <p className="wlfv-body text-xs sm:text-sm text-gray-600">
            {exportFormat === 'png' 
              ? 'HIGH-QUALITY PNG EXPORT READY' 
              : 'SCALABLE SVG VECTOR EXPORT READY'
            }
          </p>
          <p className="wlfv-body text-xs text-gray-500 mt-1">
            {exportFormat === 'png' 
              ? 'Perfect for web and print use' 
              : 'Infinite scalability with crisp pixels'
            }
          </p>
        </div>
      )}
    </div>
  );
}