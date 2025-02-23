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
  filteredEvents: EventDto[] = [];
  selectedLocation = '';
  selectedDate = '';
  minPrice = 0;
  maxPrice = 10000;
  sortBy = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = [...this.events]; 
    });
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
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([`/event/${eventId}`]);
    }
  }

  navigateToBook(eventId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([`/event/${eventId}`]);
    }
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  deleteEvent(eventId: number): void {
    if (this.isAdmin()) {
      this.eventService.deleteEvent(eventId).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  applyFilters() {
    if (!this.events.length) return;
  
    this.filteredEvents = this.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            event.location.toLowerCase().includes(this.searchQuery.toLowerCase());
  
      const matchesLocation = this.selectedLocation ? event.location === this.selectedLocation : true;
      const eventDateFormatted = new Date(event.date).toISOString().split('T')[0];
      const selectedDateFormatted = this.selectedDate ? new Date(this.selectedDate).toISOString().split('T')[0] : null;
      const matchesDate = selectedDateFormatted ? eventDateFormatted === selectedDateFormatted : true;
  
      const matchesPrice = event.price >= this.minPrice && event.price <= this.maxPrice;
  
      return matchesSearch && matchesLocation && matchesDate && matchesPrice;
    });
  
    this.applySorting();
  }

  applySorting() {
    if (this.sortBy === 'date') {
      this.filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortBy === 'price') {
      this.filteredEvents.sort((a, b) => a.price - b.price);
    }
  }
}

