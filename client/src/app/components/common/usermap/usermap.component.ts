import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-usermap',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass],
  templateUrl: './usermap.component.html',
  styleUrls: ['./usermap.component.css']
})
export class UserMapComponent implements OnInit, OnDestroy {
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Input() userName: string = '';
  @Input() enableMarkerMove: boolean = false;
  @Output() markerMove = new EventEmitter<{ lat: number; lng: number }>();

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  map: any = null;
  marker: any = null;
  mapError: string | null = null;
  isLoading = true;
  defaultLat = 19.4326;
  defaultLng = -99.1332;
  leafletLoaded = false;

  get validLat() {
    return this.latitude && !isNaN(this.latitude) && this.latitude !== 0 ? this.latitude : this.defaultLat;
  }
  get validLng() {
    return this.longitude && !isNaN(this.longitude) && this.longitude !== 0 ? this.longitude : this.defaultLng;
  }
  get isUsingDefault() {
    return this.latitude === 0 || this.longitude === 0 || !this.latitude || !this.longitude;
  }

  ngOnInit() {
    this.loadLeaflet();
  }

  ngOnDestroy() {
    if (this.map) {
      try {
        this.map.remove();
      } catch (e) {
        // ignore
      }
      this.map = null;
    }
  }

  async loadLeaflet() {
    this.isLoading = true;
    this.mapError = null;
    try {
      if (!(window as any).L) {
        await this.loadLeafletAssets();
      }
      setTimeout(() => this.initializeMap(), 100);
    } catch (e) {
      this.mapError = 'Error al cargar Leaflet';
      this.isLoading = false;
    }
  }

  loadLeafletAssets(): Promise<void> {
    return new Promise((resolve, reject) => {
      // CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      // JS
      if (!(window as any).L && !document.querySelector('script[src*="leaflet.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  initializeMap() {
    try {
      if (!this.mapContainer || !(window as any).L) return;
      if (this.map) {
        try { this.map.remove(); } catch {}
        this.map = null;
      }
      this.mapContainer.nativeElement.innerHTML = '';
      const L = (window as any).L;
      this.map = L.map(this.mapContainer.nativeElement, {
        center: [this.validLat, this.validLng],
        zoom: this.isUsingDefault ? 10 : 13,
        zoomControl: true,
        scrollWheelZoom: true,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(this.map);
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${this.isUsingDefault ? '#f59e0b' : '#ef4444'}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style=\"width: 8px; height: 8px; background-color: white; border-radius: 50%;\"></div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      this.marker = L.marker([this.validLat, this.validLng], { icon: customIcon, draggable: !!this.enableMarkerMove }).addTo(this.map);
      const popupContent = this.isUsingDefault
        ? `<div style="text-align: center; padding: 8px;"><strong style=\"color: #1f2937; font-size: 14px;\">${this.userName}</strong><br><span style=\"color: #f59e0b; font-size: 12px;\">📍 Ubicación por defecto</span><br><span style=\"color: #9ca3af; font-size: 11px;\">Ciudad de México<br>${this.validLat.toFixed(4)}, ${this.validLng.toFixed(4)}</span></div>`
        : `<div style="text-align: center; padding: 8px;"><strong style=\"color: #1f2937; font-size: 14px;\">${this.userName}</strong><br><span style=\"color: #6b7280; font-size: 12px;\">📍 Ubicación del usuario</span><br><span style=\"color: #9ca3af; font-size: 11px;\">${this.validLat.toFixed(4)}, ${this.validLng.toFixed(4)}</span></div>`;
      this.marker.bindPopup(popupContent).openPopup();
      if (this.enableMarkerMove) {
        this.marker.on('dragend', (e: any) => {
          const { lat, lng } = e.target.getLatLng();
          this.markerMove.emit({ lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) });
        });
      }
      setTimeout(() => {
        if (this.map) this.map.invalidateSize();
      }, 200);
      this.isLoading = false;
    } catch (e) {
      this.mapError = 'Error al crear el mapa';
      this.isLoading = false;
    }
  }
}
