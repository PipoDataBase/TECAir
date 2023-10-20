import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecairlinesComponent } from './components/tecairlines/tecairlines.component';
import { HomeComponent } from './components/home/home.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PDFComponent } from './components/pdf/pdf.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'tecair' },
  {
    path: 'tecair',
    component: TecairlinesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'book-flight', component: BookFlightComponent },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'promotions', component: PromotionsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'pdf', component: PDFComponent}
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
