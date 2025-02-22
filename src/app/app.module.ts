import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventService } from './services/event.service';
import { AuthService } from './services/auth.service';
import { BookingService } from './services/booking.service';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuardService } from './services/auth-guard.service';
import { AddEventComponent } from './components/add-event/add-event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventDetailsComponent,
    ProfileComponent,
    LoginComponent,
    AddEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }) 

  ],
  providers: [HttpClient, EventService, BookingService, AuthService, AdminGuard, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
