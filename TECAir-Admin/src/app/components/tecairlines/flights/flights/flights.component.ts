import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vuelo } from 'src/app/models/vuelo.module';
import { VuelosService } from 'src/app/services/vuelos.service';
import { DatePipe } from '@angular/common';
import { AvionesService } from 'src/app/services/aviones.service';
import { VueloAeropuerto } from 'src/app/models/vuelo-aeropuerto.module';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  username: string = '';
  vuelos: Vuelo[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private vuelosService: VuelosService, private avionesService: AvionesService) { }

  updateVuelos(): void {
    this.vuelosService.getVuelos().subscribe({
      next: (vuelos) => {
        this.vuelos = vuelos;
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

    this.updateVuelos();
  }

  locationType(va: VueloAeropuerto[], tipo: string): string {
    if (va[0].tipo == tipo){
      return va[0].aeropuertoId;
    }
    else if (va[1].tipo == tipo) {
      return va[1].aeropuertoId;
    }
    return "";
  }

  formatDate(date: string): string {
    const result = this.datePipe.transform(date, 'M/d/yy, h:mm a');
    if (result) {
      return result
    }
    return date;
  }

  getState(state: boolean): string {
    if (state) {
      return "Abierto";
    }
    return "Cerrado";
  }

  addFlight(): void {
    this.router.navigate(["tecair-admin", this.username, "add-flight"]);
  }

  editFlight(id: number): void {
    this.router.navigate(["tecair-admin", this.username, "edit-flight", id]);
  }

  deleteFlight(id: number): void {
    this.vuelosService.deleteVuelo(id).subscribe({
      next: (response) => {
        this.updateVuelos();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
