import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Aeropuerto } from 'src/app/models/aeropuerto.module';
import { Promocion } from 'src/app/models/promocion.module';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { PromocionesService } from 'src/app/services/promociones.service';
import { SharedService } from 'src/app/services/shared.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Profile } from 'src/app/models/profile.module';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';
import { OfflineChange } from 'src/app/models/offlineChange.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isMobile: boolean;
  panelOpenState = false;
  aeropuertos: Aeropuerto[] = [];

  ClientesArray: Profile[] = []; // SQLite
  Clientes = this.database.getClientes(); // SQLite
  newClienteCorreo = ''; // SQLite
  newClienteTelefono = 0; // SQLite
  isOnline: boolean = false; // SQLite


  images = [
    '../../../assets/img1.jpg',
    '../../../assets/img2.jpg',
    '../../../assets/img3.jpg',
  ];
  mobileimages = [
    '../../../assets/mobile-img1.jpg',
    '../../../assets/mobile-img2.jpg',
    '../../../assets/mobile-img3.jpg',
  ]

  currentImage = 0;
  currentMobileImage = 0;

  airportForm = this._formBuilder.group({
    originAirportGroup: '',
    destinationAirportGroup: '',
    departureDate: '',
    passengers: 1
  });

  promociones: Promocion[] = [];

  airportOptions1: Observable<Aeropuerto[]> | undefined;
  airportOptions2: Observable<Aeropuerto[]> | undefined;

  constructor(private renderer: Renderer2, private _formBuilder: FormBuilder, private router: Router, private aeropuertosService: AeropuertosService, private promocionesService: PromocionesService, public sharedService: SharedService, private database: DatabaseService) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });

  }

  async uploadOfflineChange(offlineChange: OfflineChange) {
    console.log("UPLOADER");
    if (offlineChange.tableName == "Cliente") {
      this.database.getCliente(offlineChange.changeId);
    }
  }


  // Updload to the API the changes done in offline mode
  handleOfflineChanges() {
    console.log("HANDLER Offline");
    if (this.isAndroid()) {
      var offlineChanges: OfflineChange[] = [];
      var changesTemp = this.database.getOfflineChanges();
      offlineChanges = changesTemp();
      this.uploadOfflineChange(offlineChanges[(offlineChanges.length - 1)]); //COMENTAR
      /*
      while ( 0 < offlineChanges.length ) {
        this.uploadOfflineChange(offlineChanges[(offlineChanges.length-1)]);
        offlineChanges.pop();
      }
      */
    }
  }


  // Create a Cliente in SQLite database
  async createCliente() {
    await this.database.addCliente(this.newClienteCorreo, this.newClienteTelefono);
    this.getClientesArray();
    if (!this.isOnline && this.isAndroid()) {
      await this.database.addOfflineChange('Cliente', this.newClienteCorreo);
    }
    this.newClienteCorreo = '';
    this.newClienteTelefono = 0;
  }

  // sets the variable correo with the string in the input panel (for SQLite)
  setCorreo(correo: string) {
    this.newClienteCorreo = correo;
  }
  // sets the variable telefono with the string in the input panel (for SQLite)
  setTelefono(telefono: string) {
    var NumTelefono = Number(telefono);
    this.newClienteTelefono = NumTelefono;
  }

  // Gets the clientes from sqlite database and update the showing list in html
  getClientesArray() {
    var clientesTemp = this.database.getClientes();
    this.ClientesArray = clientesTemp();
  }

  // loads the aeropuertos from sqlite
  async getSQLiteAeropuertos() {
    var aeropuertosTemp = await this.database.getAeropuertos();
    this.aeropuertos = aeropuertosTemp();
  }

  // Create several aeropuertos en SQLite con los datos del api
  async addAeros() {
    await this.database.addAeropuertos(this.aeropuertos); // Prueba
  }

  // Chooses the protocol according with the device where is running the program
  deviceProtocol() {

    if (this.isAndroid() && this.isOnline) {
      this.addAeros();
      this.handleOfflineChanges();
    }
    else if (this.isAndroid() && !this.isOnline) {
      this.getClientesArray();
      this.getSQLiteAeropuertos();
      this.offlineAutofill();
    }
    // There are no specific protocols for web because it only matters if it is connected to internet or not

  }

  // verifies if the application is running on a mobile device
  isAndroid() {
    return (Capacitor.getPlatform() === 'android');
  }


  async offlineAutofill() {

    var aeropuertosTemp = await this.database.getAeropuertos();
    this.aeropuertos = aeropuertosTemp();

    this.airportOptions1 = this.airportForm.get('originAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sharedService._filterAirports(this.aeropuertos, value || '')),
    );

    this.airportOptions2 = this.airportForm.get('destinationAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sharedService._filterAirports(this.aeropuertos, value || '')),
    );

    this.promocionesService.getNPromociones(4).subscribe({
      next: (promociones) => {
        this.promociones = promociones;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }


  // excecutes procedure for an onnline web or mobile app
  onlineInit() {

    this.aeropuertosService.getAeropuertos().subscribe({
      next: (aeropuertos) => {
        this.aeropuertos = aeropuertos;
      },
      error: (response) => {
        console.log(response);
      }
    })

    this.airportOptions1 = this.airportForm.get('originAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sharedService._filterAirports(this.aeropuertos, value || '')),
    );

    this.airportOptions2 = this.airportForm.get('destinationAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sharedService._filterAirports(this.aeropuertos, value || '')),
    );

    this.promocionesService.getNPromociones(4).subscribe({
      next: (promociones) => {
        this.promociones = promociones;
      },
      error: (response) => {
        console.log(response);
      }
    })

  }

  // Is called when the program is initialized and when the internet connection is connected or disconected
  // If isOnline, loads api data
  async checkNetworkStatus() {

    const status = await Network.getStatus();

    if (status.connected) {
      console.log('Connected to the internet');
      this.isOnline = true;
      this.onlineInit(); // Loads data from API
    }
    else {
      console.log('No internet connection');
      this.isOnline = false;
      if (this.isAndroid()) {
        this.offlineAutofill(); 
      }
    }

  }

  // Initializes an observer that checks if the internet connection have changed (connected or disconected)
  // Calls for functions to act depending on the connection change and the device running (mobile or web)
  initNetworkObserver() {

    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.checkNetworkStatus();
      this.deviceProtocol();
    });

  }

  // This function is excecuted when this component is called
  ngOnInit() {

    this.initNetworkObserver();
    this.deviceProtocol();
    this.checkNetworkStatus();

  }

  changeImage(direction: number) {
    if (this.isMobile) {
      this.currentMobileImage += direction;

      if (this.currentMobileImage < 0) {
        this.currentMobileImage = this.mobileimages.length - 1;
      } else if (this.currentMobileImage >= this.mobileimages.length) {
        this.currentMobileImage = 0;
      }

      const newPath = this.mobileimages[this.currentMobileImage];
      const imgElement = document.getElementById('image') as HTMLImageElement;

      this.renderer.setAttribute(imgElement, 'src', newPath);
    }
    else {
      this.currentImage += direction;

      if (this.currentImage < 0) {
        this.currentImage = this.images.length - 1;
      } else if (this.currentImage >= this.images.length) {
        this.currentImage = 0;
      }

      const newPath = this.images[this.currentImage];
      const imgElement = document.getElementById('image') as HTMLImageElement;

      this.renderer.setAttribute(imgElement, 'src', newPath);
    }
  }

  searchFlights(): void {
    const searchedOrigin = this.airportForm.get('originAirportGroup')?.value;
    if (searchedOrigin == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado el origen del vuelo'
      })
      return;
    }

    const searchedDestiny = this.airportForm.get('destinationAirportGroup')?.value;
    if (searchedDestiny == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado el destino del vuelo'
      })
      return;
    }

    const selectedDate = this.airportForm.get('departureDate')?.value;
    if (selectedDate == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado la fecha de salida'
      })
      return;
    }

    const selectedSeatsCuantity = this.airportForm.get('passengers')?.value;
    if (selectedSeatsCuantity <= 0 || selectedSeatsCuantity >= 10) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Número de pasajeros incorrecto. Seleccione [1 - 9]'
      })
      return;
    }

    if (this.sharedService.getCode(searchedOrigin) == '' || this.sharedService.getCode(searchedDestiny) == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Código IATA incorrecto'
      })
      return;
    }

    this.sharedService.searchedOrigin = this.sharedService.getCode(searchedOrigin);
    this.sharedService.searchedDestiny = this.sharedService.getCode(searchedDestiny);
    this.sharedService.selectedDate = selectedDate;
    this.sharedService.selectedSeatsCuantity = selectedSeatsCuantity;

    this.router.navigate(["tecair", "book-flight"]);
  }

  onCardClick(promotion: any): void {
    this.sharedService.searchedOrigin = promotion.viaje.origen;
    this.sharedService.searchedDestiny = promotion.viaje.destino;
    this.sharedService.selectedDate = promotion.viaje.fechaSalida;
    this.sharedService.selectedSeatsCuantity = 1;

    this.router.navigate(["tecair", "book-flight"]);
  }

  more_promotions() {
    this.router.navigate(["tecair", "promotions"]);
  }
}
