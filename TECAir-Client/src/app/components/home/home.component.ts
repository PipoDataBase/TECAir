import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Aeropuerto } from 'src/app/models/aeropuerto.module';
import { Promotion } from 'src/app/models/promotion.module';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';

export const _filter = (opt: Aeropuerto[], value: string): Aeropuerto[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item =>
    item.ubicacion.toLowerCase().includes(filterValue) ||
    item.id.toLowerCase().includes(filterValue) ||
    item.nombre.toLowerCase().includes(filterValue)
  );
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isMobile: boolean;
  panelOpenState = false;
  aeropuertos: Aeropuerto[] = [];

  images = [
    '../../../assets/img1.jpg',
    '../../../assets/img2.jpg',
    '../../../assets/img3.jpg',
  ];
  mobileimages = [
    '../../../assets/mobile-img1.jpg',
    '../../../assets/mobile-img2.jpg',
    '../../../assets/mobile-img3.jpg',
  ]

  currentImage = 0;
  currentMobileImage = 0;

  airportForm = this._formBuilder.group({
    originAirportGroup: '',
    destinationAirportGroup: '',
    departureDate: '',
    passengers: 1
  });

  promotions: Promotion[] = [
    {
      origin: 'San José, Costa Rica',
      destination: 'Guatemala',
      price: 68,
      imagePath: '../../../assets/promo1.jpg'
    },
    {
      origin: 'San José, Costa Rica',
      destination: 'San Salvador',
      price: 87,
      imagePath: '../../../assets/promo2.jpg'
    },
    {
      origin: 'San José, Costa Rica',
      destination: 'Bogotá',
      price: 105,
      imagePath: '../../../assets/promo3.jpg'
    },
    {
      origin: 'San José, Costa Rica',
      destination: 'Ciudad de México',
      price: 114,
      imagePath: '../../../assets/promo4.jpg'
    }
  ]

  airportOptions1: Observable<Aeropuerto[]> | undefined;
  airportOptions2: Observable<Aeropuerto[]> | undefined;

  constructor(private renderer: Renderer2, private _formBuilder: FormBuilder, private router: Router, private aeropuertosService: AeropuertosService) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  ngOnInit() {
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

  private _filterAirports(value: string): Aeropuerto[] {
    if (value && typeof value === 'string') {
      return _filter(this.aeropuertos, value);
    }
    return this.aeropuertos;
  }

  searchFlights(): void {
    console.log(this.airportForm.get('originAirportGroup')?.value);
    console.log(this.airportForm.get('destinationAirportGroup')?.value);
    console.log(this.airportForm.get('departureDate')?.value);
    console.log(this.airportForm.get('passengers')?.value);
    this.router.navigate(["tecair", "book-flight"]);
  }

  onCardClick(promotion: any): void {
    // Falta routing a promocion especifica / book-flight
    console.log(promotion);
  }

  more_promotions() {
    this.router.navigate(["tecair", "promotions"]);
  }
}
