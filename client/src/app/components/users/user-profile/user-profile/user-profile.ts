import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileWizardExpanded } from '../../profile-wizard-expanded/profile-wizard-expanded/profile-wizard-expanded';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ProfileWizardExpanded],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {
  @Input() user: any;
  @Input() status: 'active' | 'inactive' = 'active';

  activeSection: 'personal' | 'professional' | 'location' = 'personal';
  isEditing = false;

  get percentComplete(): number {
    const profileFields = [
      'firstName', 'lastName', 'maidenName', 'age', 'gender', 'phone', 'username', 'birthDate', 'image', 'bloodGroup', 'height', 'weight', 'eyeColor', 'ip', 'macAddress', 'university', 'ein', 'ssn', 'userAgent', 'hair', 'address', 'bank', 'company', 'crypto'
    ];
    const filledFields = profileFields.filter(field => this.user && this.user[field] !== null && this.user[field] !== undefined && this.user[field] !== '');
    return Math.round((filledFields.length / profileFields.length) * 100);
  }

  handleProfileUpdate(updatedUser: any) {
    this.isEditing = false;
    this.user = updatedUser;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }

  handleCancel() {
    this.isEditing = false;
  }
}
