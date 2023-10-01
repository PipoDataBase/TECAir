import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Airport } from 'src/app/models/airport.module';
import { Promotion } from 'src/app/models/promotion.module';

export const _filter = (opt: Airport[], value: string): Airport[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item =>
    item.location.toLowerCase().includes(filterValue) ||
    item.code.toLowerCase().includes(filterValue) ||
    item.name.toLowerCase().includes(filterValue)
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

  airports: Airport[] = [
    {
      location: 'San José, Costa Rica',
      code: 'SJO',
      name: 'Aeropuerto Internacional Juan Santamaría'
    },
    {
      location: 'Ciudad de Panamá, Panamá',
      code: 'PTY',
      name: 'Aeropuerto Internacional de Tocumen'
    },
    {
      location: 'San Salvador, El Salvador',
      code: 'SAL',
      name: 'Aeropuerto Internacional de El Salvador San Óscar Arnulfo Romero y Galdámez'
    },
  ];

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

  airportOptions1: Observable<Airport[]> | undefined;
  airportOptions2: Observable<Airport[]> | undefined;

  constructor(private renderer: Renderer2, private _formBuilder: FormBuilder, private router: Router) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  ngOnInit() {
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

  private _filterAirports(value: string): Airport[] {
    if (value && typeof value === 'string') {
      return _filter(this.airports, value);
    }
    return this.airports;
  }

  searchFlights(): void {
    console.log(this.airportForm.get('originAirportGroup')?.value);
    console.log(this.airportForm.get('destinationAirportGroup')?.value);
    console.log(this.airportForm.get('departureDate')?.value);
    console.log(this.airportForm.get('passengers')?.value);
    // Falta routing a book-flight
  }

  onCardClick(promotion: any): void {
    // Falta routing a promocion especifica / book-flight
    console.log(promotion);
  }

  more_promotions() {
    this.router.navigate(["tecair", "promotions"]);
  }
}
