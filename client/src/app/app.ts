import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';
import { LoadingService } from './loading.service';
import { TangramLoadingComponent } from './components/shared/tangram-loading/tangram-loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TangramLoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  loading$;

  constructor(private router: Router, private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => this.loadingService.hide(), 400);
      }
    });
  }
  protected title = 'client';
}
