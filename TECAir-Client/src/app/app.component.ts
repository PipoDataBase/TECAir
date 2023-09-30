import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestTecAir';
  isMobile: boolean;
  images = [
    '../assets/img1.jpg',
    '../assets/img2.jpg',
    '../assets/img3.jpg',
  ];
  mobileimages = [
    '../assets/mobile-img1.jpg',
    '../assets/mobile-img2.jpg',
    '../assets/mobile-img3.jpg',
  ]
  
  currentImage = 0;
  currentMobileImage = 0;

  constructor(private renderer: Renderer2) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  openLoginDialog(): void {
    console.log("Mostrar dialogo");
  }

  test(): void {
    console.log("Probar boton");
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
    else{
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
}
