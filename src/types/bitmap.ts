export interface BitmapSettings {
  size: number;
  threshold: number;
  ditheringMethod: string; // Now uses dynamic method IDs from the registry
}

export interface ImageData {
  file: File;
  originalUrl: string;
  processedUrl?: string;
}