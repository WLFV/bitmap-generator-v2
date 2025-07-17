'use client';

import { useBitmapStore } from '@/store/bitmap-store';
import { DitheringDropdown } from './dithering-dropdown';

export function ControlsPanel() {
  const { settings, updateSettings } = useBitmapStore();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Size Control */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
        <div>
          <label className="wlfv-label block mb-2 text-sm sm:text-base">
            PIXEL SIZE
          </label>
          <p className="mono text-xl sm:text-2xl font-bold">
            {settings.size}PX
          </p>
        </div>
        <div>
          <input
            type="range"
            min="1"
            max="20"
            value={settings.size}
            onChange={(e) => updateSettings({ size: parseInt(e.target.value) })}
            className="wlfv-slider w-full"
          />
        </div>
      </div>

      {/* Threshold Control */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
        <div>
          <label className="wlfv-label block mb-2 text-sm sm:text-base">
            THRESHOLD
          </label>
          <p className="mono text-xl sm:text-2xl font-bold">
            {settings.threshold}
          </p>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="255"
            value={settings.threshold}
            onChange={(e) => updateSettings({ threshold: parseInt(e.target.value) })}
            className="wlfv-slider w-full"
          />
        </div>
      </div>

      {/* Dithering Method */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
        <div>
          <label className="wlfv-label block mb-2 text-sm sm:text-base">
            DITHERING
          </label>
          <p className="mono text-xs sm:text-sm font-medium text-gray-600 uppercase">
            {settings.ditheringMethod.replace(/-/g, ' ')}
          </p>
        </div>
        <div>
          <DitheringDropdown
            value={settings.ditheringMethod}
            onChange={(method) => updateSettings({ ditheringMethod: method })}
          />
        </div>
      </div>
    </div>
  );
}