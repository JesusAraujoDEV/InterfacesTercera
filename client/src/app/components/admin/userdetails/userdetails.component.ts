import { Component, Input } from '@angular/core';
import { CommonModule, NgIf, NgClass, DatePipe } from '@angular/common';
import { UserMapComponent } from '../../common/usermap/usermap.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass, DatePipe, UserMapComponent],
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserDetailsComponent {
  @Input() user: any;
  activeTab: 'info' | 'contact' | 'location' = 'info';

  setActiveTab(tab: 'info' | 'contact' | 'location') {
    this.activeTab = tab;
  }

  getRegisteredDate(): string {
    if (this.user?.createdAt) {
      return this.user.createdAt;
    }
    // Devuelve la fecha actual en formato ISO si no existe
    return new Date().toISOString();
  }
}
