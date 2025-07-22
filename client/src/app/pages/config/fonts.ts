import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fonts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, NgFor, NgClass],
  templateUrl: './fonts.html',
  styleUrl: './fonts.css'
})
export class Fonts {
  // Tamaños
  headlineSize = 48;
  subtitleSize = 24;
  paragraphSize = 16;

  // Fuentes activas
  titleFont = 'Georgia, serif';
  bodyFont = 'Arial, sans-serif';

  // Historial de fuentes
  fontHistory: any[] = [];

  // Mensajes de subida
  primaryUploadMessage = '';
  primaryUploadSuccess = false;
  secondaryUploadMessage = '';
  secondaryUploadSuccess = false;

  // Modales
  showDeleteModal = false;
  fontToDelete: any = null;
  showUploadModal = false;
  pendingFont: any = null;

  // Fuentes del sistema
  systemFonts = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Helvetica', value: 'Helvetica, sans-serif' },
    { name: 'Tahoma', value: 'Tahoma, sans-serif' },
    { name: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Times New Roman', value: 'Times New Roman, serif' },
    { name: 'Palatino', value: 'Palatino Linotype, Book Antiqua, Palatino, serif' },
    { name: 'Courier New', value: 'Courier New, monospace' },
    { name: 'Lucida Console', value: 'Lucida Console, monospace' },
  ];

  // Métodos auxiliares
  isActiveFontForType(font: any) {
    if (font.type === 'title') {
      return this.titleFont === font.fontFamily;
    } else {
      return this.bodyFont === font.fontFamily;
    }
  }

  getTitleFontName() {
    const customFont = this.fontHistory.find(f => f.fontFamily === this.titleFont && f.type === 'title');
    if (customFont) return customFont.name;
    const systemFont = this.systemFonts.find(f => f.value === this.titleFont);
    return systemFont ? systemFont.name : 'Fuente desconocida';
  }

  getBodyFontName() {
    const customFont = this.fontHistory.find(f => f.fontFamily === this.bodyFont && f.type === 'body');
    if (customFont) return customFont.name;
    const systemFont = this.systemFonts.find(f => f.value === this.bodyFont);
    return systemFont ? systemFont.name : 'Fuente desconocida';
  }

  selectFont(font: any) {
    if (font.type === 'title') {
      this.titleFont = font.fontFamily;
    } else {
      this.bodyFont = font.fontFamily;
    }
  }

  validateTTFFile(file: File) {
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.ttf')) {
      return { valid: false, message: 'Error: Solo se permiten archivos .ttf' };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, message: 'Error: El archivo es demasiado grande (máx. 5MB)' };
    }
    return { valid: true, message: `Archivo ${file.name} cargado correctamente` };
  }

  createFont(fontUrl: string, fileName: string, type: string, setActive = true) {
    try {
      const fontId = `font-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const fontName = fileName;
      const cleanFontName = fontName.replace(/[^a-zA-Z0-9]/g, '');
      const fontFamily = `CustomFont-${cleanFontName}-${fontId}`;
      const style = document.createElement('style');
      style.setAttribute('data-font-id', fontId);
      style.type = 'text/css';
      const cssText = `@font-face { font-family: "${fontFamily}"; src: url("${fontUrl}") format("truetype"); font-display: swap; }`;
      if ((style as any).styleSheet) {
        (style as any).styleSheet.cssText = cssText;
      } else {
        style.appendChild(document.createTextNode(cssText));
      }
      document.head.appendChild(style);
      const fontEntry = {
        id: fontId,
        name: fontName,
        description: `Fuente personalizada para ${type === 'title' ? 'títulos' : 'cuerpo de texto'}`,
        type,
        fontFamily,
        uploadDate: new Date(),
      };
      this.fontHistory = [fontEntry, ...this.fontHistory];
      if (setActive) {
        setTimeout(() => {
          if (type === 'title') {
            this.titleFont = fontFamily;
          } else {
            this.bodyFont = fontFamily;
          }
        }, 100);
      }
    } catch (error) {
      if (type === 'title') {
        this.secondaryUploadMessage = 'Error al procesar la fuente';
        this.secondaryUploadSuccess = false;
      } else {
        this.primaryUploadMessage = 'Error al procesar la fuente';
        this.primaryUploadSuccess = false;
      }
    }
  }

  deleteFont(fontId: string) {
    const fontIndex = this.fontHistory.findIndex(f => f.id === fontId);
    if (fontIndex === -1) return;
    const font = this.fontHistory[fontIndex];
    if (font.type === 'title' && this.titleFont === font.fontFamily) {
      this.titleFont = 'Georgia, serif';
    } else if (font.type === 'body' && this.bodyFont === font.fontFamily) {
      this.bodyFont = 'Arial, sans-serif';
    }
    const styleElement = document.querySelector(`style[data-font-id="${fontId}"]`);
    if (styleElement && styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
    this.fontHistory = this.fontHistory.filter(f => f.id !== fontId);
  }

  get customBodyFonts() {
    return this.fontHistory.filter(f => f.type === 'body');
  }
  get customTitleFonts() {
    return this.fontHistory.filter(f => f.type === 'title');
  }
  onPrimaryFontUpload(event: any) {}
  onSecondaryFontUpload(event: any) {}
  // Métodos para subir fuentes, aplicar fuentes pendientes, cancelar subida, eliminar fuentes, etc. se implementan en el template con (change) y (click).
} 