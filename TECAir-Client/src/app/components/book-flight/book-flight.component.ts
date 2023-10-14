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
import Swal from 'sweetalert2';
import {MatTooltipModule} from '@angular/material/tooltip';

import { Router } from '@angular/router';

import { Viaje } from 'src/app/models/viaje.module';
import { Vuelo } from 'src/app/models/vuelo.module';
import { ViajeVuelo } from 'src/app/models/viaje-vuelo.module'
import { VueloAeropuerto } from 'src/app/models/vuelo-aeropuerto.module';

import { ViajesService } from 'src/app/services/viajes.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { ViajesVuelosService } from 'src/app/services/viajes-vuelos.service';
import { VuelosAeropuertosService } from 'src/app/services/vuelos-aeropuertos.service';

import { SharedService } from 'src/app/services/shared.service';

/*
interface Travel{
  travelId: string, price: string,
  departureAirportIATA: string,
  departureTime: string,
  landingAirportIATA: string,
  landingTime: string,
  duration: string,
  showStepOvers: boolean
}
*/

interface Flight {
  parentTravelId: string, flightId: string, price: string,
  departureAirportIATA: string,
  departureTime: string,
  landingAirportIATA: string,
  landingTime: string,
  duration: string
}

interface Seat {
  seatId: string,
  state: string
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
    MatGridListModule,
    MatTooltipModule
  ]
})

export class BookFlightComponent{
  private isMobile: boolean;
  private selectedTravelId: number;
  private ticketsCuantity: number;
  private passengerName: string;
  private passengerLastName1: String;
  private passengerLastName2: string;
  private passengerEmail: string;
  private passengerTelephone: string;
  private leftTickets: number;
  private selectedseatsId: string[];

  private showStepovers: boolean;

  private viajes: Viaje[];
  private vuelos: Vuelo[];
  private viajes_vuelos: ViajeVuelo[];
  private vuelos_aeropuertos: VueloAeropuerto[];
  

  // Getters and setters
  public getisMobile(): boolean {
    return this.isMobile;
  }
  public setisMobile(value: boolean) {
    this.isMobile = value;
  }
  public getselectedTravelId(): number {
    return this.selectedTravelId;
  }
  public setselectedTravelId(value: number) {
    this.selectedTravelId = value;
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

  public getShowStepovers(): boolean {
    return this.showStepovers;
  }
  public setShowStepovers(value: boolean) {
    this.showStepovers = value;
  }

  public getViajes(): Viaje[] {
    return this.viajes;
  }
  public setViajes(value: Viaje[]) {
    this.viajes = value;
  }
  public getVuelos(): Vuelo[] {
    return this.vuelos;
  }
  public setVuelos(value: Vuelo[]) {
    this.vuelos = value;
  }

  // Default data for testing
  /*
  travels: Viaje[] = [
    {travelId: '1', price: 'USD 400',
    departureAirportIATA: 'SJO', departureTime: '1:00PM', 
    landingAirportIATA: 'EZE', landingTime: '6:00PM', 
    duration: '5h', showStepOvers: false},
    {travelId: '2', price: 'USD 500',
    departureAirportIATA: 'SJO', departureTime: '1:00PM', 
    landingAirportIATA: 'MIA', landingTime: '6:00PM', 
    duration: '5h', showStepOvers: false}
  ]
  flights: Flight[] = [
    {parentTravelId: '1', flightId: '1', price: 'USD 100',
    departureAirportIATA: 'SJO', departureTime: '1:00PM', 
    landingAirportIATA: 'PTY', landingTime: '2:00PM', 
    duration: '1h'},
    {parentTravelId: '1', flightId: '2', price: 'USD 300',
    departureAirportIATA: 'PTY', departureTime: '2:00PM', 
    landingAirportIATA: 'EZE', landingTime: '6:00PM', 
    duration: '4h'},
    {parentTravelId: '2', flightId: '3', price: 'USD 250',
    departureAirportIATA: 'SJO', departureTime: '1:00PM', 
    landingAirportIATA: 'SAL', landingTime: '3:00PM', 
    duration: '2h'},
    {parentTravelId: '2', flightId: '4', price: 'USD 250',
    departureAirportIATA: 'SAL', departureTime: '3:00PM', 
    landingAirportIATA: 'MIA', landingTime: '6:00PM', 
    duration: '2h'}
  ]
  seats: Seat[] = [
    {seatId: 'A1', state: "Busy"},{seatId: 'A2', state: "Available"},{seatId: 'A3', state: "Available"},{seatId: 'A4', state: "Available"},{seatId: 'A5', state: "Available"},{seatId: 'A6', state: "Available"},
    {seatId: 'B1', state: "Available"},{seatId: 'B2', state: "Available"},{seatId: 'B3', state: "Available"},{seatId: 'B4', state: "Available"},{seatId: 'B5', state: "Available"},{seatId: 'B6', state: "Available"},
    {seatId: 'C1', state: "Available"},{seatId: 'C2', state: "Available"},{seatId: 'C3', state: "Available"},{seatId: 'C4', state: "Available"},{seatId: 'C5', state: "Available"},{seatId: 'C6', state: "Available"},
    {seatId: 'D1', state: "Available"},{seatId: 'D2', state: "Available"},{seatId: 'D3', state: "Available"},{seatId: 'D4', state: "Available"},{seatId: 'D5', state: "Available"},{seatId: 'D6', state: "Available"},
    {seatId: 'E1', state: "Available"},{seatId: 'E2', state: "Available"},{seatId: 'E3', state: "Available"},{seatId: 'E4', state: "Available"},{seatId: 'E5', state: "Available"},{seatId: 'E6', state: "Available"},
    {seatId: 'F1', state: "Available"},{seatId: 'F2', state: "Available"},{seatId: 'F3', state: "Available"},{seatId: 'F4', state: "Available"},{seatId: 'F5', state: "Available"},{seatId: 'F6', state: "Available"},
    {seatId: 'G1', state: "Available"},{seatId: 'G2', state: "Available"},{seatId: 'G3', state: "Available"},{seatId: 'G4', state: "Available"},{seatId: 'G5', state: "Available"},{seatId: 'G6', state: "Available"},
    {seatId: 'H1', state: "Available"},{seatId: 'H2', state: "Available"},{seatId: 'H3', state: "Available"},{seatId: 'H4', state: "Available"},{seatId: 'H5', state: "Available"},{seatId: 'H6', state: "Available"},
    {seatId: 'I1', state: "Available"},{seatId: 'I2', state: "Available"},{seatId: 'I3', state: "Available"},{seatId: 'I4', state: "Available"},{seatId: 'I5', state: "Available"},{seatId: 'I6', state: "Available"},
    {seatId: 'J1', state: "Available"},{seatId: 'J2', state: "Available"},{seatId: 'J3', state: "Available"},{seatId: 'J4', state: "Available"},{seatId: 'J5', state: "Available"},{seatId: 'J6', state: "Available"},
    {seatId: 'K1', state: "Available"},{seatId: 'K2', state: "Available"},{seatId: 'K3', state: "Available"},{seatId: 'K4', state: "Available"},{seatId: 'K5', state: "Available"},{seatId: 'K6', state: "Available"},
    {seatId: 'L1', state: "Available"},{seatId: 'L2', state: "Available"},{seatId: 'L3', state: "Available"},{seatId: 'L4', state: "Available"},{seatId: 'L5', state: "Available"},{seatId: 'L6', state: "Available"},
    {seatId: 'M1', state: "Available"},{seatId: 'M2', state: "Available"},{seatId: 'M3', state: "Available"},{seatId: 'M4', state: "Available"},{seatId: 'M5', state: "Available"},{seatId: 'M6', state: "Available"},
    {seatId: 'N1', state: "Available"},{seatId: 'N2', state: "Available"},{seatId: 'N3', state: "Available"},{seatId: 'N4', state: "Available"},{seatId: 'N5', state: "Available"},{seatId: 'N6', state: "Available"},
    {seatId: 'O1', state: "Available"},{seatId: 'O2', state: "Available"},{seatId: 'O3', state: "Available"},{seatId: 'O4', state: "Available"},{seatId: 'O5', state: "Available"},{seatId: 'O6', state: "Available"},
    {seatId: 'P1', state: "Available"},{seatId: 'P2', state: "Available"},{seatId: 'P3', state: "Available"},{seatId: 'P4', state: "Available"},{seatId: 'P5', state: "Available"},{seatId: 'P6', state: "Available"},
    {seatId: 'Q1', state: "Available"},{seatId: 'Q2', state: "Available"},{seatId: 'Q3', state: "Available"},{seatId: 'Q4', state: "Available"},{seatId: 'Q5', state: "Available"},{seatId: 'Q6', state: "Available"},
    {seatId: 'R1', state: "Available"},{seatId: 'R2', state: "Available"},{seatId: 'R3', state: "Available"},{seatId: 'R4', state: "Available"},{seatId: 'R5', state: "Available"},{seatId: 'R6', state: "Available"},
    {seatId: 'S1', state: "Available"},{seatId: 'S2', state: "Available"},{seatId: 'S3', state: "Available"},{seatId: 'S4', state: "Available"},{seatId: 'S5', state: "Available"},{seatId: 'S6', state: "Available"},
    {seatId: 'T1', state: "Available"},{seatId: 'T2', state: "Available"},{seatId: 'T3', state: "Available"},{seatId: 'T4', state: "Available"},{seatId: 'T5', state: "Available"},{seatId: 'T6', state: "Available"},
    {seatId: 'U1', state: "Available"},{seatId: 'U2', state: "Available"},{seatId: 'U3', state: "Available"},{seatId: 'U4', state: "Available"},{seatId: 'U5', state: "Available"},{seatId: 'U6', state: "Available"},
    {seatId: 'V1', state: "Available"},{seatId: 'V2', state: "Available"},{seatId: 'V3', state: "Available"},{seatId: 'V4', state: "Available"},{seatId: 'V5', state: "Available"},{seatId: 'V6', state: "Available"},
    {seatId: 'W1', state: "Available"},{seatId: 'W2', state: "Available"},{seatId: 'W3', state: "Available"},{seatId: 'W4', state: "Available"},{seatId: 'W5', state: "Available"},{seatId: 'W6', state: "Available"},
    {seatId: 'X1', state: "Available"},{seatId: 'X2', state: "Available"},{seatId: 'X3', state: "Available"},{seatId: 'X4', state: "Available"},{seatId: 'X5', state: "Available"},{seatId: 'X6', state: "Available"},
    {seatId: 'Y1', state: "Available"},{seatId: 'Y2', state: "Available"},{seatId: 'Y3', state: "Available"},{seatId: 'Y4', state: "Available"},{seatId: 'Y5', state: "Available"},{seatId: 'Y6', state: "Available"},
    {seatId: 'Z1', state: "Available"},{seatId: 'Z2', state: "Available"},{seatId: 'Z3', state: "Available"},{seatId: 'Z4', state: "Available"},{seatId: 'Z5', state: "Available"},{seatId: 'Z6', state: "Available"}
  ]
  */

  // Component constructor
  constructor(private _formBuilder: FormBuilder, private router: Router, private vuelosService: VuelosService, private viajesService: ViajesService, private viajesVuelosService: ViajesVuelosService,private sharedService: SharedService) {
    this.selectedTravelId = 0;
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

    this.showStepovers = false;

    this.viajes = [];
    this.vuelos = [];
    this.viajes_vuelos = [];
    this.vuelos_aeropuertos = [];
  }

  loadTravels(): void {
    this.viajesService.getViajes().subscribe({
      next: (viajes) => {
        this.viajes = viajes;

        console.log("Filtros: ", this.sharedService.searchedOrigin, this.sharedService.searchedDestiny, this.sharedService.formatDate2(this.sharedService.selectedDate.toString()))

        this.viajes = this.sharedService._filterTravelsByOriginDestiny(this.viajes, this.sharedService.searchedOrigin, this.sharedService.searchedDestiny, this.sharedService.formatDate2(this.sharedService.selectedDate.toString()));
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  loadFlights(): void {
    this.vuelosService.getVuelos().subscribe({
      next: (vuelos) => {
        this.vuelos = vuelos;
        console.log("Vuelos: ", this.vuelos)
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  loadTravelFlights(): void {
    this.viajesVuelosService.getViajesVuelos().subscribe({
      next: (viajesVuelos) => {
        this.viajes_vuelos = viajesVuelos;
        console.log("Viajes-vuelos: ", this.viajes_vuelos)
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ngOnInit(): void {
    this.loadTravels();
    this.loadFlights();
    this.loadTravelFlights();
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
  selectFlight(selectedTravelId: number){
    this.selectedTravelId = selectedTravelId
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

  /*
  selectSeat(seatId: string){
    if(this.selectedseatsId.includes(seatId) && this.leftTickets >= 0){
      const index = this.selectedseatsId.indexOf(seatId);
      if (index !== -1) {
        this.selectedseatsId.splice(index, 1);
        const selectedSeat = this.seats.find((seat) => seat.seatId === seatId);
        if(selectedSeat){
          selectedSeat.state = "Available";
        }else{
          console.log("Error");
        }
      }
      this.leftTickets += 1;
    }else if(this.leftTickets > 0) {
      this.selectedseatsId.push(seatId)
      const selectedSeat = this.seats.find((seat) => seat.seatId === seatId);
        if(selectedSeat){
          selectedSeat.state = "Selected";
        }else{
          console.log("Error");
        }
      this.leftTickets -= 1;
    } else {
      console.log("Ya se seleccionaron todos los asientos solicitados");
    }


    console.log("Cantidad de asientos seleccionados: " + this.selectedseatsId.length);
    console.log("Asientos seleccionados: " + this.selectedseatsId);
    console.log("Asientos restantes: " + this.leftTickets);
  }
  */

  reserveFlight(){
    if(this.paymentInformationStepD.valid || this.paymentInformationStepM.valid){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Vuelo reservado!',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        this.router.navigate(["tecair"]);
      });
    }
    
  }

  /*
  showHideStepOvers(travelIndex: number){
    this.travels[travelIndex].showStepOvers = !this.travels[travelIndex].showStepOvers;
  }
  */
}
