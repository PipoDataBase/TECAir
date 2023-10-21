import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tecairlines',
  templateUrl: './tecairlines.component.html',
  styleUrls: ['./tecairlines.component.css']
})
export class TecairlinesComponent {
  isMobile: boolean;
  logged: string = 'MyTECAir';
  email: string = '';

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
    if (this.logged == 'MyTECAir') {
      const dialogRef = this.matDialog.open(LoginComponent);

      dialogRef.afterClosed().subscribe(result => {
        this.logged = result[0];
        this.email = result[1];
      });
    }
    else {
      this.router.navigate(["tecair", "profile", this.email]);
    }
  }
}
