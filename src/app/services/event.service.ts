import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventDto } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'api/events';  
  private storageKey = 'events'; 

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventDto[]> {
    const storedEvents = localStorage.getItem(this.storageKey);

    if (storedEvents) {
      return of(JSON.parse(storedEvents)); 
    } else {
      return new Observable<EventDto[]>(observer => {
        this.http.get<EventDto[]>(this.apiUrl).subscribe(events => {
          localStorage.setItem(this.storageKey, JSON.stringify(events));
          observer.next(events);
          observer.complete();
        });
      });
    }
  }

  getEventById(id: number): Observable<EventDto> {
    const events: EventDto[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return of(events.find(event => event.id === id) as EventDto);
  }

  addEvent(event: EventDto): Observable<EventDto> {
    const events: EventDto[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    event.id = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;
    events.push(event);

    localStorage.setItem(this.storageKey, JSON.stringify(events));
    return of(event);
  }

  updateEvent(event: EventDto): Observable<EventDto> {
    let events: EventDto[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const index = events.findIndex(e => e.id === event.id);

    if (index !== -1) {
      events[index] = event;
      localStorage.setItem(this.storageKey, JSON.stringify(events));
    }
    return of(event);
  }

  deleteEvent(id: number): Observable<void> {
    let events: EventDto[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    events = events.filter(e => e.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(events));
    return of();
  }


}