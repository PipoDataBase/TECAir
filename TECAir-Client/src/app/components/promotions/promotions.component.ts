import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Aeropuerto } from 'src/app/models/aeropuerto.module';
import { Promocion } from 'src/app/models/promocion.module';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { PromocionesService } from 'src/app/services/promociones.service';
import { SharedService } from 'src/app/services/shared.service';
import { Capacitor } from '@capacitor/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  isMobile: boolean;
  isOnline: boolean;
  aeropuertos: Aeropuerto[] = [];
  promociones: Promocion[] = [];

  constructor(private router: Router, private aeropuertosService: AeropuertosService, private promocionesService: PromocionesService, public sharedService: SharedService, private databaseService: DatabaseService) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  ngOnInit() {
    this.deviceProtocol();

    this.aeropuertosService.getAeropuertos().subscribe({
      next: (aeropuertos) => {
        this.aeropuertos = aeropuertos;
      },
      error: (response) => {
        console.log(response);
      }
    })

    this.promocionesService.getPromociones().subscribe({
      next: (promociones) => {
        this.promociones = promociones;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  onCardClick(promotion: any): void {
    this.sharedService.searchedOrigin = promotion.viaje.origen;
    this.sharedService.searchedDestiny = promotion.viaje.destino;
    this.sharedService.selectedDate = promotion.viaje.fechaSalida;
    this.sharedService.selectedSeatsCuantity = 1;

    this.router.navigate(["tecair", "book-flight"]);
  }

  back(): void {
    this.router.navigate(["tecair", "home"]);
  }

  // Chooses the protocol according with the device where is running the program
  async deviceProtocol() {

    if (this.isAndroid() && this.isOnline) {

      this.aeropuertosService.getAeropuertos().subscribe({
        next: (aeropuertos) => {
          this.aeropuertos = aeropuertos;
        },
        error: (response) => {
          console.log(response);
        }
      })

      this.promocionesService.getPromociones().subscribe({
        next: (promociones) => {
          this.promociones = promociones;
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    else if (this.isAndroid() && !this.isOnline) {
      var aeropuertosTemp = await this.databaseService.getAeropuertos();
      this.aeropuertos = aeropuertosTemp();
      var promocionesTemp = this.databaseService.getPromotions();
      this.promociones = promocionesTemp();
    }
    // There are no specific protocols for web because it only matters if it is connected to internet or not
  }

  // verifies if the application is running on a mobile device
  isAndroid() {
    return (Capacitor.getPlatform() === 'android');
  }
}
