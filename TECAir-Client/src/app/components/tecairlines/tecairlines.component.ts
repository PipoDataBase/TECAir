import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tecairlines',
  templateUrl: './tecairlines.component.html',
  styleUrls: ['./tecairlines.component.css']
})
export class TecairlinesComponent {
  isMobile: boolean;

  constructor(private renderer: Renderer2, private router: Router, private matDialog:MatDialog) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  home(): void {
    this.router.navigate(["tecair", "home"]);
  }

  openLoginDialog() {
    console.log("Mostrar dialogo");
    this.matDialog.open(SignUpComponent);
    
  }

  test(): void {
    console.log("Probar boton");
  }
}
