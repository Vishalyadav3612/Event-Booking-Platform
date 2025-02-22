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
  event = new EventDto() 

  message = '';

  constructor(private eventService: EventService, private router: Router) {}

  addEvent(): void {
    if (!this.event.title || !this.event.date || !this.event.location) {
      this.message = 'Please fill in all required fields!';
      return;
    }

    this.eventService.addEvent(this.event).subscribe(() => {
      this.message = 'Event added successfully!';
      setTimeout(() => this.router.navigate(['/']), 1500);
    });
  }
}
