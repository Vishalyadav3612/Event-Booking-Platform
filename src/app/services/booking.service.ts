import { Injectable } from '@angular/core';
import { EventDto } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: EventDto[] = JSON.parse(localStorage.getItem('bookings') || '[]');

  bookEventDto(EventDto: EventDto) {
    this.bookings.push(EventDto);
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }

  getBookings(): EventDto[] {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }

  cancelBooking(eventId: number) {
    this.bookings = this.bookings.filter(event => event.id !== eventId);
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }
}