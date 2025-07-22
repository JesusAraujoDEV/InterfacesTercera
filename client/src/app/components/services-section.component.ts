import { Component } from '@angular/core';

@Component({
  selector: 'app-services-section',
  standalone: true,
  template: `
    <section id="services-section" class="px-12 lg:px-32 py-16 relative overflow-hidden" style="background: var(--color-secondary)">
      <div class="flex gap-8 flex-col md:flex-row">
        <h1 class="uppercase text-5xl mb-4 font-semibold" style="color: var(--color-primary)">OUR SERVICES</h1>
        <p class="capitalize xl:w-1/2 mb-8" style="color: var(--color-text)">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure rem harum, quam magnam accusamus
          inventore incidunt nihil, fuga soluta earum! Voluptatibus, recusandae. Cumque sequi ullam, nostrum voluptatum
          eius saepe.
        </p>
      </div>
      <div class="flex flex-col md:flex-row md:gap-8">
        <div class="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start my-8 md:w-1/3">
          <img src="/assets/services/wedding.png" alt="Wedding" class="-z-50 md:mb-4" onerror="this.onerror=null;this.src='/placeholder.svg?height=100&width=100';" />
          <div class="w-2/3 text-right md:text-left md:w-full">
            <h1 class="uppercase text-2xl font-semibold" style="color: var(--color-accent)">Wedding</h1>
            <p class="capitalize" style="color: var(--color-text)">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, neque?
            </p>
          </div>
        </div>
        <div class="flex flex-row md:flex-col justify-between items-center md:items-start my-8 md:w-1/3">
          <div class="w-2/3 text-left md:w-full md:order-2">
            <h1 class="uppercase text-2xl font-semibold" style="color: var(--color-accent)">Lifestyle</h1>
            <p class="capitalize" style="color: var(--color-text)">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ratione!
            </p>
          </div>
          <img src="/assets/services/lifestyle.png" alt="Lifestyle" class="-z-50 md:mb-4 md:order-1" onerror="this.onerror=null;this.src='/placeholder.svg?height=100&width=100';" />
        </div>
        <div class="flex flex-row md:flex-col justify-between items-center md:items-start my-8 md:w-1/3">
          <div class="w-1/3">
            <img src="/assets/services/moments.png" alt="Moments" class="-z-50 md:mb-4" onerror="this.onerror=null;this.src='/placeholder.svg?height=100&width=100';" />
          </div>
          <div class="w-2/3 text-right md:text-left md:w-full">
            <h1 class="uppercase text-2xl font-semibold" style="color: var(--color-accent)">Moments</h1>
            <p class="capitalize" style="color: var(--color-text)">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, molestias.
            </p>
          </div>
        </div>
      </div>
      <div class="h-64 w-64 rounded-full absolute top-0 -right-20 mt-16 -z-20" style="background: var(--color-neutral)"></div>
    </section>
  `
})
export class ServicesSection {} 