import { Component } from '@angular/core';

@Component({
  selector: 'app-main-section',
  standalone: true,
  template: `
    <section class="min-h-screen flex items-center justify-center px-4 py-20" style="background: var(--color-secondary)">
      <div class="max-w-7xl mx-auto w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left space-y-8">
            <h1 class="text-5xl lg:text-7xl font-bold uppercase leading-tight" style="color: var(--color-primary)">
              Capturing<br />Beauty <br />Photo
            </h1>
            <p class="text-lg max-w-lg mx-auto lg:mx-0" style="color: var(--color-text)">
              A camera is an optical instrument that captures a visual image at their most basic, cameras are sealed
            </p>
            <div class="flex justify-center lg:justify-start gap-6">
              <a href="#" class="text-2xl transition-colors" style="color: var(--color-accent)"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-2xl transition-colors" style="color: var(--color-accent)"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="text-2xl transition-colors" style="color: var(--color-accent)"><i class="fab fa-facebook"></i></a>
              <a href="#" class="text-2xl transition-colors" style="color: var(--color-accent)"><i class="fab fa-dribbble"></i></a>
              <a href="#" class="text-2xl transition-colors" style="color: var(--color-accent)"><i class="fab fa-pinterest"></i></a>
            </div>
          </div>
          <div class="flex justify-center lg:justify-end">
            <div class="w-full max-w-md lg:max-w-lg">
              <img
                src="/assets/image.jpg"
                alt="Professional photographer"
                class="w-full h-auto object-cover rounded-lg"
                onerror="this.onerror=null;this.src='/assets/placeholder.svg?height=600&width=400';"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-16">
          <a
            href="#about-section"
            class="inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300"
            style="background: var(--color-primary); color: var(--color-secondary)"
          >
            <i class="fas fa-arrow-down"></i>
          </a>
        </div>
      </div>
    </section>
  `
})
export class MainSection {} 