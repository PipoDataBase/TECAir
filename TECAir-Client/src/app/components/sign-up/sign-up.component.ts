import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.module';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule, MatCheckboxModule, FormsModule, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignUpComponent {
  isMobile: boolean;
  student: boolean = false;
  cliente: Cliente = {
    correo: '',
    telefono: 0,
    nombre: '',
    apellido1: '',
    apellido2: ''
  }

  constructor(public dialogRef: MatDialogRef<SignUpComponent>, private matDialog: MatDialog, private clientesService: ClientesService) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  login() {
    this.dialogRef.close();
    const dialogRef = this.matDialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onCheckboxChange(event: any) {
    this.student = event.checked;
  }

  close(): void {
    this.dialogRef.close();
  }

  signUp(): void {
    // add client to database
    this.clientesService.postCliente(this.cliente).subscribe({
      next: (email) => {
        console.log(email);
      },
      error: (response) => {
        console.log(response);
      }
    })

    this.dialogRef.close();
    const dialogRef = this.matDialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
