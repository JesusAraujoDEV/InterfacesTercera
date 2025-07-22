import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  template: `
    <footer
      class="photography-footer"
      style="background: var(--color-primary); color: var(--color-text);"
    >
      <div class="footer-container" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; padding: 3rem 2rem 2rem 2rem; background: var(--color-primary); color: var(--color-text);">
        <div class="footer-brand" style="flex: 1 1 220px; min-width: 220px; margin-bottom: 2rem;">
          <div class="brand-title" style="margin-bottom: 0.5rem;">
            <p class="brand-main" style="font-weight: 700; font-size: 1.5rem; letter-spacing: 2px; color: var(--color-accent);">PHOTOGRAPHY</p>
            <p class="brand-sub" style="font-weight: 500; font-size: 1.1rem; color: var(--color-neutral);">BY LANDING</p>
          </div>
          <p class="brand-description" style="color: var(--color-text); margin-bottom: 1rem;">Capturing special moments with art and passion.</p>
          <div class="social-links" style="display: flex; gap: 1rem; margin-top: 1rem;">
            <a href="#" class="social-icon" aria-label="Instagram" style="color: var(--color-accent); font-size: 1.5rem; transition: color 0.2s;"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon" aria-label="LinkedIn" style="color: var(--color-accent); font-size: 1.5rem; transition: color 0.2s;"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-icon" aria-label="Facebook" style="color: var(--color-accent); font-size: 1.5rem; transition: color 0.2s;"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-icon" aria-label="Dribbble" style="color: var(--color-accent); font-size: 1.5rem; transition: color 0.2s;"><i class="fab fa-dribbble"></i></a>
          </div>
        </div>
        <div class="footer-section" style="flex: 1 1 180px; min-width: 180px; margin-bottom: 2rem;">
          <h3 class="section-title" style="color: var(--color-accent); font-weight: 600; margin-bottom: 1rem;">Quick Links</h3>
          <ul class="footer-links" style="list-style: none; padding: 0;">
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Home</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Portfolio</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Services</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">About Me</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Contact</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Blog</a></li>
          </ul>
        </div>
        <div class="footer-section" style="flex: 1 1 180px; min-width: 180px; margin-bottom: 2rem;">
          <h3 class="section-title" style="color: var(--color-accent); font-weight: 600; margin-bottom: 1rem;">Services</h3>
          <ul class="footer-links" style="list-style: none; padding: 0;">
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Wedding Photography</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Portrait Sessions</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Product Photography</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Corporate Events</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Family Sessions</a></li>
            <li><a href="#" class="footer-link" style="color: var(--color-text); text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s;">Aerial Photography</a></li>
          </ul>
        </div>
        <div class="footer-section" style="flex: 1 1 220px; min-width: 220px; margin-bottom: 2rem;">
          <h3 class="section-title" style="color: var(--color-accent); font-weight: 600; margin-bottom: 1rem;">Contact Us</h3>
          <address class="contact-info" style="font-style: normal; color: var(--color-text);">
            <div class="contact-item" style="display: flex; align-items: center; margin-bottom: 6px;"><i class="fas fa-map-marker-alt contact-icon" style="color: var(--color-neutral); margin-right: 8px;"></i><span style="color: var(--color-text);">123 Photography Street, Image City</span></div>
            <div class="contact-item" style="display: flex; align-items: center; margin-bottom: 6px;"><i class="fas fa-phone contact-icon" style="color: var(--color-neutral); margin-right: 8px;"></i><a href="tel:+1234567890" class="footer-link" style="color: var(--color-text); text-decoration: none;">+1 234 567 890</a></div>
            <div class="contact-item" style="display: flex; align-items: center; margin-bottom: 6px;"><i class="fas fa-envelope contact-icon" style="color: var(--color-neutral); margin-right: 8px;"></i><a href="mailto:info@landingphotography.com" class="footer-link" style="color: var(--color-text); text-decoration: none;">info&#64;landingphoto.com</a></div>
            <div class="contact-item" style="display: flex; align-items: center; margin-bottom: 6px;"><i class="fas fa-clock contact-icon" style="color: var(--color-neutral); margin-right: 8px;"></i><span style="color: var(--color-text);">Mon-Fri: 9:00 AM - 6:00 PM</span></div>
          </address>
          <div class="newsletter" style="margin-top: 1.5rem;">
            <h4 class="newsletter-title" style="color: var(--color-accent); font-weight: 500; margin-bottom: 8px;">Subscribe to our newsletter</h4>
            <form class="newsletter-form" (submit)="handleNewsletterSubmit($event)" style="display: flex; gap: 8px;">
              <input
                type="email"
                placeholder="Your email"
                class="newsletter-input"
                aria-label="Email for newsletter subscription"
                [(ngModel)]="email"
                name="newsletterEmail"
                required
                style="flex: 1; padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid var(--color-neutral); background: var(--color-secondary); color: var(--color-text); outline: none; font-size: 1rem; margin-right: 4px;"
              />
              <button
                type="submit"
                class="newsletter-button"
                aria-label="Subscribe"
                style="background: var(--color-accent); color: var(--color-secondary); border: none; border-radius: 6px; padding: 0.5rem 1rem; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; transition: background 0.2s;"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="copyright-section" style="background: var(--color-accent); color: var(--color-text); padding: 1rem 2rem;">
        <div class="copyright-container" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div class="copyright-text" style="font-size: 1rem; color: var(--color-text);">&copy; {{ currentYear }} Landing Photography. All rights reserved.</div>
          <div class="legal-links" style="display: flex; gap: 1.5rem;">
            <a href="#" class="legal-link" style="color: var(--color-text); text-decoration: underline; font-size: 1rem;">Privacy Policy</a>
            <a href="#" class="legal-link" style="color: var(--color-text); text-decoration: underline; font-size: 1rem;">Terms of Service</a>
            <a href="#" class="legal-link" style="color: var(--color-text); text-decoration: underline; font-size: 1rem;">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  standalone: true,
  imports: [FormsModule],
})
export class Footer {
  email = '';
  currentYear = new Date().getFullYear();

  handleNewsletterSubmit(event: Event) {
    event.preventDefault();
    console.log('Newsletter subscription:', this.email);
    this.email = '';
  }
} 