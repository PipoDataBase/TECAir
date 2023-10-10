import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { TecairlinesComponent } from './components/tecairlines/tecairlines/tecairlines.component';
import { HomeComponent } from './components/tecairlines/home/home.component';
import { FlightsComponent } from './components/tecairlines/flights/flights/flights.component';
import { AddFlightComponent } from './components/tecairlines/flights/add-flight/add-flight.component';
import { PromotionsComponent } from './components/tecairlines/promotions/promotions/promotions.component';
import { AddPromotionsComponent } from './components/tecairlines/promotions/add-promotions/add-promotions.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'tecair-admin/login' },
  { path: 'tecair-admin/login', component: LoginComponent },
  {
    path: 'tecair-admin/:id',
    component: TecairlinesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'flights', component: FlightsComponent },
      { path: 'add-flight', component: AddFlightComponent },
      { path: 'promotion', component: PromotionsComponent},
      {path: 'add-promotion', component: AddPromotionsComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
