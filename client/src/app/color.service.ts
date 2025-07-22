import { Injectable } from '@angular/core';

export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  neutral: string;
}

const defaultPalette: Palette = {
  primary: '#57534E',
  secondary: '#FFFFFF',
  accent: '#44403C',
  text: '#78716C',
  neutral: '#E7E5E4',
};

@Injectable({ providedIn: 'root' })
export class ColorService {
  palette: Palette = this.getStoredPalette();

  private getStoredPalette(): Palette {
    const stored = localStorage.getItem('activePalette');
    return stored ? JSON.parse(stored) : defaultPalette;
  }

  setPalette(pal: Palette) {
    this.palette = pal;
    this.applyPalette(pal);
    localStorage.setItem('activePalette', JSON.stringify(pal));
  }

  applyPalette(pal: Palette) {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', pal.primary);
    root.style.setProperty('--color-secondary', pal.secondary);
    root.style.setProperty('--color-accent', pal.accent);
    root.style.setProperty('--color-text', pal.text);
    root.style.setProperty('--color-neutral', pal.neutral);
  }

  fetchPaletteFromBackend() {
    const token = localStorage.getItem('token');
    fetch(`${(window as any).environment?.BACKEND_URL || ''}/api/palette`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    })
      .then(res => res.json())
      .then(data => {
        this.setPalette(data);
      })
      .catch(() => {});
  }
} 