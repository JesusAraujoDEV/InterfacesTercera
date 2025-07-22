
import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar.component';
import { MainSection } from '../../components/main-section.component';
import { AboutSection } from '../../components/about-section.component';
import { ServicesSection } from '../../components/services-section.component';
import { PortfolioSection } from '../../components/portfolio-section.component';
import { ContactSection } from '../../components/contact-section.component';
import { Footer } from '../../components/footer.component';
import { ImageCarousel } from '../../components/image-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, MainSection, AboutSection, ServicesSection, PortfolioSection, ContactSection, Footer, ImageCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
