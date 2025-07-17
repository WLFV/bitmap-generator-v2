export interface DitherOptions {
  threshold?: number;
  width: number;
  height: number;
  serpentine?: boolean;
}

export interface DitheringMethod {
  id: string;
  name: string;
  category: 'error-diffusion' | 'ordered' | 'noise-based' | 'experimental';
  description: string;
  apply(imageData: ImageData, options: DitherOptions): ImageData;
}

export type DitheringCategory = {
  id: string;
  name: string;
  methods: DitheringMethod[];
};