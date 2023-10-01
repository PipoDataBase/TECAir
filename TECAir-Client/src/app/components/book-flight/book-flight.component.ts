import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';

interface Flight {
  id: string, price: string,
  departureAirportIATA: string,
  departureTime: string,
  landingAirportIATA: string,
  landingTime: string,
  duration: string
}

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule
  ]
})

export class BookFlightComponent{
  isMobile: boolean

  flights: Flight[] = [
    {id: '1', price: 'USD 200',
    departureAirportIATA: 'SJO', departureTime: '1:00PM', 
    landingAirportIATA: 'PTY', landingTime: '4:00PM', 
    duration: '3h'},
    {id: '2', price: 'USD 500',
    departureAirportIATA: 'SJO', departureTime: '1:00PM', 
    landingAirportIATA: 'MIA', landingTime: '6:00PM', 
    duration: '5h'}
  ]

  private selectedFlightId: string;
  
  selectFlightStep = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  travelInformationStep = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  paymentInformationStep = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _formBuilder: FormBuilder) {
    this.selectedFlightId = '';
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  selectFlight(selectedFlightId: string){
    this.selectedFlightId = selectedFlightId
    console.log("Selected flight id: " + this.selectedFlightId)
  }
}
