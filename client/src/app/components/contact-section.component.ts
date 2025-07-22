import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section id="contact-section" class="px-12 lg:px-32 py-16 relative" style="background: var(--color-secondary)">
      <h1 class="uppercase text-5xl mb-4 font-semibold" style="color: var(--color-primary)">Contact us</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 w-full">
        <div class="hidden md:flex justify-center items-center">
          <img src="/assets/camera.png" alt="Camera" onerror="this.onerror=null;this.src='/assets/placeholder.svg?height=300&width=400';" />
        </div>
        <div class="flex flex-col w-full items-center">
          <div class="flex flex-col items-center w-full max-w-xs px-2 mb-6">
            <p class="text-xs sm:text-sm mt-2" style="color: var(--color-text)">E-mail address</p>
            <input
              type="email"
              name="email"
              id="user_email"
              [(ngModel)]="formData.email"
              placeholder="example@domain.com"
              class="w-full px-3 py-2 sm:py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base"
              style="border-color: var(--color-primary); color: var(--color-text)"
              required
            />
          </div>
          <p class="text-xs sm:text-sm mt-2" style="color: var(--color-text)">Message</p>
          <div class="flex flex-col items-center w-full max-w-xs px-2 mb-6">
            <textarea
              name="message"
              id="user_message"
              cols="30"
              rows="10"
              [(ngModel)]="formData.message"
              placeholder="Type your message here..."
              class="w-full px-3 py-2 sm:py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base resize-vertical"
              style="border-color: var(--color-primary); color: var(--color-text)"
              required
            ></textarea>
          </div>
          <button
            (click)="handleSubmit()"
            class="btn w-full md:w-1/2 px-6 py-3 rounded-md transition-colors font-medium"
            style="background: var(--color-primary); color: var(--color-secondary)"
          >
            Send
          </button>
        </div>
      </div>
      <div class="h-44 w-44 md:h-52 md:w-52 rounded-full absolute -top-20 left-0 mt-16 -z-20" style="background: var(--color-neutral)"></div>
    </section>
  `,
})
export class ContactSection {
  formData = { email: '', message: '' };

  handleSubmit() {
    console.log('Form submitted:', this.formData);
    this.formData = { email: '', message: '' };
  }
} 