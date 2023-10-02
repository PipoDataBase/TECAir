import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from 'src/app/models/promotion.module';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  isMobile: boolean;

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
    },
    {
      origin: 'San José, Costa Rica',
      destination: 'Guatemala',
      price: 68,
      imagePath: '../../../assets/promo4.jpg'
    },
    {
      origin: 'San José, Costa Rica',
      destination: 'San Salvador',
      price: 87,
      imagePath: '../../../assets/promo3.jpg'
    },
    {
      origin: 'San José, Costa Rica',
      destination: 'Bogotá',
      price: 105,
      imagePath: '../../../assets/promo2.jpg'
    },
    {
      origin: 'San José, Costa Rica',
      destination: 'Ciudad de México',
      price: 114,
      imagePath: '../../../assets/promo1.jpg'
    },
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
    }
  ]

  constructor(private renderer: Renderer2, private router: Router) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  onCardClick(promotion: any): void {
    // Falta routing a promocion especifica / book-flight
    console.log(promotion);
  }

  back(): void {
    this.router.navigate(["tecair", "home"]);
  }
}
