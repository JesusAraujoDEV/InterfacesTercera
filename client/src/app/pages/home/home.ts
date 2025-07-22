import { Component } from '@angular/core';

// Placeholders para los subcomponentes
import { Component as NgComponent } from '@angular/core';
@NgComponent({ selector: 'app-navbar', standalone: true, template: '<nav class="w-full bg-white shadow p-4">Navbar</nav>' })
export class Navbar {}
@NgComponent({ selector: 'app-main-section', standalone: true, template: '<section class="p-8">Main Section</section>' })
export class MainSection {}
@NgComponent({ selector: 'app-about-section', standalone: true, template: '<section class="p-8">About Section</section>' })
export class AboutSection {}
@NgComponent({ selector: 'app-services-section', standalone: true, template: '<section class="p-8">Services Section</section>' })
export class ServicesSection {}
@NgComponent({ selector: 'app-image-carousel', standalone: true, template: '<section class="p-8">Image Carousel</section>' })
export class ImageCarousel {}
@NgComponent({ selector: 'app-portfolio-section', standalone: true, template: '<section class="p-8">Portfolio Section</section>' })
export class PortfolioSection {}
@NgComponent({ selector: 'app-contact-section', standalone: true, template: '<section class="p-8">Contact Section</section>' })
export class ContactSection {}
@NgComponent({ selector: 'app-footer', standalone: true, template: '<footer class="w-full bg-neutral-200 p-4 text-center">Footer</footer>' })
export class Footer {}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, MainSection, AboutSection, ImageCarousel, ServicesSection, PortfolioSection, ContactSection, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
