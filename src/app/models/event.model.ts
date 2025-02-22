export class EventDto {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  price: number;
  availableSeats: number;

  constructor(
    // id: number = 0,
    // title: string = '',
    // description: string = '',
    // location: string = '',
    // date: string = '',
    // price: number = 0,
    // availableSeats: number = 0
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