import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Aeropuerto } from 'src/app/models/aeropuerto.module';
import { Promocion } from 'src/app/models/promocion.module';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { PromocionesService } from 'src/app/services/promociones.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  username: string = '';
  isMobile: boolean;
  panelOpenState = false;
  aeropuertos: Aeropuerto[] = [];

  images = [
    '../../../../../../../assets/img1.jpg',
    '../../../../../../../assets/img2.jpg',
    '../../../../../../../assets/img3.jpg',
  ];
  mobileimages = [
    '../../../../../../../assets/mobile-img1.jpg',
    '../../../../../../../assets/mobile-img2.jpg',
    '../../../../../../../assets/mobile-img3.jpg',
  ]

  currentImage = 0;
  currentMobileImage = 0;

  airportForm = this._formBuilder.group({
    originAirportGroup: '',
    destinationAirportGroup: '',
    departureDate: '',
    passengers: 1
  });

  promociones: Promocion[] = [];

  airportOptions1: Observable<Aeropuerto[]> | undefined;
  airportOptions2: Observable<Aeropuerto[]> | undefined;

  constructor(private renderer: Renderer2, private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private aeropuertosService: AeropuertosService, private promocionesService: PromocionesService, public sharedService: SharedService) {
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

    this.airportOptions1 = this.airportForm.get('originAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sharedService._filterAirports(this.aeropuertos, value || '')),
    );

    this.airportOptions2 = this.airportForm.get('destinationAirportGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sharedService._filterAirports(this.aeropuertos, value || '')),
    );

    this.promocionesService.getNPromociones(4).subscribe({
      next: (promociones) => {
        this.promociones = promociones;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  changeImage(direction: number) {
    if (this.isMobile) {
      this.currentMobileImage += direction;

      if (this.currentMobileImage < 0) {
        this.currentMobileImage = this.mobileimages.length - 1;
      } else if (this.currentMobileImage >= this.mobileimages.length) {
        this.currentMobileImage = 0;
      }

      const newPath = this.mobileimages[this.currentMobileImage];
      const imgElement = document.getElementById('image') as HTMLImageElement;

      this.renderer.setAttribute(imgElement, 'src', newPath);
    }
    else {
      this.currentImage += direction;

      if (this.currentImage < 0) {
        this.currentImage = this.images.length - 1;
      } else if (this.currentImage >= this.images.length) {
        this.currentImage = 0;
      }

      const newPath = this.images[this.currentImage];
      const imgElement = document.getElementById('image') as HTMLImageElement;

      this.renderer.setAttribute(imgElement, 'src', newPath);
    }
  }

  searchFlights(): void {
    const searchedOrigin = this.airportForm.get('originAirportGroup')?.value;
    if (searchedOrigin == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado el origen del vuelo'
      })
      return;
    }

    const searchedDestiny = this.airportForm.get('destinationAirportGroup')?.value;
    if (searchedDestiny == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado el destino del vuelo'
      })
      return;
    }

    const selectedDate = this.airportForm.get('departureDate')?.value;
    if (selectedDate == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado la fecha de salida'
      })
      return;
    }

    const selectedSeatsCuantity = this.airportForm.get('passengers')?.value;
    if (selectedSeatsCuantity) {
      if (selectedSeatsCuantity <= 0 || selectedSeatsCuantity >= 10) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Número de pasajeros incorrecto. Seleccione [1 - 9]'
        })
        return;
      }
    }
    
    if (searchedOrigin && searchedDestiny) {
      if (this.sharedService.getCode(searchedOrigin) == '' || this.sharedService.getCode(searchedDestiny) == '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Código IATA incorrecto'
        })
        return;
      }
    }
    
    if (searchedOrigin && searchedDestiny && selectedDate && selectedSeatsCuantity) {
      this.sharedService.searchedOrigin = this.sharedService.getCode(searchedOrigin);
      this.sharedService.searchedDestiny = this.sharedService.getCode(searchedDestiny);
      this.sharedService.selectedDate = selectedDate;
      this.sharedService.selectedSeatsCuantity = selectedSeatsCuantity;
    }
    
    this.router.navigate(["tecair-admin", this.username, "book-flight"]);
  }

  onCardClick(promotion: any): void {
    this.sharedService.searchedOrigin = promotion.viaje.origen;
    this.sharedService.searchedDestiny = promotion.viaje.destino;
    this.sharedService.selectedDate = promotion.viaje.fechaSalida;
    this.sharedService.selectedSeatsCuantity = 1;

    this.router.navigate(["tecair-admin", this.username, "book-flight"]);
  }

  more_promotions() {
    this.router.navigate(["tecair-admin", this.username, "view-promotions"]);
  }
}
