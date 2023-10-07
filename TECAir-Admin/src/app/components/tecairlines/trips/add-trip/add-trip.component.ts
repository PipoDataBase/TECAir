import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajeVuelo } from 'src/app/models/viaje-vuelo.module';
import { Viaje } from 'src/app/models/viaje.module';
import { VueloAeropuerto } from 'src/app/models/vuelo-aeropuerto.module';
import { Vuelo } from 'src/app/models/vuelo.module';
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
  columnHeaders: string[] = ['nVuelo', 'origen', 'destino', 'fechaSalida', 'fechaLlegada', 'seleccionar'];
  viajeColumnHeaders: string[] = ['nVuelo', 'origen', 'destino', 'fechaSalida', 'fechaLlegada', 'eliminar'];
  dataSource = new MatTableDataSource(this.vuelos);
  viajeDataSource = new MatTableDataSource(this.viajeVuelos);
  selectedRow: any = null;

  viaje: Viaje = {
    id: 0,
    empleadoUsuario: '',
    fechaSalida: '',
    fechaLlegada: '',
  }

  constructor(private route: ActivatedRoute, private router: Router, private vuelosService: VuelosService, private viajesService: ViajesService, private viajesVuelosService: ViajesVuelosService) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
          console.log(this.username);
        }
      }
    })

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const nVueloMatch = data.nVuelo.toString().includes(filter);
      const aeropuertoMatch = data.vueloAeropuertos.some(a => a.aeropuertoId.toLowerCase().includes(filter));
      return nVueloMatch || aeropuertoMatch;
    };
    this.dataSource.filter = filterValue;
  }

  locationType(va: VueloAeropuerto[], tipo: string): string {
    if (va[0].tipo == tipo) {
      return va[0].aeropuertoId;
    }
    else if (va[1].tipo == tipo) {
      return va[1].aeropuertoId;
    }
    return "";
  }

  selectRow(row: any) {
    this.selectedRow = (this.selectedRow === row) ? null : row;
  }

  isSelected(row: any): boolean {
    return this.selectedRow === row;
  }

  addFlight(): void {
    this.dataSource = new MatTableDataSource(this.vuelos);

    if (this.selectedRow) {
      this.dataSource.data = this.dataSource.data.filter(flight => flight.nVuelo !== this.selectedRow.nVuelo);
      const vuelo = this.vuelos.find(vuelo => vuelo.nVuelo === this.selectedRow.nVuelo);
      if (vuelo) {
        this.viajeVuelos.push(vuelo);
        this.viajeDataSource = new MatTableDataSource(this.viajeVuelos);
        var aeropuertoId = this.locationType(vuelo.vueloAeropuertos, "Destino");
        this.dataSource.data = this.dataSource.data.filter(flight => {
          return flight.vueloAeropuertos.some(aeropuerto => aeropuerto.aeropuertoId === aeropuertoId);
        });
      }
      this.selectedRow = null;
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado ningún vuelo'
      })
    }
  }

  deleteFlight(id: number): void {
    const vuelo = this.viajeVuelos.find(vuelo => vuelo.nVuelo === id);
    if (vuelo) {
      const index = this.viajeVuelos.indexOf(vuelo);
      const last = this.viajeVuelos.length - 1;
      if (index == 0 || index == last) {
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

  restart(): void {
    this.selectedRow = null;
    this.viajeVuelos = [];
    this.viajeDataSource = new MatTableDataSource(this.viajeVuelos);
    this.dataSource = new MatTableDataSource(this.vuelos);
  }

  addTrip() {
    console.log(this.viajeVuelos);
    if (this.viajeVuelos.length > 0) {
      const last = this.viajeVuelos.length - 1;
      this.viaje.empleadoUsuario = this.username;
      this.viaje.fechaSalida = this.viajeVuelos[0].fechaSalida;
      this.viaje.fechaLlegada = this.viajeVuelos[last].fechaLlegada;
      this.viaje.fechaSalida = this.viaje.fechaSalida.replace('Z', '+00:00');
      this.viaje.fechaLlegada = this.viaje.fechaLlegada.replace('Z', '+00:00');

      this.viajesService.postVuelo(this.viaje).subscribe({
        next: (id) => {
          for (const vuelo of this.viajeVuelos) {
            const index = this.viajeVuelos.indexOf(vuelo) + 1;
            var viajeVuelo: ViajeVuelo = {
              viajeId: id,
              nVuelo: vuelo.nVuelo,
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
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado ningún vuelo'
      })
    }
  }

  back(): void {
    this.router.navigate(["tecair-admin", this.username, "trips"]);
  }
}
