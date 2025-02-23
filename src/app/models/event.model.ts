export class EventDto {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  price: number;
  availableSeats: number;

  constructor(
  ) {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.location = '';
    this.date = '';
    this.price = 0;
    this.availableSeats = 0;
  }
}