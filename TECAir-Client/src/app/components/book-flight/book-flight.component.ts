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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';

interface Flight {
  flightIid: string, price: string,
  departureAirportIATA: string,
  departureTime: string,
  landingAirportIATA: string,
  landingTime: string,
  duration: string
}

interface Seat {
  seatId: string
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
    MatDatepickerModule,
    MatGridListModule
  ]
})

export class BookFlightComponent{
  private isMobile: boolean;
  private selectedFlightId: string;
  private ticketsCuantity: number;
  private passengerName: string;
  private passengerLastName1: String;
  private passengerLastName2: string;
  private passengerEmail: string;
  private passengerTelephone: string;
  private leftTickets: number;
  private selectedseatsId: string[];

  // Getters and setters
  public getisMobile(): boolean {
    return this.isMobile;
  }
  public setisMobile(value: boolean) {
    this.isMobile = value;
  }
  public getselectedFlightId(): string {
    return this.selectedFlightId;
  }
  public setselectedFlightId(value: string) {
    this.selectedFlightId = value;
  }
  public getticketsCuantity(): number {
    return this.ticketsCuantity;
  }
  public setticketsCuantity(value: number) {
    this.ticketsCuantity = value;
  }
  public getpassengerName() {
    return this.passengerName;
  }
  public setpassengerName(value: string) {
    this.passengerName = value;
  }
  public getpassengerLastName1() {
    return this.passengerLastName1;
  }
  public setpassengerLastName1(value: string) {
    this.passengerLastName1 = value;
  }
  public getpassengerLastName2() {
    return this.passengerLastName2;
  }
  public setpassengerLastName2(value: string) {
    this.passengerLastName2 = value;
  }
  public getpassengerEmail() {
    return this.passengerEmail;
  }
  public setpassengerEmail(value: string) {
    this.passengerEmail = value;
  }
  public getpassengerTelephone() {
    return this.passengerTelephone;
  }
  public setpassengerTelephone(value: string) {
    this.passengerTelephone = value;
  }
  public getleftTickets(): number {
    return this.leftTickets;
  }
  public setleftTickets(value: number) {
    this.leftTickets = value;
  }
  public getselectedseatsId(): string[] {
    return this.selectedseatsId;
  }
  public setselectedseatsId(value: string[]) {
    this.selectedseatsId = value;
  }

  // Default data for testing
  flights: Flight[] = [
    {flightIid: '1', price: 'USD 200',
    departureAirportIATA: 'SJO', departureTime: '1:00PM', 
    landingAirportIATA: 'PTY', landingTime: '4:00PM', 
    duration: '3h'},
    {flightIid: '2', price: 'USD 500',
    departureAirportIATA: 'SJO', departureTime: '1:00PM', 
    landingAirportIATA: 'MIA', landingTime: '6:00PM', 
    duration: '5h'}
  ]
  seats: Seat[] = [
    {seatId: 'A1'},{seatId: 'A2'},{seatId: 'A3'},{seatId: 'A4'},{seatId: 'A5'},{seatId: 'A6'},
    {seatId: 'B1'},{seatId: 'B2'},{seatId: 'B3'},{seatId: 'B4'},{seatId: 'B5'},{seatId: 'B6'},
    {seatId: 'C1'},{seatId: 'C2'},{seatId: 'C3'},{seatId: 'C4'},{seatId: 'C5'},{seatId: 'C6'},
    {seatId: 'D1'},{seatId: 'D2'},{seatId: 'D3'},{seatId: 'D4'},{seatId: 'D5'},{seatId: 'D6'},
    {seatId: 'E1'},{seatId: 'E2'},{seatId: 'E3'},{seatId: 'E4'},{seatId: 'E5'},{seatId: 'E6'},
    {seatId: 'F1'},{seatId: 'F2'},{seatId: 'F3'},{seatId: 'F4'},{seatId: 'F5'},{seatId: 'F6'},
    {seatId: 'G1'},{seatId: 'G2'},{seatId: 'G3'},{seatId: 'G4'},{seatId: 'G5'},{seatId: 'G6'},
    {seatId: 'H1'},{seatId: 'H2'},{seatId: 'H3'},{seatId: 'H4'},{seatId: 'H5'},{seatId: 'H6'},
    {seatId: 'I1'},{seatId: 'I2'},{seatId: 'I3'},{seatId: 'I4'},{seatId: 'I5'},{seatId: 'I6'},
    {seatId: 'J1'},{seatId: 'J2'},{seatId: 'J3'},{seatId: 'J4'},{seatId: 'J5'},{seatId: 'J6'},
    {seatId: 'K1'},{seatId: 'K2'},{seatId: 'K3'},{seatId: 'K4'},{seatId: 'K5'},{seatId: 'K6'},
    {seatId: 'L1'},{seatId: 'L2'},{seatId: 'L3'},{seatId: 'L4'},{seatId: 'L5'},{seatId: 'L6'},
    {seatId: 'M1'},{seatId: 'M2'},{seatId: 'M3'},{seatId: 'M4'},{seatId: 'M5'},{seatId: 'M6'},
    {seatId: 'N1'},{seatId: 'N2'},{seatId: 'N3'},{seatId: 'N4'},{seatId: 'N5'},{seatId: 'N6'},
    {seatId: 'O1'},{seatId: 'O2'},{seatId: 'O3'},{seatId: 'O4'},{seatId: 'O5'},{seatId: 'O6'},
    {seatId: 'P1'},{seatId: 'P2'},{seatId: 'P3'},{seatId: 'P4'},{seatId: 'P5'},{seatId: 'P6'},
    {seatId: 'Q1'},{seatId: 'Q2'},{seatId: 'Q3'},{seatId: 'Q4'},{seatId: 'Q5'},{seatId: 'Q6'},
    {seatId: 'R1'},{seatId: 'R2'},{seatId: 'R3'},{seatId: 'R4'},{seatId: 'R5'},{seatId: 'R6'},
    {seatId: 'S1'},{seatId: 'S2'},{seatId: 'S3'},{seatId: 'S4'},{seatId: 'S5'},{seatId: 'S6'},
    {seatId: 'T1'},{seatId: 'T2'},{seatId: 'T3'},{seatId: 'T4'},{seatId: 'T5'},{seatId: 'T6'},
    {seatId: 'U1'},{seatId: 'U2'},{seatId: 'U3'},{seatId: 'U4'},{seatId: 'U5'},{seatId: 'U6'},
    {seatId: 'V1'},{seatId: 'V2'},{seatId: 'V3'},{seatId: 'V4'},{seatId: 'V5'},{seatId: 'V6'},
    {seatId: 'W1'},{seatId: 'W2'},{seatId: 'W3'},{seatId: 'W4'},{seatId: 'W5'},{seatId: 'W6'},
    {seatId: 'X1'},{seatId: 'X2'},{seatId: 'X3'},{seatId: 'X4'},{seatId: 'X5'},{seatId: 'X6'},
    {seatId: 'Y1'},{seatId: 'Y2'},{seatId: 'Y3'},{seatId: 'Y4'},{seatId: 'Y5'},{seatId: 'Y6'},
    {seatId: 'Z1'},{seatId: 'Z2'},{seatId: 'Z3'},{seatId: 'Z4'},{seatId: 'Z5'},{seatId: 'Z6'}


  ]

  // Component constructor
  constructor(private _formBuilder: FormBuilder) {
    this.selectedFlightId = '';
    this.ticketsCuantity = 5;
    this.passengerName = '';
    this.passengerLastName1 = '';
    this.passengerLastName2 = '';
    this.passengerEmail = '';
    this.passengerTelephone = '';
    this.leftTickets = this.ticketsCuantity;
    this.selectedseatsId = [];
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }
  
  // Linear Mat-Stepper conditions
  
  // Desktop
  travelInformationStepD = this._formBuilder.group({
    passengerNameInputD: ['', Validators.required],
    passengerLastName1InputD: ['', Validators.required],
    passengerLastName2InputD: ['', Validators.required],
    passengerEmailInputD: ['', Validators.required],
    passengerTelephoneInputD: ['', Validators.required],
  });
  paymentInformationStepD = this._formBuilder.group({
    passengerCreditCardNumberInputD: ['', Validators.required],
    passengerCardExpirationdateInputD: ['', Validators.required],
    passengerCardCVVInputD: ['', Validators.required],
  });

  // Mobile
  travelInformationStepM = this._formBuilder.group({
    passengerNameInputM: ['', Validators.required],
    passengerLastName1InputM: ['', Validators.required],
    passengerLastName2InputM: ['', Validators.required],
    passengerEmailInputM: ['', Validators.required],
    passengerTelephoneInputM: ['', Validators.required],
  });
  paymentInformationStepM = this._formBuilder.group({
    passengerCreditCardNumberInputM: ['', Validators.required],
    passengerCardExpirationdateInputM: ['', Validators.required],
    passengerCardCVVInputM: ['', Validators.required],
  });

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  // Function for select flight button (first step of stepper)
  selectFlight(selectedFlightId: string){
    this.selectedFlightId = selectedFlightId
  }

  // Function for personal information update button on desktop (second step of desktop stepper)
  updatePersonalInformationD(){
    this.passengerName = String(this.travelInformationStepD.get('passengerNameInputD')?.value);
    this.passengerLastName1 = String(this.travelInformationStepD.get('passengerLastName1InputD')?.value);
    this.passengerLastName2 = String(this.travelInformationStepD.get('passengerLastName2InputD')?.value);
    this.passengerEmail = String(this.travelInformationStepD.get('passengerEmailInputD')?.value);
    this.passengerTelephone = String(this.travelInformationStepD.get('passengerTelephoneInputD')?.value);
  }

  // Function for personal information update button on mobile (second step of mobile stepper)
  updatePersonalInformationM(){
    this.passengerName = String(this.travelInformationStepM.get('passengerNameInputM')?.value);
    this.passengerLastName1 = String(this.travelInformationStepM.get('passengerLastName1InputM')?.value);
    this.passengerLastName2 = String(this.travelInformationStepM.get('passengerLastName2InputM')?.value);
    this.passengerEmail = String(this.travelInformationStepM.get('passengerEmailInputM')?.value);
    this.passengerTelephone = String(this.travelInformationStepM.get('passengerTelephoneInputM')?.value);
  }

  selectSeat(seatId: string){
    if(this.selectedseatsId.includes(seatId) && this.leftTickets >= 0){
      const index = this.selectedseatsId.indexOf(seatId);
      if (index !== -1) {
        this.selectedseatsId.splice(index, 1);
      }
      this.leftTickets += 1;
    }else if(this.leftTickets > 0) {
      this.selectedseatsId.push(seatId)
      this.leftTickets -= 1;
    } else {
      console.log("Ya se seleccionaron todos los asientos solicitados");
    }


    console.log("Cantidad de asientos seleccionados: " + this.selectedseatsId.length);
    console.log("Asientos seleccionados: " + this.selectedseatsId);
    console.log("Asientos restantes: " + this.leftTickets);
  }
}
