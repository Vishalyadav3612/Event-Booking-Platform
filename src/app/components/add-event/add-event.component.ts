import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { EventDto } from '../../models/event.model';

@Component({
  selector: 'app-add-event',
  standalone: false,
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  event: EventDto = {
    id: 0,
    title: '',
    description: '',
    location: '',
    date: '',
    price: 0,
    availableSeats: 0
  };

  message = '';

  constructor(private eventService: EventService, private router: Router) {}

  addEvent(): void {
    if (!this.event.title || !this.event.date || !this.event.location) {
      this.message = 'Please fill in all required fields!';
      return;
    }

    if (this.event.date) {
      this.event.date = new Date(this.event.date).toISOString().split('T')[0];
    }

    this.eventService.addEvent(this.event).subscribe(() => {
      this.message = 'Event added successfully!';
      setTimeout(() => this.router.navigate(['/']), 1500);
    });
  }
}
