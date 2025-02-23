import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventDto } from '../../models/event.model';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-event-details',
  standalone: false,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
  event: EventDto = new EventDto();
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(id).subscribe(event => this.event = event);
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  editEvent(): void {
    this.isEditing = true;
  }

  saveEdit(): void {
    this.eventService.updateEvent(this.event).subscribe(() => {
      this.isEditing = false;
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  deleteEvent(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event.id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }



  
}

