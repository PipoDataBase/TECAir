import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tecairlines',
  templateUrl: './tecairlines.component.html',
  styleUrls: ['./tecairlines.component.css']
})
export class TecairlinesComponent {
  isMobile: boolean;

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
}
