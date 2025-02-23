import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventDto } from '../../models/event.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: false,
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  events: EventDto[] = [];
  searchQuery = '';
  filterCriteria = { location: '', minPrice: 0, maxPrice: 1000 };

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEvents(); // Load events from the service
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  searchEvents() {
    this.events = this.events.filter(event => 
      event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  bookEvent(event: EventDto): void {
    let bookings = JSON.parse(localStorage.getItem('bookedEvents') || '[]');
    bookings.push(event);
    localStorage.setItem('bookedEvents', JSON.stringify(bookings));
    alert(`Successfully booked: ${event.title}`);
  }

  navigateToEvent(eventId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
    } else {
      this.router.navigate([`/event/${eventId}`]);  // Go to event details if logged in
    }
  }

  navigateToBook(eventId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
    } else {
      this.router.navigate([`/event/${eventId}`]);  // Proceed to event booking if logged in
    }
  }

  // ✅ Check if logged-in user is admin
  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  // ✅ Admin can delete an event
  deleteEvent(eventId: number): void {
    if (this.isAdmin()) {
      this.eventService.deleteEvent(eventId);
      this.loadEvents(); // Refresh the event list
    }
  }
}
