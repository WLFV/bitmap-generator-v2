'use client';

import React from 'react';
import { ditheringCategories, DitheringCategory } from '@/lib/dithering';

interface DitheringDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DitheringDropdown({ value, onChange, className = '' }: DitheringDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`wlfv-input w-full mono text-sm ${className}`}
    >
      {ditheringCategories.map((category: DitheringCategory) => (
        <optgroup key={category.id} label={category.name.toUpperCase()}>
          {category.methods.map((method) => (
            <option key={method.id} value={method.id} title={method.description}>
              {method.name.toUpperCase()}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}