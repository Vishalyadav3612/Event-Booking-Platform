import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');

  logout() {
    localStorage.removeItem('user');
  }
}
