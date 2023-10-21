import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SharedService } from 'src/app/services/shared.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule, FormsModule, NgIf]
})
export class LogInComponent {
  username: string = '';
  email: string = '';
  loginFailed: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LogInComponent>, public matDialog: MatDialog, private router: Router, private sharedService: SharedService, private clientesService: ClientesService) { }

  ngOnInit() {
    this.username = this.data.username;
  }
  
  // go to sign-up view
  signUp(): void {
    this.dialogRef.close();
    const username = this.username;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { username };
    const dialogRef = this.matDialog.open(SignUpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // close this view
  close(): void {
    this.dialogRef.close();
  }

  // login client
  login(): void {
    // validate email
    if (!this.sharedService.validateEmail(this.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formato de correo incorrecto'
      })
      return;
    }

    // get client from database
    this.clientesService.getCliente(this.email).subscribe({
      next: (response) => {
        this.dialogRef.close();
        this.router.navigate(["tecair-admin", this.username, "profile", this.email]);
      },
      error: (response) => {
        this.loginFailed = true;
      }
    })
  }
}
