import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventDto } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'api/events';  // Use in-memory API URL

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`);
  }

  addEvent(event: EventDto): Observable<EventDto> {
    let events = JSON.parse(localStorage.getItem('events') || '[]');

    // Assign a new ID to the event
    event.id = events.length ? Math.max(...events.map((e: EventDto) => e.id)) + 1 : 1;

    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));

    return of(event); // Simulate an API response
  }
}