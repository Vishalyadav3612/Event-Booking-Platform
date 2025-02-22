import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EventDto } from '../models/event.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const events: EventDto[] = [
      { id: 1, title: "Music Fest", description: "Live music event", location: "New York", date: "2025-03-10", price: 50, availableSeats: 100 },
      { id: 2, title: "Tech Conference", description: "Latest in tech", location: "San Francisco", date: "2025-04-15", price: 100, availableSeats: 50 }
    ];
    return { events };
  }
}