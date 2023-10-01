import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecairlines',
  templateUrl: './tecairlines.component.html',
  styleUrls: ['./tecairlines.component.css']
})
export class TecairlinesComponent {
  isMobile: boolean;

  constructor(private renderer: Renderer2, private router: Router) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  home(): void {
    this.router.navigate(["tecair", "home"]);
  }

  openLoginDialog(): void {
    console.log("Mostrar dialogo");
  }

  test(): void {
    console.log("Probar boton");
  }
}
