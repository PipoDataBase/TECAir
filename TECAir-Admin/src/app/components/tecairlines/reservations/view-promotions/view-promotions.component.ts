import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aeropuerto } from 'src/app/models/aeropuerto.module';
import { Promocion } from 'src/app/models/promocion.module';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { PromocionesService } from 'src/app/services/promociones.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-promotions',
  templateUrl: './view-promotions.component.html',
  styleUrls: ['./view-promotions.component.css']
})
export class ViewPromotionsComponent {
  username: string = '';
  isMobile: boolean;
  aeropuertos: Aeropuerto[] = [];
  promociones: Promocion[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private aeropuertosService: AeropuertosService, private promocionesService: PromocionesService, public sharedService: SharedService) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
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

    this.router.navigate(["tecair-admin", this.username, "book-flight"]);
  }

  back(): void {
    this.router.navigate(["tecair-admin", this.username, "reservations"]);
  }
}
