import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ]
})

export class BookFlightComponent{

  flights: Flight[] = []

  private selectedFlightId: string;
  
  selectFlightStep = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  travelInformationStep = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {
    this.selectedFlightId = '';
  }

  selectFlight(selectedFlightId: string){
    this.selectedFlightId = selectedFlightId
    console.log("Selected flight id: " + this.selectedFlightId)
  }
}
