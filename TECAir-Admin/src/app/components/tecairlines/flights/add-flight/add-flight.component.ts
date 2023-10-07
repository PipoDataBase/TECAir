import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Aeropuerto } from 'src/app/models/aeropuerto.module';
import { Avion } from 'src/app/models/avion.module';
import { Vuelo } from 'src/app/models/vuelo.module';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { AvionesService } from 'src/app/services/aviones.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { VueloAeropuerto } from 'src/app/models/vuelo-aeropuerto.module';
import { VuelosAeropuertosService } from 'src/app/services/vuelos-aeropuertos.service';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent {
  username: string = '';
  selectedPlate: string = '';

  airportForm = this._formBuilder.group({
    originAirportGroup: '',
    destinationAirportGroup: ''
  });
  aeropuertos: Aeropuerto[] = [];
  airportOptions1: Observable<Aeropuerto[]> | undefined;
  airportOptions2: Observable<Aeropuerto[]> | undefined;

  departureDate: string = '';
  arrivalDate: string = '';

  aviones: Avion[] = [];

  vuelo: Vuelo = {
    nVuelo: 0,
    empleadoUsuario: '',
    avionMatricula: '',
    fechaSalida: '',
    fechaLlegada: '',
    estado: true,
    precio: 0,
    vueloAeropuertos: []
  }

  origen: VueloAeropuerto = {
    aeropuertoId: '',
    vueloNumero: 0,
    tipo: 'Origen'
  }

  destino: VueloAeropuerto = {
    aeropuertoId: '',
    vueloNumero: 0,
    tipo: 'Destino'
  }

  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder, private router: Router, private avionesService: AvionesService, private aeropuertosService: AeropuertosService, private vuelosService: VuelosService, private vuelosAeropuertosService: VuelosAeropuertosService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })

    // get planes from REST API
    this.avionesService.getAviones().subscribe({
      next: (aviones) => {
        this.aviones = aviones;
      },
      error: (response) => {
        console.log(response);
      }
    })

    // get airports from REST API
    this.aeropuertosService.getAeropuertos().subscribe({
      next: (aeropuertos) => {
        this.aeropuertos = aeropuertos;
      },
      error: (response) => {
        console.log(response);
      }
    })

    // observable of airport filter
    this.airportOptions1 = this.airportForm.get('originAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sharedService._filterAirports(this.aeropuertos, value || '')),
    );

    this.airportOptions2 = this.airportForm.get('destinationAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sharedService._filterAirports(this.aeropuertos, value || '')),
    );
  }

  // add new flight
  addFlight() {
    this.vuelo.empleadoUsuario = this.username;

    // validate plate of plane
    if (!this.selectedPlate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado un avión'
      })
      return;
    }
    this.vuelo.avionMatricula = this.selectedPlate;

    // validate origin and destination of flight
    var origin = this.airportForm.get('originAirportGroup')?.value;
    var destination = this.airportForm.get('destinationAirportGroup')?.value;
    if (origin && destination) {
      origin = this.sharedService.getCode(origin);
      destination = this.sharedService.getCode(destination);
      if (!origin || !destination) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Origen o destino incorrecto'
        })
        return;
      }
    }

    // validate flight departure and arrival date
    if (this.departureDate && this.arrivalDate) {
      var date1 = new Date(this.departureDate);
      var date2 = new Date(this.arrivalDate);
      if (date1 < date2) {
        var offset1 = date1.getTimezoneOffset();
        var offset2 = date2.getTimezoneOffset();
        date1.setMinutes(date1.getMinutes() - offset1);
        date2.setMinutes(date2.getMinutes() - offset2);
        this.vuelo.fechaSalida = date1.toISOString().replace('Z', '+00:00');
        this.vuelo.fechaLlegada = date2.toISOString().replace('Z', '+00:00');
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fechas incorrectas'
        })
        return;
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formato de fecha incorrecto'
      })
      return;
    }

    // validate flight price
    if (this.vuelo.precio <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Precio del vuelo incorrecto'
      })
      return;
    }

    // add flight to database
    this.vuelosService.postVuelo(this.vuelo).subscribe({
      next: (nVuelo) => {
        if (origin && destination && nVuelo >= 1) {
          this.origen.vueloNumero = nVuelo;
          this.origen.aeropuertoId = origin;
          this.vuelosAeropuertosService.postVueloAeropuerto(this.origen).subscribe({
            next: (response) => {
            },
            error: (response) => {
              console.log(response);
            }
          })

          this.destino.vueloNumero = nVuelo;
          this.destino.aeropuertoId = destination;
          this.vuelosAeropuertosService.postVueloAeropuerto(this.destino).subscribe({
            next: (response) => {
            },
            error: (response) => {
              console.log(response);
            }
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error, intenta de nuevo',
          })
        }
      },
      error: (response) => {
        console.log(response);
      }
    })

    // flight successfully added
    Swal.fire({
      icon: 'success',
      title: 'Vuelo agregado!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.router.navigate(["tecair-admin", this.username, "flights"]);
    });
  }

  // return to flights view
  back(): void {
    this.router.navigate(["tecair-admin", this.username, "flights"]);
  }
}
