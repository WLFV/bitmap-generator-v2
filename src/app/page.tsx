'use client';

import { motion } from 'framer-motion';
import { Uploader } from '@/components/uploader';
import { ControlsPanel } from '@/components/controls-panel';
import { BitmapCanvas } from '@/components/bitmap-canvas';
import { DownloadButton } from '@/components/download-button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function HomePage() {
  return (
    <div className="min-h-screen transition-colors duration-200">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Mobile/Tablet: Stacked Layout, Desktop: Side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Controls Column */}
            <div className="lg:col-span-1 space-y-6 sm:space-y-8 lg:space-y-12">
              
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="wlfv-heading text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8">INPUT</h3>
                <Uploader />
              </motion.div>
              
              {/* Controls Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="wlfv-heading text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8">CONTROLS</h3>
                <ControlsPanel />
              </motion.div>
              
              {/* Export Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="wlfv-heading text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8">EXPORT</h3>
                <DownloadButton />
              </motion.div>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-2 order-first lg:order-last">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="wlfv-heading text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8">OUTPUT</h3>
                <BitmapCanvas />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="border-t-2 border-black dark:border-gray-600 mt-12 sm:mt-16 lg:mt-24"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h4 className="wlfv-label mb-3 sm:mb-4">TECHNOLOGY</h4>
                <p className="wlfv-body text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  BUILT WITH NEXT.JS, REACT, AND CANVAS API. 
                  CLIENT-SIDE PROCESSING ENSURES YOUR IMAGES NEVER LEAVE YOUR DEVICE.
                </p>
              </div>
              <div>
                <h4 className="wlfv-label mb-3 sm:mb-4">FORMATS</h4>
                <p className="wlfv-body text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  SUPPORTS PNG, JPG, AND WEBP INPUT FORMATS. 
                  EXPORTS HIGH-QUALITY PNG FILES WITH PIXEL-PERFECT RENDERING.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}