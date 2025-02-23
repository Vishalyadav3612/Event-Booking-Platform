import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EventDto } from '../models/event.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const events: EventDto[] = [
      { id: 1, title: "Music Fest", description: "Live music event", location: "New York", date: "2025-03-10", price: 50, availableSeats: 100 },
      { id: 2, title: "Tech Conference", description: "Latest in tech", location: "San Francisco", date: "2025-04-15", price: 100, availableSeats: 50 },
      { id: 3, title: "Art Expo", description: "Showcasing modern art", location: "Los Angeles", date: "2025-05-20", price: 30, availableSeats: 80 },
      { id: 4, title: "Food Festival", description: "Taste foods from around the world", location: "Chicago", date: "2025-06-25", price: 20, availableSeats: 150 },
      { id: 5, title: "Startup Pitch Night", description: "Startups present their ideas", location: "Boston", date: "2025-07-30", price: 75, availableSeats: 60 }
    ];
    return { events };
  }

  genId(events: EventDto[]): number {
    return events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
  }
}