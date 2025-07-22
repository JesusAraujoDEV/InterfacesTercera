import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 shadow-sm" style="background: var(--color-secondary); color: var(--color-text); backdrop-filter: blur(4px)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <a routerLink="/" class="flex flex-col">
            <span class="text-sm font-bold tracking-wider" style="color: var(--color-primary)">LANDING</span>
            <span class="text-xs font-light tracking-wider" style="color: var(--color-accent)">PHOTOGRAPHY</span>
          </a>
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" class="font-medium hover:underline" style="color: var(--color-text)">Home</a>
            <a href="#about" class="font-medium hover:underline" style="color: var(--color-text)">About</a>
            <a href="#portfolio" class="font-medium hover:underline" style="color: var(--color-text)">Portfolio</a>
            <a href="#contact-us" class="font-medium hover:underline" style="color: var(--color-text)">Contact us</a>
            <div class="relative flex items-center" #dropdownRef>
              <button
                class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200 focus:outline-none"
                style="background: var(--color-neutral)"
                (click)="toggleDropdown()"
              >
                <img src="/assets/icons/user (1).svg" alt="User" class="w-7 h-7" onerror="this.onerror=null;this.src='/placeholder.svg';" />
              </button>
              <span class="ml-2 font-medium max-w-[120px] truncate" style="color: var(--color-primary)">{{ user?.firstName || 'Invitado' }}</span>
              <div *ngIf="dropdownOpen" class="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 border" style="background: var(--color-secondary)">
                <button class="block w-full text-left px-4 py-2 hover:bg-stone-100" style="color: var(--color-primary)" (click)="viewAdmin()">Ver usuarios</button>
                <button class="block w-full text-left px-4 py-2 hover:bg-stone-100" style="color: var(--color-primary)" (click)="viewProfile()">Ver perfil</button>
                <button class="block w-full text-left px-4 py-2 hover:bg-stone-100" style="color: var(--color-accent)" (click)="logout()">Cerrar sesión</button>
              </div>
            </div>
          </div>
          <button (click)="toggleMenu()" class="md:hidden p-2 rounded-md text-stone-700 hover:text-stone-900">
            <i class="fas" [ngClass]="isOpen ? 'fa-times' : 'fa-bars'" style="font-size: 1.25rem;"></i>
          </button>
        </div>
        <div *ngIf="isOpen" class="md:hidden py-4 space-y-4">
          <a routerLink="/" class="block font-medium hover:underline" style="color: var(--color-text)" (click)="closeMenu()">Home</a>
          <a href="#about" class="block font-medium hover:underline" style="color: var(--color-text)" (click)="closeMenu()">About</a>
          <a href="#portfolio" class="block font-medium hover:underline" style="color: var(--color-text)" (click)="closeMenu()">Portfolio</a>
          <a href="#contact-us" class="block font-medium hover:underline" style="color: var(--color-text)" (click)="closeMenu()">Contact us</a>
          <a *ngIf="user && user.role === 'admin'" routerLink="/config" class="block font-medium hover:underline" style="color: var(--color-primary)" (click)="closeMenu()">Configuración</a>
          <ng-container *ngIf="user; else loginLinkMobile">
            <div class="relative flex items-center" #dropdownRef>
              <button
                class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200 focus:outline-none"
                style="background: var(--color-neutral)"
                (click)="toggleDropdown()"
              >
                <img src="/assets/icons/user (1).svg" alt="User" class="w-7 h-7" onerror="this.onerror=null;this.src='/placeholder.svg';" />
              </button>
              <span class="ml-2 font-medium max-w-[120px] truncate" style="color: var(--color-primary)">{{ user.firstName }}</span>
              <div *ngIf="dropdownOpen" class="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 border" style="background: var(--color-secondary)">
                <button *ngIf="user.role === 'admin'"
                  class="block w-full text-left px-4 py-2 hover:bg-stone-100"
                  style="color: var(--color-primary)"
                  (click)="viewAdmin(); closeMenu()"
                >Ver usuarios</button>
                <button *ngIf="user.role !== 'admin'"
                  class="block w-full text-left px-4 py-2 hover:bg-stone-100"
                  style="color: var(--color-primary)"
                  (click)="viewProfile(); closeMenu()"
                >Ver perfil</button>
                <button
                  class="block w-full text-left px-4 py-2 hover:bg-stone-100"
                  style="color: var(--color-accent)"
                  (click)="logout(); closeMenu()"
                >Cerrar sesión</button>
              </div>
            </div>
          </ng-container>
          <ng-template #loginLinkMobile>
            <a routerLink="/login" class="block px-4 py-2 rounded transition-colors w-fit" style="background: var(--color-primary); color: var(--color-secondary)" (click)="closeMenu()">Login</a>
          </ng-template>
        </div>
      </div>
    </nav>
  `
})
export class Navbar implements OnInit, OnDestroy {
  isOpen = false;
  user: any = null;
  dropdownOpen = false;
  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit() {
    this.setUserFromStorage();
    window.addEventListener('storage', this.handleStorage);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.handleStorage);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setUserFromStorage() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  handleStorage = () => {
    this.setUserFromStorage();
  };

  handleClickOutside = (event: MouseEvent) => {
    if (this.dropdownOpen && this.dropdownRef && !this.dropdownRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  };

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.dropdownOpen = false;
    this.router.navigate(['/login']);
  }

  viewProfile() {
    this.dropdownOpen = false;
    this.router.navigate(['/dashboard']);
  }

  viewAdmin() {
    this.dropdownOpen = false;
    this.router.navigate(['/dashboard'], { queryParams: { view: 'admin' } });
  }
} 