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
import { Cliente } from 'src/app/models/cliente.module';

import { ViajesService } from 'src/app/services/viajes.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { ViajesVuelosService } from 'src/app/services/viajes-vuelos.service';
import { VuelosAeropuertosService } from 'src/app/services/vuelos-aeropuertos.service';
import { AsientosService } from 'src/app/services/asientos.service';
import { PaseAbordajeService } from 'src/app/services/pase-abordaje.service';
import { ClientesService } from 'src/app/services/clientes.service';

import { SharedService } from 'src/app/services/shared.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

//import { PDFComponent } from '../pdf/pdf.component';

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
  private isOnline: boolean = false;

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
  constructor(private _formBuilder: FormBuilder, private router: Router, private vuelosService: VuelosService, private viajesService: ViajesService, private viajesVuelosService: ViajesVuelosService, private vuelosAeropuertosService: VuelosAeropuertosService, private asientosService: AsientosService, private paseAbordajeService: PaseAbordajeService, private clientesService: ClientesService, private sharedService: SharedService, private databaseService: DatabaseService) {
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

  loadOnlineTravels(){

    this.viajes = [];

    this.viajesService.getViajes().subscribe({
      next: (viajes) => {
        this.viajes = viajes;
        //this.databaseService.addViaje(this.viajes);
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

  async loadOfflineTravels(){

    this.viajes = [];
    var viajesTemp = this.databaseService.getViajes();
    this.viajes = viajesTemp();
    this.viajes = this.sharedService._filterTravelsByOriginDestiny(this.viajes, this.sharedService.searchedOrigin, this.sharedService.searchedDestiny, this.sharedService.formatDate2(this.sharedService.selectedDate.toString()));
    
  }

  loadTravels(): void {
    
    if (this.isOnline) {
      this.loadOnlineTravels();
    } else if (this.isAndroid() && !this.isOnline) {
      this.loadOfflineTravels();
    }
    
  }

  // eliminar
  loadTravelsSQLite(): void {
    this.viajes = [];
    
    var viajestemp = this.databaseService.getViajes()
    this.viajes = viajestemp()
        this.viajes = this.sharedService._filterTravelsByOriginDestiny(this.viajes, this.sharedService.searchedOrigin, this.sharedService.searchedDestiny, this.sharedService.formatDate2(this.sharedService.selectedDate.toString()));
  }

  loadOfflineFlights(){
    var vuelosTmp: Vuelo[] = [];
    this.vuelos = [];
    this.viajes_vuelos = [];
    this.vuelos_aeropuertos = [];
    var vuelos_aeropuertosTmp: VueloAeropuerto[] = [];

    // load data from slqite
    var vuelosTemp = this.databaseService.getVuelos();
    vuelosTmp = vuelosTemp();
    var viajesVuelosTemp = this.databaseService.getViajesVuelos();
    this.viajes_vuelos = viajesVuelosTemp();

    // Orders the array viajes_vuelos
    this.viajes_vuelos.sort((a, b) => a.escala - b.escala);

    var vuelosAeropuertosTemp = this.databaseService.getVuelosAeropuertos();
    this.vuelos_aeropuertos = vuelosAeropuertosTemp();

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
  }

  loadOnlineFlights(){
    var vuelosTmp: Vuelo[] = [];
    this.vuelos = [];
    this.viajes_vuelos = [];
    this.vuelos_aeropuertos = [];

    var vuelos_aeropuertosTmp: VueloAeropuerto[] = [];

    // Load flights from DB
    this.vuelosService.getVuelos().subscribe({
      next: (vuelos) => {
        vuelosTmp = vuelos;
        //this.databaseService.addVuelo(vuelosTmp);
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

  loadFlights(): void {
    //
  }

  loadTravelFlights(): void {
    
  }

    // Is called when the program is initialized and when the internet connection is connected or disconected
  // If isOnline, loads api data
  async checkNetworkStatus() {

    if (this.isOnline) {
      console.log('Connected to the internet');
      this.loadOnlineTravels(); // Loads data from API
      this.loadOnlineFlights();
      this.loadTravelFlights();
    }
    else {
      console.log('No internet connection');
      if (this.isAndroid()) {
        this.loadOfflineTravels(); 
        this.loadOfflineFlights();
      }
    }

  }

  // Initializes an observer that checks if the internet connection have changed (connected or disconected)
  // Calls for functions to act depending on the connection change and the device running (mobile or web)
  initNetworkObserver() {

    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.checkNetworkStatus();
    });

  }

  ngOnInit() {

    //const status = await Network.getStatus();

    this.viajes = [];
    this.vuelos = [];
    this.viajes_vuelos = [];
    this.vuelos_aeropuertos = [];
    this.initNetworkObserver();
    this.chekNetworkConnection();
    this.checkNetworkStatus();
/*


    if(status.connected){
      this.loadTravels();
      this.loadFlights();
      this.loadTravelFlights();
    }else{
      this.loadTravelsSQLite;
    }
*/
  }
  
  // Linear Mat-Stepper conditions
  
  // Desktop
  travelInformationStepD = this._formBuilder.group({
    passengerNameInputD: ['', Validators.required],
    passengerLastName1InputD: ['', Validators.required],
    passengerLastName2InputD: ['', Validators.required],
    passengerEmailInputD: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    passengerTelephoneInputD: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
  });

  paymentInformationStepD = this._formBuilder.group({
    passengerCreditCardNumberInputD: ['', Validators.required],
    passengerCardExpirationdateInputD: [
      '',
      [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(20[2-9]\d|[3-9]\d{3,})$/)],
    ],
    passengerCardCVVInputD: ['', Validators.required],
  });

  // Mobile
  travelInformationStepM = this._formBuilder.group({
    passengerNameInputM: ['', Validators.required],
    passengerLastName1InputM: ['', Validators.required],
    passengerLastName2InputM: ['', Validators.required],
    passengerEmailInputM: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    passengerTelephoneInputM: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
  });
  paymentInformationStepM = this._formBuilder.group({
    passengerCreditCardNumberInputM: ['', Validators.required],
    passengerCardExpirationdateInputM: [
      '',
      [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(20[2-9]\d|[3-9]\d{3,})$/)],
    ],
    passengerCardCVVInputM: ['', Validators.required],
  });

  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]);


  offlineSelectFlight(selectedTravelId: number){

    console.log("offlineSelectFlight");

    this.selectedTravelId = selectedTravelId;
    var vuelosTmp: Vuelo[] = [];
    var viajes_vuelosTmp: ViajeVuelo[] = [];
    this.asientos = [];

    var vuelosTemp = this.databaseService.getVuelos();
    vuelosTmp = vuelosTemp();

    var viajesVuelosTemp = this.databaseService.getViajesVuelos();
    viajes_vuelosTmp = viajesVuelosTemp();

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

    var asientosTmp: Asiento[] = [];

    var asientosTemp = this.databaseService.getAsientos();
    asientosTmp = asientosTemp();
    console.log("cantidad asientos: ", asientosTemp.length);

    for(let k = 0; k < asientosTmp.length; k++){
      if(asientosTmp[k].avionMatricula == this.selectedAircraftId  && asientosTmp[k].nVuelo == selectedTravelFirstFlight){
        console.log(asientosTmp[k]);
        this.asientos.push(asientosTmp[k]);
      }
    }

    this.asientos.sort((a, b) => a.id.localeCompare(b.id))

  }

  onlineSelectFlight(selectedTravelId: number){

    console.log("onlineSelectFlight");

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

                for(let k = 0; k < asientosTmp.length; k++){
                  if(asientosTmp[k].avionMatricula == this.selectedAircraftId  && asientosTmp[k].nVuelo == selectedTravelFirstFlight){
                    this.asientos.push(asientosTmp[k])
                  }
                }

                this.asientos.sort((a, b) => a.id.localeCompare(b.id))

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


  // Function for select flight button (first step of stepper)
  selectFlight(selectedTravelId: number){
    console.log("selectFlight");
    if (this.isOnline) {
      this.onlineSelectFlight(selectedTravelId);
    } else if (this.isAndroid() && !this.isOnline){
      this.offlineSelectFlight(selectedTravelId);
    }
  }

  offlineUpdatePersonalInformationD(){

    this.passengerName = String(this.travelInformationStepD.get('passengerNameInputD')?.value);
    this.passengerLastName1 = String(this.travelInformationStepD.get('passengerLastName1InputD')?.value);
    this.passengerLastName2 = String(this.travelInformationStepD.get('passengerLastName2InputD')?.value);

    // Checks valid Email
    var clientesTemp = this.databaseService.getClientes();
    var clientes = clientesTemp();
    for(let i = 0; i < clientes.length; i++){
      if(clientes[i].correo == String(this.travelInformationStepD.get('passengerEmailInputD')?.value)){
        this.passengerEmail = String(this.travelInformationStepD.get('passengerEmailInputD')?.value);
      }else{
        Swal.fire(
          'Cliente no encontrado',
          'Inicie sesión o digite un correo electrónico válido',
          'question'
        );
        return;
      }
    }
    this.passengerTelephone = String(this.travelInformationStepD.get('passengerTelephoneInputD')?.value);
  }
  
  onlineUpdatePersonalInformationD(){

    this.passengerName = String(this.travelInformationStepD.get('passengerNameInputD')?.value);
    this.passengerLastName1 = String(this.travelInformationStepD.get('passengerLastName1InputD')?.value);
    this.passengerLastName2 = String(this.travelInformationStepD.get('passengerLastName2InputD')?.value);

    // Checks valid Email
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {

        for(let i = 0; i < clientes.length; i++){
          if(clientes[i].correo == String(this.travelInformationStepD.get('passengerEmailInputD')?.value)){
            this.passengerEmail = String(this.travelInformationStepD.get('passengerEmailInputD')?.value);
          }else{
            Swal.fire(
              'Cliente no encontrado',
              'Inicie sesión o digite un correo electrónico válido',
              'question'
            );
            return;
          }
        }
      },
      error: (response) => {
        console.log(response);
      }
    })
    
    this.passengerTelephone = String(this.travelInformationStepD.get('passengerTelephoneInputD')?.value);
  }

  // Function for personal information update button on desktop (second step of desktop stepper)
  updatePersonalInformationD(){
    if (this.isOnline) {
      this.onlineUpdatePersonalInformationD();
    } else {
      this.offlineUpdatePersonalInformationD();
    }
  }

  // Function for personal information update button on mobile (second step of mobile stepper)
  updatePersonalInformationM(){
    this.passengerName = String(this.travelInformationStepM.get('passengerNameInputM')?.value);
    this.passengerLastName1 = String(this.travelInformationStepM.get('passengerLastName1InputM')?.value);
    this.passengerLastName2 = String(this.travelInformationStepM.get('passengerLastName2InputM')?.value);
    
    // Checks valid Email
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {

        for(let i = 0; i < clientes.length; i++){
          if(clientes[i].correo == String(this.travelInformationStepM.get('passengerEmailInputD')?.value)){
            this.passengerEmail = String(this.travelInformationStepM.get('passengerEmailInputD')?.value);
          }else{
            Swal.fire(
              'Cliente no encontrado',
              'Inicie sesión o digite un correo electrónico válido',
              'question'
            );
            return;
          }
        }
      },
      error: (response) => {
        console.log(response);
      }
    })

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
    }
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

        // Posts flight pass        
        this.paseAbordajeService.postPaseAbordaje(this.paseAbordaje).subscribe({
          next: (response) => {

            // Updates seat information on DB
        
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

                    var asientoTmp: Asiento;

                    for(let i = 0; i < this.selectedseatsId.length; i++){
                      asientoTmp = {id: this.selectedseatsId[i], nVuelo: selectedTravelFirstFlight, avionMatricula: this.selectedAircraftId, estadoId: 2}
                      this.asientosService.putAsiento(asientoTmp.id, asientoTmp.nVuelo, asientoTmp.avionMatricula, asientoTmp).subscribe({
                        next: (response) => {
                        },
                        error: (response) => {
                          console.log(response);
                          return;
                        }
                      });
                    }

                    if(this.paymentInformationStepD.valid || this.paymentInformationStepM.valid){
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Viaje reservado!',
                        showConfirmButton: false,
                        timer: 2000,
                      }).then(() => {
                        this.router.navigate(["tecair"]);
                      });
                      

                      const elementoEncontrado = vuelos.find(vuelo => vuelo.nVuelo === selectedTravelFirstFlight);

                        if (elementoEncontrado) {
                          this.sharedService.createBookingPDF(this.paseAbordaje, this.passengerName, this.passengerLastName1.toString(), this.passengerLastName2, this.passengerTelephone, this.selectedseatsId, elementoEncontrado.fechaSalida);

                            //console.log(elementoEncontrado);
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
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'Por favor, revise la información e intentelo de nuevo'
            })
            return;
          }
        })
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  
  showHideStepOvers(travelIndex: number){
    this.showStepovers[travelIndex] = !this.showStepovers[travelIndex];
  }


  // verifies if the application is running on a mobile device
  isAndroid() {
    return (Capacitor.getPlatform() === 'android');
  }

  // returns true if is Online, false if is Offline  
  async chekNetworkConnection() {

    const status = await Network.getStatus();

    if (status.connected) {
      console.log('Connected to the internet');
      this.isOnline = true;
    }
    else {
      console.log('No internet connection');
      this.isOnline = false;
    }

  }
  
}
