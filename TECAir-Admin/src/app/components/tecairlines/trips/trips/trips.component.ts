import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Viaje } from 'src/app/models/viaje.module';
import { SharedService } from 'src/app/services/shared.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent {
  username: string = '';
  viajes: Viaje[] = [];
  dataSource = new MatTableDataSource(this.viajes);
  columnHeaders: string[] = ['viajeId', 'origen', 'destino', 'escalas', 'fechaSalida', 'fechaLlegada', 'precio', 'accion'];

  constructor(private route: ActivatedRoute, private router: Router, private vuelosService: VuelosService, private viajesService: ViajesService, public sharedService: SharedService) { }

  // update trips after edit or delete them
  updateTrips(): void {
    this.viajesService.getViajes().subscribe({
      next: (viajes) => {
        this.viajes = viajes;
        this.dataSource = new MatTableDataSource(this.viajes);
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

    this.updateTrips();
  }

  // go to add-trip view
  addTrip(): void {
    this.router.navigate(["tecair-admin", this.username, "add-trip"]);
  }

  // delete selected trip
  deleteTrip(id: number): void {
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
        this.viajesService.deleteViaje(id).subscribe({
          next: (response) => {
            this.updateTrips();
          },
          error: (error) => {
            console.log(error);
          }
        })
        Swal.fire(
          '¡Eliminado!',
          'El viaje ha sido eliminado.',
          'success'
        )
      }
    })
  }
}
