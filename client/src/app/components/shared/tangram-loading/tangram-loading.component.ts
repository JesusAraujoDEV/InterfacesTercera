import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tangram-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas id="tangramCanvas"></canvas>
  `,
  styleUrls: ['./tangram-loading.component.css']
})
export class TangramLoadingComponent {}