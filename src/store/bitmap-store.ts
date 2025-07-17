import { create } from 'zustand';
import { BitmapSettings, ImageData } from '@/types/bitmap';

interface BitmapStore {
  imageData: ImageData | null;
  settings: BitmapSettings;
  isProcessing: boolean;
  setImageData: (data: ImageData | null) => void;
  updateSettings: (settings: Partial<BitmapSettings>) => void;
  setProcessing: (processing: boolean) => void;
  resetImage: () => void;
}

export const useBitmapStore = create<BitmapStore>((set) => ({
  imageData: null,
  settings: {
    size: 8,
    threshold: 128,
    ditheringMethod: 'bitmap', // Default to Bitmap
  },
  isProcessing: false,
  setImageData: (data) => set({ imageData: data }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  setProcessing: (processing) => set({ isProcessing: processing }),
  resetImage: () => set({ imageData: null }),
}));