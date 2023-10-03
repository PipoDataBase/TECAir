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

export const _filter = (opt: Aeropuerto[], value: string): Aeropuerto[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item =>
    item.ubicacion.toLowerCase().includes(filterValue) ||
    item.id.toLowerCase().includes(filterValue) ||
    item.nombre.toLowerCase().includes(filterValue)
  );
};

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent {
  regex = /\((.*?)\)/;
  username: string = '';
  selectedPlate: string = '';

  airportForm = this._formBuilder.group({
    originAirportGroup: '',
    destinationAirportGroup: ''
  });
  aeropuertos: Aeropuerto[] = [];
  airportOptions1: Observable<Aeropuerto[]> | undefined;
  airportOptions2: Observable<Aeropuerto[]> | undefined;

  fechaSalida: string = '';
  fechaLlegada: string = '';

  aviones: Avion[] = [];

  vuelo: Vuelo = {
    nVuelo: 0,
    empleadoUsuario: '',
    avionMatricula: '',
    fechaSalida: '',
    fechaLlegada: '',
    estado: true,
    precio: 0
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

  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder, private router: Router, private avionesService: AvionesService, private aeropuertosService: AeropuertosService, private vuelosService: VuelosService, private vuelosAeropuertosService: VuelosAeropuertosService) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })

    this.avionesService.getAviones().subscribe({
      next: (aviones) => {
        this.aviones = aviones;
      },
      error: (response) => {
        console.log(response);
      }
    })

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
      map(value => this._filterAirports(value || '')),
    );

    this.airportOptions2 = this.airportForm.get('destinationAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAirports(value || '')),
    );
  }

  private _filterAirports(value: string): Aeropuerto[] {
    if (value && typeof value === 'string') {
      return _filter(this.aeropuertos, value);
    }
    return this.aeropuertos;
  }

  addFlight() {
    this.vuelo.empleadoUsuario = this.username;
    this.vuelo.avionMatricula = this.selectedPlate;

    var origen = this.airportForm.get('originAirportGroup')?.value;
    var destino = this.airportForm.get('destinationAirportGroup')?.value;
    if (origen && destino) {
      origen = this.getCode(origen);
      destino = this.getCode(destino);
      if (origen && destino) { }
    }

    var date1 = new Date(this.fechaSalida);
    var date2 = new Date(this.fechaLlegada);
    var offset1 = date1.getTimezoneOffset();
    var offset2 = date2.getTimezoneOffset();
    date1.setMinutes(date1.getMinutes() - offset1);
    date2.setMinutes(date2.getMinutes() - offset2);
    this.vuelo.fechaSalida = date1.toISOString().replace('Z', '+00:00');
    this.vuelo.fechaLlegada = date2.toISOString().replace('Z', '+00:00');

    if (this.vuelo.empleadoUsuario && this.vuelo.avionMatricula && origen != '' && destino != '' && this.vuelo.fechaSalida && this.vuelo.fechaLlegada && this.vuelo.precio >= 1) {
      this.vuelosService.postVuelo(this.vuelo).subscribe({
        next: (nVuelo) => {
          if (origen && destino && nVuelo >= 1) {
            this.origen.vueloNumero = nVuelo;
            this.origen.aeropuertoId = origen;
            this.vuelosAeropuertosService.postVueloAeropuerto(this.origen).subscribe({
              next: (response) => {
                console.log(response);
              },
              error: (response) => {
                console.log(response);
              }
            })
      
            this.destino.vueloNumero = nVuelo;
            this.destino.aeropuertoId = destino;
            this.vuelosAeropuertosService.postVueloAeropuerto(this.destino).subscribe({
              next: (response) => {
                console.log(response);
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
              text: 'Algo salió mal!',
            })
          }
        },
        error: (response) => {
          console.log(response);
        }
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Vuelo agregado!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(["tecair-admin", this.username, "flights"]);
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
      })
    }
  }

  private getCode(value: string): string {
    const match = value.match(this.regex);
    if (match) {
      return match[1];
    }
    else {
      return "";
    }
  }

  back(): void {
    this.router.navigate(["tecair-admin", this.username, "flights"]);
  }
}
