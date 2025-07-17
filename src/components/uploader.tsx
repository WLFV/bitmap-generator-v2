'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useBitmapStore } from '@/store/bitmap-store';

interface UploaderProps {
  className?: string;
}

export function Uploader({ className = '' }: UploaderProps) {
  const { setImageData, resetImage, imageData } = useBitmapStore();

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.match(/^image\/(png|jpe?g|webp)$/)) {
      alert('Please upload a PNG, JPG, or WEBP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const originalUrl = e.target?.result as string;
      setImageData({
        file,
        originalUrl,
      });
    };
    reader.readAsDataURL(file);
  }, [setImageData]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  return (
    <div className={className}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-black hover:border-gray-600 
                   transition-colors duration-200 p-3 sm:p-4 lg:p-6 text-center cursor-pointer
                   hover:bg-gray-50"
      >
        <div className="space-y-2 sm:space-y-3">
          <div className="text-2xl sm:text-3xl lg:text-4xl">⬆</div>
          <div>
            <h3 className="wlfv-heading text-base sm:text-lg mb-1 sm:mb-2">
              DRAG & DROP
            </h3>
            <p className="wlfv-body text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm">
              OR CLICK TO SELECT AN IMAGE FILE
            </p>
            <p className="wlfv-label text-xs text-gray-400">
              PNG • JPG • WEBP
            </p>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <label className="wlfv-button-outline inline-block cursor-pointer text-xs sm:text-sm">
              SELECT FILE
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
            
            {imageData?.file && (
              <div className="pt-2 sm:pt-3 border-t border-gray-200">
                <p className="mono text-xs font-medium mb-1">
                  {imageData.file.name}
                </p>
                <button
                  onClick={resetImage}
                  className="wlfv-hover-underline text-xs text-gray-600"
                >
                  CLEAR IMAGE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}