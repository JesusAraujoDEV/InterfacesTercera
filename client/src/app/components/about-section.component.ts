import { Component } from '@angular/core';

@Component({
  selector: 'app-about-section',
  standalone: true,
  template: `
    <section id="about-section" class="px-12 lg:px-32 py-16 border-t relative" style="border-color: var(--color-accent); background: var(--color-secondary)">
      <h1 class="uppercase text-5xl mb-4 font-semibold" style="color: var(--color-primary)">ABOUT US</h1>
      <p class="capitalize xl:w-1/2 mb-8" style="color: var(--color-text)">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sint quia quos, nesciunt id esse magnam
        facere eveniet ea laborum minus illo earum! Dolorum repellat eos, quod tempora omnis magni blanditiis eligendi
        nesciunt aut sapiente nemo distinctio placeat voluptas facilis deserunt quaerat, voluptatem hic accusamus dicta,
        eaque asperiores qui quasi?
      </p>
      <a href="#" class="text-end">
        <p class="font-semibold text-lg group relative" style="color: var(--color-accent)">
          <span>Read more </span>
          <i class="fa-solid fa-arrow-right"></i>
        </p>
      </a>
      <div class="h-44 w-44 md:h-52 md:w-52 rounded-full absolute top-0 -left-20 mt-16 -z-20" style="background: var(--color-neutral)"></div>
    </section>
  `
})
export class AboutSection {} 