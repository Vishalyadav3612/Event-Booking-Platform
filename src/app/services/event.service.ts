import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventDto } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'api/events';  // Use in-memory API URL

  private eventsKey = 'events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`);
  }

  addEvent(event: EventDto): Observable<EventDto> {
    return this.http.post<EventDto>(this.apiUrl, event);
  }

  updateEvent(event: EventDto): Observable<EventDto> {
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    let index = events.findIndex((e: EventDto) => e.id === event.id);
    if (index !== -1) {
      events[index] = event;
      localStorage.setItem('events', JSON.stringify(events));
    }
    return of(event);
  }

  deleteEvent(id: number): Observable<void> {
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    events = events.filter((e: EventDto) => e.id !== id);
    localStorage.setItem('events', JSON.stringify(events));
    return of();
  }

 
}