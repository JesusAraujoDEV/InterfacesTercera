import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio-section',
  standalone: true,
  template: `
    <section id="portfolio-section" class="px-4 lg:px-8 py-16 relative" style="background: var(--color-secondary)">
      <div class="flex gap-8 flex-col md:flex-row">
        <h1 class="uppercase text-5xl mb-4 font-semibold" style="color: var(--color-primary)">OUR PORTFOLIO</h1>
        <p class="capitalize xl:w-1/2 mb-8" style="color: var(--color-text)">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolores distinctio reiciendis
          obcaecati ea.
        </p>
      </div>
      <div class="grid-cols-2 md:grid-cols-5 grid mb-8 gap-4">
        <div class="grid grid-cols-1 md:hidden gap-4">
          <img src="/assets/portfolio/portfolio1.jpg" alt="1" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio2.jpg" alt="2" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio3.jpg" alt="3" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio4.jpg" alt="4" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio5.jpg" alt="5" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
        </div>
        <div class="grid grid-cols-1 md:hidden gap-4">
          <img src="/assets/portfolio/portfolio6.jpg" alt="6" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio7.jpg" alt="7" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio8.jpg" alt="8" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio9.jpg" alt="9" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio10.jpg" alt="10" class="rounded-xl" onerror="this.onerror=null;this.src='/assets/placeholder.svg';" />
        </div>
        <div class="hidden md:flex flex-col gap-4">
          <img src="/assets/portfolio/portfolio1.jpg" alt="1" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio2.jpg" alt="2" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
        </div>
        <div class="hidden md:flex flex-col gap-4">
          <img src="/assets/portfolio/portfolio3.jpg" alt="3" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio4.jpg" alt="4" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
        </div>
        <div class="hidden md:flex flex-col gap-4">
          <img src="/assets/portfolio/portfolio8.jpg" alt="8" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio5.jpg" alt="5" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
        </div>
        <div class="hidden md:flex flex-col gap-4">
          <img src="/assets/portfolio/portfolio7.jpg" alt="7" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio6.jpg" alt="6" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
        </div>
        <div class="hidden md:flex flex-col gap-4">
          <img src="/assets/portfolio/portfolio9.jpg" alt="9" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
          <img src="/assets/portfolio/portfolio10.jpg" alt="10" class="rounded-xl" onerror="this.onerror=null;this.src='/placeholder.svg';" />
        </div>
      </div>
      <a href="#" class="text-end">
        <p class="font-semibold text-lg group relative" style="color: var(--color-accent)">
          <span>Show more photos </span>
          <i class="fa-solid fa-arrow-right"></i>
        </p>
      </a>
      <div class="h-64 w-64 rounded-full absolute top-0 left-0 mt-16 -z-20" style="background: var(--color-neutral)"></div>
    </section>
  `
})
export class PortfolioSection {} 