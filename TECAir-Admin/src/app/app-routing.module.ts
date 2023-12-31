import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { TecairlinesComponent } from './components/tecairlines/tecairlines/tecairlines.component';
import { TripsComponent } from './components/tecairlines/trips/trips/trips.component';
import { AddTripComponent } from './components/tecairlines/trips/add-trip/add-trip.component';
import { FlightsComponent } from './components/tecairlines/flights/flights/flights.component';
import { AddFlightComponent } from './components/tecairlines/flights/add-flight/add-flight.component';
import { EditFlightComponent } from './components/tecairlines/flights/edit-flight/edit-flight.component';
import { PromotionsComponent } from './components/tecairlines/promotions/promotions/promotions.component';
import { AddPromotionsComponent } from './components/tecairlines/promotions/add-promotions/add-promotions.component';
import { EditPromotionsComponent } from './components/tecairlines/promotions/edit-promotions/edit-promotions.component';
import { ReservationsComponent } from './components/tecairlines/reservations/reservations/reservations.component';
import { BookFlightComponent } from './components/tecairlines/reservations/book-flight/book-flight.component';
import { ViewPromotionsComponent } from './components/tecairlines/reservations/view-promotions/view-promotions.component';
import { ProfileComponent } from './components/tecairlines/reservations/profile/profile.component';
import { CheckBoardingpassBaggagesComponent } from './components/tecairlines/check-boardingpass-baggages/check-boardingpass-baggages.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'tecair-admin/login' },
  { path: 'tecair-admin/login', component: LoginComponent },
  {
    path: 'tecair-admin/:id',
    component: TecairlinesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'trips' },
      { path: 'trips', component: TripsComponent },
      { path: 'add-trip', component: AddTripComponent },
      { path: 'flights', component: FlightsComponent },
      { path: 'add-flight', component: AddFlightComponent },
      { path: 'edit-flight/:id', component: EditFlightComponent },
      { path: 'promotions', component: PromotionsComponent},
      { path: 'add-promotion', component: AddPromotionsComponent},
      { path: 'edit-promotion/:id', component: EditPromotionsComponent},
      { path: 'reservations', component: ReservationsComponent },
      { path: 'book-flight', component: BookFlightComponent },
      { path: 'view-promotions', component: ViewPromotionsComponent },
      { path: 'profile/:email', component: ProfileComponent },
      { path: 'chack-boardingpass-baggages', component: CheckBoardingpassBaggagesComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
