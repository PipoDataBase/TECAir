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

import { Data, Router } from '@angular/router';

import { Viaje } from 'src/app/models/viaje.module';
import { Vuelo } from 'src/app/models/vuelo.module';
import { ViajeVuelo } from 'src/app/models/viaje-vuelo.module'
import { VueloAeropuerto } from 'src/app/models/vuelo-aeropuerto.module';
import { Asiento } from 'src/app/models/asiento.module';
import { PaseAbordaje } from 'src/app/models/pase-abordaje.module';

import { ViajesService } from 'src/app/services/viajes.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { ViajesVuelosService } from 'src/app/services/viajes-vuelos.service';
import { VuelosAeropuertosService } from 'src/app/services/vuelos-aeropuertos.service';
import { AsientosService } from 'src/app/services/asientos.service';
import { PaseAbordajeService } from 'src/app/services/pase-abordaje.service';

import { SharedService } from 'src/app/services/shared.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Network } from '@capacitor/network';

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
  private selectedAircraftId: string;

  private showStepovers: boolean[];

  private viajes: Viaje[];
  private vuelos: Vuelo[];
  private viajes_vuelos: ViajeVuelo[];
  private vuelos_aeropuertos: VueloAeropuerto[];
  private asientos: Asiento[];
  private paseAbordaje: PaseAbordaje;
  private pasesAbordaje: PaseAbordaje[];

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
  public getSelectedAircraftId(): string {
    return this.selectedAircraftId;
  }
  public setSelectedAircraftId(value: string) {
    this.selectedAircraftId = value;
  }

  public getShowStepovers(): boolean[] {
    return this.showStepovers;
  }
  public setShowStepovers(value: boolean[]) {
    this.showStepovers = value;
  }

  public getViajes(): Viaje[] {
    return this.viajes;
  }

  public getViajesOffline(): Viaje[] {
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
  public getViajes_vuelos(): ViajeVuelo[] {
    return this.viajes_vuelos;
  }
  public setViajes_vuelos(value: ViajeVuelo[]) {
    this.viajes_vuelos = value;
  }
  public getVuelos_aeropuertos(): VueloAeropuerto[] {
    return this.vuelos_aeropuertos;
  }
  public setVuelos_aeropuertos(value: VueloAeropuerto[]) {
    this.vuelos_aeropuertos = value;
  }
  public getAsientos(): Asiento[] {
    return this.asientos;
  }
  public setAsientos(value: Asiento[]) {
    this.asientos = value;
  }
 
  // Component constructor
  constructor(private _formBuilder: FormBuilder, private router: Router, private vuelosService: VuelosService, private viajesService: ViajesService, private viajesVuelosService: ViajesVuelosService, private vuelosAeropuertosService: VuelosAeropuertosService, private asientosService: AsientosService, private paseAbordajeService: PaseAbordajeService, private sharedService: SharedService, private databaseService: DatabaseService) {
    this.selectedTravelId = 0;
    this.ticketsCuantity = this.sharedService.selectedSeatsCuantity;
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

    this.selectedAircraftId = ""

    this.showStepovers = [];

    this.viajes = [];
    this.vuelos = [];
    this.viajes_vuelos = [];
    this.vuelos_aeropuertos = [];
    this.asientos = [];
    this.paseAbordaje = {id: 0, correoCliente: '', checkIn: false, puerta: '', viajeId: 0};
    this.pasesAbordaje = [];
  }

  loadTravels(): void {
    this.viajes = [];

    this.viajesService.getViajes().subscribe({
      next: (viajes) => {
        this.viajes = viajes;
        this.databaseService.addViaje(this.viajes);
        for(let i = 0; i < viajes.length ; i++){
          this.showStepovers.push(false);
        }

        this.viajes = this.sharedService._filterTravelsByOriginDestiny(this.viajes, this.sharedService.searchedOrigin, this.sharedService.searchedDestiny, this.sharedService.formatDate2(this.sharedService.selectedDate.toString()));
      },
      error: (response) => {
        console.log(response);
      }
    })

    
  }


  loadTravelsSQLite(): void {
    this.viajes = [];
    
    var viajestemp = this.databaseService.getViajes()
    this.viajes = viajestemp()
        this.viajes = this.sharedService._filterTravelsByOriginDestiny(this.viajes, this.sharedService.searchedOrigin, this.sharedService.searchedDestiny, this.sharedService.formatDate2(this.sharedService.selectedDate.toString()));
     

  }

  loadFlights(): void {
    var vuelosTmp: Vuelo[] = [];
    this.vuelos = [];
    this.viajes_vuelos = [];
    this.vuelos_aeropuertos = [];

    var vuelos_aeropuertosTmp: VueloAeropuerto[] = [];

    // Load flights from DB
    this.vuelosService.getVuelos().subscribe({
      next: (vuelos) => {
        vuelosTmp = vuelos;
        this.databaseService.addVuelo(vuelosTmp);
        // Load TravelFlights from DB
        this.viajesVuelosService.getViajesVuelos().subscribe({
          next: (viajesVuelos) => {
            this.viajes_vuelos = viajesVuelos;

            // Orders the array viajes_vuelos
            this.viajes_vuelos.sort((a, b) => a.escala - b.escala);

            // Load FlightsAirports from DB
            this.vuelosAeropuertosService.getVuelosAeropuertos().subscribe({
              next: (vuelosAeropuertos) => {

                this.vuelos_aeropuertos = vuelosAeropuertos;

                // Filters flights by searched information
                for(let i = 0; i < vuelosTmp.length; i++){
                  for(let j = 0; j < this.viajes_vuelos.length; j++){
                    var isSearchedTravelFlightMatch = this.viajes.some((travel) => travel.id === this.viajes_vuelos[j].viajeId && vuelosTmp[i].nVuelo === this.viajes_vuelos[j].nVuelo)
                    if(isSearchedTravelFlightMatch){
                      vuelosTmp[i].fechaSalida = this.sharedService.formatDate3(vuelosTmp[i].fechaSalida)
                      vuelosTmp[i].fechaLlegada = this.sharedService.formatDate3(vuelosTmp[i].fechaLlegada)
                      this.vuelos.push(vuelosTmp[i])
                    }
                  }
                }
              
              },
            error: (response) => {
              console.log(response);
            }
          })
          },
          error: (response) => {
            console.log(response);
          }
        })
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  loadTravelFlights(): void {
    
  }

  async ngOnInit(): Promise<void> {


    const status = await Network.getStatus();
    if(status.connected){
    this.loadTravels();
    this.loadFlights();
    this.loadTravelFlights();
    }else{
      this.loadTravelsSQLite;
    }

    
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

    var vuelosTmp: Vuelo[] = [];
    var viajes_vuelosTmp: ViajeVuelo[] = [];

    this.asientos = [];

    this.vuelosService.getVuelos().subscribe({
      next: (vuelos) => {
        vuelosTmp = vuelos;

        this.viajesVuelosService.getViajesVuelos().subscribe({
          next: (viajesVuelos) => {
            viajes_vuelosTmp = viajesVuelos;

            viajes_vuelosTmp.sort((a, b) => a.escala - b.escala);

            var selectedTravelFirstFlight: number = -1;

            for(let i = 0; i < viajes_vuelosTmp.length; i++){
              if(viajes_vuelosTmp[i].viajeId == this.selectedTravelId){
                selectedTravelFirstFlight = viajes_vuelosTmp[i].nVuelo;
                break;
              }
            }

            for(let j = 0; j < vuelosTmp.length; j++){
              if(vuelosTmp[j].nVuelo == selectedTravelFirstFlight){
                this.selectedAircraftId = vuelosTmp[j].avionMatricula;
              }
            }

            var asientosTmp: Asiento[] = []

            this.asientosService.getAsientos().subscribe({
              next: (asientos) => {
                asientosTmp = asientos;

                console.log("Asientos temp: ", asientosTmp)

                for(let k = 0; k < asientosTmp.length; k++){
                  if(asientosTmp[k].avionMatricula == this.selectedAircraftId  && asientosTmp[k].nVuelo == selectedTravelFirstFlight){
                    this.asientos.push(asientosTmp[k])
                  }
                }
            
                console.log("Asientos: ", this.asientos)

              },
              error: (response) => {
                console.log(response);
              }
            })

          },
          error: (response) => {
            console.log(response);
          }
        })
      },
      error: (response) => {
        console.log(response);
      }
    })
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
        const selectedSeat = this.asientos.find((seat) => seat.id === seatId);
        if(selectedSeat){
          selectedSeat.estadoId = 1;
        }else{
          console.log("Error");
        }
      }
      this.leftTickets += 1;
    }else if(this.leftTickets > 0) {
      this.selectedseatsId.push(seatId)
      const selectedSeat = this.asientos.find((seat) => seat.id === seatId);
        if(selectedSeat){
          selectedSeat.estadoId = 0;
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

  reserveFlight(){
    this.paseAbordaje = {id: 0, correoCliente: '', checkIn: false, puerta: '', viajeId: 0};

    // Requests for tickets list
    var pasesAbordajeTmp: PaseAbordaje[] = [];

    this.paseAbordajeService.getPasesAbordaje().subscribe({
      next: (pasesAbordaje) => {
        pasesAbordajeTmp = pasesAbordaje;

        // Updates paseAbordaje attribute with given data
        if(pasesAbordajeTmp.length > 0){
          pasesAbordajeTmp.sort((a, b) => a.id - b.id);

          this.paseAbordaje.id = (pasesAbordajeTmp[pasesAbordajeTmp.length-1].id)+1;
        }else{
          this.paseAbordaje.id = 1;
        }

        this.paseAbordaje.correoCliente = this.passengerEmail;
        this.paseAbordaje.viajeId = this.selectedTravelId;
        this.paseAbordaje.checkIn = false;

        // Generates random gate
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numeros = '0123456789';

        for (let i = 0; i < 6; i++) {
          if(i < 3){
            const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
            this.paseAbordaje.puerta += letraAleatoria;
          }else{
            const numeroAleatorio = numeros[Math.floor(Math.random() * numeros.length)];
            this.paseAbordaje.puerta += numeroAleatorio;
          }
        }

        console.log("Pase de abordaje generado: ", this.paseAbordaje);

        // Posts flight pass        
        this.paseAbordajeService.postPaseAbordaje(this.paseAbordaje).subscribe({
          next: (response) => {
          },
          error: (response) => {
            console.log(response);
            return;
          }
        })

        // Updates seat information on DB
        /* Test
        var asientoTmp: Asiento = {id: 'A1', nVuelo: 1, avionMatricula: 'C1728CR', estadoId: 2};
        this.asientosService.putAsiento('A1', 1, 'C1728CR', asientoTmp).subscribe({
          next: (response) => {
          },
          error: (response) => {
            console.log(response);
            return;
          }
        });
        */

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
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  
  showHideStepOvers(travelIndex: number){
    this.showStepovers[travelIndex] = !this.showStepovers[travelIndex];
  }
  
}
