import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

// FormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Syncfusion
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DatePipe } from '@angular/common';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { TecairlinesComponent } from './components/tecairlines/tecairlines/tecairlines.component';
import { FlightsComponent } from './components/tecairlines/flights/flights/flights.component';
import { AddFlightComponent } from './components/tecairlines/flights/add-flight/add-flight.component';
import { PromotionsComponent } from './components/tecairlines/promotions/promotions/promotions.component';
import { AddPromotionsComponent } from './components/tecairlines/promotions/add-promotions/add-promotions.component';
import { EditPromotionsComponent } from './components/tecairlines/promotions/edit-promotions/edit-promotions.component';
import { EditFlightComponent } from './components/tecairlines/flights/edit-flight/edit-flight.component';
import { TripsComponent } from './components/tecairlines/trips/trips/trips.component';
import { AddTripComponent } from './components/tecairlines/trips/add-trip/add-trip.component';
import { ReservationsComponent } from './components/tecairlines/reservations/reservations/reservations.component';
import { BookFlightComponent } from './components/tecairlines/reservations/book-flight/book-flight.component';
import { ViewPromotionsComponent } from './components/tecairlines/reservations/view-promotions/view-promotions.component';
import { ProfileComponent } from './components/tecairlines/reservations/profile/profile.component';
import { CheckBoardingpassBaggagesComponent } from './components/tecairlines/check-boardingpass-baggages/check-boardingpass-baggages.component';
import { environment } from './environments/environment.development';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TecairlinesComponent,
    TripsComponent,
    AddTripComponent,
    FlightsComponent,
    AddFlightComponent,
    EditFlightComponent,
    PromotionsComponent,
    AddPromotionsComponent,
    EditPromotionsComponent,
    ReservationsComponent,
    BookFlightComponent,
    ViewPromotionsComponent,
    ProfileComponent,
    CheckBoardingpassBaggagesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
