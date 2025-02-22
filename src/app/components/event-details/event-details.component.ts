import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventDto } from '../../models/event.model';
@Component({
  selector: 'app-event-details',
  standalone: false,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
  event!: EventDto;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(id).subscribe(event => this.event = event);
  }
  
  bookEvent(): void {
    let bookings = JSON.parse(localStorage.getItem('bookedEvents') || '[]');
    bookings.push(this.event);
    localStorage.setItem('bookedEvents', JSON.stringify(bookings));

    alert(`Successfully booked: ${this.event.title}`);
  }
}
