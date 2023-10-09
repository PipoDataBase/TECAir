import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Viaje } from 'src/app/models/viaje.module';
import { SharedService } from 'src/app/services/shared.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { VuelosService } from 'src/app/services/vuelos.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent {
  username: string = '';
  viajes: Viaje[] = [];
  dataSource = new MatTableDataSource(this.viajes);
  columnHeaders: string[] = ['viajeId', 'origen', 'destino', 'fechaSalida', 'fechaLlegada', 'precio', 'accion'];
  origins: string[] = [];
  destinations: string[] = [];
  prices: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private vuelosService: VuelosService, private viajesService: ViajesService, public sharedService: SharedService) { }

  // update trips after edit or delete them
  updateTrips(): void {
    this.viajesService.getViajes().subscribe({
      next: (viajes) => {
        this.viajes = viajes;
        this.dataSource = new MatTableDataSource(this.viajes);
        this.getOrigins();
        this.getDestinations();
        this.getPrices();
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

  // get all origin of trips
  getOrigins(): void {
    for (const viaje of this.viajes) {
      this.vuelosService.getVuelo(viaje.viajeVuelos[0].nVuelo.toString()).subscribe({
        next: (vuelo) => {
          var result = this.sharedService.locationType(vuelo.vueloAeropuertos, "Origen")
          this.origins.splice(0, 0, result);
        }
      })
    }
  }

  // get all destination of trips
  getDestinations(): void {
    for (const viaje of this.viajes) {
      const lastIndex = viaje.viajeVuelos.length - 1;
      this.vuelosService.getVuelo(viaje.viajeVuelos[lastIndex].nVuelo.toString()).subscribe({
        next: (vuelo) => {
          var result = this.sharedService.locationType(vuelo.vueloAeropuertos, "Destino");
          this.destinations.splice(0, 0, result);
        }
      })
    }
  }

  // calculate total price of each trip
  getPrices(): void {
    const observables = [];

    for (const viaje of this.viajes) {
      const vueloObservables = viaje.viajeVuelos.map(viajeVuelo => {
        return this.vuelosService.getVuelo(viajeVuelo.nVuelo.toString());
      });

      observables.push(forkJoin(vueloObservables));
    }

    forkJoin(observables).subscribe((viajeVuelos: any[]) => {
      viajeVuelos.forEach(vuelos => {
        const result = vuelos.reduce((acc: any, vuelo: { precio: any; }) => acc + vuelo.precio, 0);
        this.prices.push(result);
      });
    });
  }

  addTrip(): void {
    this.router.navigate(["tecair-admin", this.username, "add-trip"]);
  }

  editTrip(id: number): void {

  }

  deleteTrip(id: number): void {

  }
}
