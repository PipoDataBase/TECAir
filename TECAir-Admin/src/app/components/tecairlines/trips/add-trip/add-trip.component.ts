import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajeVuelo } from 'src/app/models/viaje-vuelo.module';
import { Viaje } from 'src/app/models/viaje.module';
import { Vuelo } from 'src/app/models/vuelo.module';
import { SharedService } from 'src/app/services/shared.service';
import { ViajesVuelosService } from 'src/app/services/viajes-vuelos.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {
  username: string = '';
  vuelos: Vuelo[] = [];
  viajeVuelos: Vuelo[] = [];
  columnHeaders: string[] = ['vueloId', 'origen', 'destino', 'fechaSalida', 'fechaLlegada', 'precio', 'seleccionar'];
  viajeColumnHeaders: string[] = ['vueloId', 'origen', 'destino', 'fechaSalida', 'fechaLlegada', 'precio', 'eliminar'];
  dataSource = new MatTableDataSource(this.vuelos);
  viajeDataSource = new MatTableDataSource(this.viajeVuelos);
  selectedRow: any = null;
  filter: string = '';

  viaje: Viaje = {
    id: 0,
    empleadoUsuario: '',
    origen: '',
    destino: '',
    fechaSalida: '',
    fechaLlegada: '',
    precio: 0,
    viajeVuelos: []
  }

  constructor(private route: ActivatedRoute, private router: Router, private vuelosService: VuelosService, private viajesService: ViajesService, private viajesVuelosService: ViajesVuelosService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })

    // get flights from REST API
    this.vuelosService.getVuelos().subscribe({
      next: (vuelos) => {
        this.vuelos = vuelos;
        this.dataSource = new MatTableDataSource(this.vuelos);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  onFilterChange(newValue: string) {
    this.filter = newValue;
    this.applyFilter();
  }

  applyFilter() {
    const filterValue = this.filter.toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const nVueloMatch = data.nVuelo.toString().includes(filter);
      const aeropuertoMatch = data.vueloAeropuertos.some(a => a.aeropuertoId.toLowerCase().includes(filter));
      return nVueloMatch || aeropuertoMatch;
    };
    this.dataSource.filter = filterValue;
  }

  selectRow(row: any) {
    this.selectedRow = (this.selectedRow === row) ? null : row;
  }

  isSelected(row: any): boolean {
    return this.selectedRow === row;
  }

  // add flight to trip
  addFlight(): void {
    this.dataSource = new MatTableDataSource(this.vuelos);

    if (this.selectedRow) {
      // filter to delete flight from dataSource
      this.dataSource.data = this.dataSource.data.filter(flight => flight.nVuelo !== this.selectedRow.nVuelo);

      // get selected flight
      const flight = this.vuelos.find(flight => flight.nVuelo === this.selectedRow.nVuelo);
      if (flight) {
        // validate selected flight
        var origin = this.sharedService.locationType(flight.vueloAeropuertos, "Origen");
        var destination = this.sharedService.locationType(flight.vueloAeropuertos, "Destino");
        var add = true;
        for (const f of this.viajeVuelos) {
          var o = this.sharedService.locationType(f.vueloAeropuertos, "Origen");
          var d = this.sharedService.locationType(f.vueloAeropuertos, "Destino");
          if (o == origin && d == destination) {
            add = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Escalas con igual ubicación'
            })
          }
        }

        // add flight to trip
        if (add) {
          this.viajeVuelos.push(flight);
          this.viajeDataSource = new MatTableDataSource(this.viajeVuelos);

          // filter to now select the correct origin and destination according to the scales
          var airportId = this.sharedService.locationType(flight.vueloAeropuertos, "Destino");
          this.onFilterChange(airportId);
        }
        else {
          if (this.viajeVuelos.length > 0) {
            const lastIndex = this.viajeVuelos.length - 1;
            const flight = this.viajeVuelos[lastIndex];

            // filter to now select the correct origin and destination according to the scales
            var airportId = this.sharedService.locationType(flight.vueloAeropuertos, "Destino");
            this.onFilterChange(airportId);
          }
        }
      }
      this.selectedRow = null;
    }
    else {
      if (this.viajeVuelos.length > 0) {
        const lastIndex = this.viajeVuelos.length - 1;
        const flight = this.viajeVuelos[lastIndex];

        // filter to now select the correct origin and destination according to the scales
        var airportId = this.sharedService.locationType(flight.vueloAeropuertos, "Destino");
        this.onFilterChange(airportId);
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado ningún vuelo'
      })
    }
  }

  // delete flight from trip
  deleteFlight(id: number): void {
    const flight = this.viajeVuelos.find(vuelo => vuelo.nVuelo === id);
    if (flight) {
      const index = this.viajeVuelos.indexOf(flight);
      const lastIndex = this.viajeVuelos.length - 1;

      // validate that it is not an intermediate scale
      if (index == 0 || index == lastIndex) {
        this.viajeVuelos.splice(index, 1);
        this.viajeDataSource = new MatTableDataSource(this.viajeVuelos);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se puede eliminar una escala intermedia'
        })
      }
    }

    if (this.viajeVuelos.length == 0) {
      this.dataSource = new MatTableDataSource(this.vuelos);
    }
  }

  // restart view
  restart(): void {
    this.selectedRow = null;
    this.viajeVuelos = [];
    this.viajeDataSource = new MatTableDataSource(this.viajeVuelos);
    this.dataSource = new MatTableDataSource(this.vuelos);
    this.filter = ''
  }

  // add new trip
  addTrip() {
    if (this.viajeVuelos.length > 0) {
      this.viaje.empleadoUsuario = this.username;

      const lastIndex = this.viajeVuelos.length - 1;
      this.viaje.fechaSalida = this.viajeVuelos[0].fechaSalida;
      this.viaje.fechaLlegada = this.viajeVuelos[lastIndex].fechaLlegada;
      this.viaje.fechaSalida = this.viaje.fechaSalida.replace('Z', '+00:00');
      this.viaje.fechaLlegada = this.viaje.fechaLlegada.replace('Z', '+00:00');

      // validate scales
      for (let i = 0; i < this.viajeVuelos.length - 1; i++) {
        const flight = this.viajeVuelos[i];
        const nextFlight = this.viajeVuelos[i + 1];

        var destination = this.sharedService.locationType(flight.vueloAeropuertos, "Destino");
        var origin = this.sharedService.locationType(nextFlight.vueloAeropuertos, "Origen");

        if (destination != origin) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Discontinuidad en escalas'
          })
          return;
        }
      }

      // add origin and destination
      this.viaje.origen = this.sharedService.locationType(this.viajeVuelos[0].vueloAeropuertos, "Origen");
      this.viaje.destino = this.sharedService.locationType(this.viajeVuelos[lastIndex].vueloAeropuertos, "Destino");

      // add total price
      var price = 0;
      for (const vv of this.viajeVuelos) {
        price += vv.precio;
      }
      this.viaje.precio = price;

      // add trip to database
      this.viajesService.postViaje(this.viaje).subscribe({
        next: (id) => {
          for (const flight of this.viajeVuelos) {
            const index = this.viajeVuelos.indexOf(flight) + 1;
            var viajeVuelo: ViajeVuelo = {
              viajeId: id,
              nVuelo: flight.nVuelo,
              escala: index
            }

            this.viajesVuelosService.postViajeVuelo(viajeVuelo).subscribe({
              next: (response) => {
              },
              error: (response) => {
                console.log(response);
              }
            })
          }
        },
        error: (response) => {
          console.log(response);
        }
      })

      // trip successfully added
      Swal.fire({
        icon: 'success',
        title: 'Viaje agregado!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(["tecair-admin", this.username, "trips"]);
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado ningún vuelo'
      })
    }
  }

  // return to trips view
  back(): void {
    this.router.navigate(["tecair-admin", this.username, "trips"]);
  }
}
