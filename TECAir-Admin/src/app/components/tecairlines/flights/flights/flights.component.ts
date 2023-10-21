import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vuelo } from 'src/app/models/vuelo.module';
import { VuelosService } from 'src/app/services/vuelos.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  username: string = '';
  vuelos: Vuelo[] = [];
  dataSource = new MatTableDataSource(this.vuelos);
  columnHeaders: string[] = ['vueloId', 'avion', 'origen', 'destino', 'fechaSalida', 'fechaLlegada', 'estado', 'precio', 'accion'];

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private vuelosService: VuelosService, public sharedService: SharedService) { }

  // update flights after edit or delete them
  updateFlights(): void {
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

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })

    this.updateFlights();
  }

  // go to add-flight view
  addFlight(): void {
    this.router.navigate(["tecair-admin", this.username, "add-flight"]);
  }

  // go to edit-flight view
  editFlight(id: number): void {
    this.router.navigate(["tecair-admin", this.username, "edit-flight", id]);
  }

  // delete selected flight
  deleteFlight(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#e13a2d',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vuelosService.deleteVuelo(id).subscribe({
          next: (response) => {
            this.updateFlights();
            Swal.fire(
              '¡Eliminado!',
              'El vuelo ha sido eliminado.',
              'success'
            )
          },
          error: (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El vuelo seleccionado pertenece a un viaje y no puede ser eliminado.'
            })
          }
        })
      }
    })
  }
}
