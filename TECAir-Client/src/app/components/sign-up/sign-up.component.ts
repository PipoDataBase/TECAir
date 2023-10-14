import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.module';
import { ClientesService } from 'src/app/services/clientes.service';
import { Estudiante } from 'src/app/models/estudiante.module';
import { UniversidadesService } from 'src/app/services/universidades.service';
import { Universidad } from '../../models/universidad.module';
import { SharedService } from 'src/app/services/shared.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatIconModule, MatInputModule, MatToolbarModule, MatCheckboxModule, FormsModule, NgIf, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignUpComponent {
  isMobile: boolean;
  student: boolean = false;
  universidades: Universidad[] = [];
  cliente: Cliente = {
    correo: '',
    telefono: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    estudiante: []
  }
  estudiante: Estudiante = {
    carnet: 0,
    correo: '',
    universidadId: 0,
    millas: 0,
  }

  constructor(public dialogRef: MatDialogRef<SignUpComponent>, private matDialog: MatDialog, private clientesService: ClientesService, private estudiantesService: EstudiantesService, private universidadesService: UniversidadesService, private sharedService: SharedService) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  ngOnInit() {
    this.universidadesService.getUniversidades().subscribe({
      next: (universidades) => {
        this.universidades = universidades;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  // go to login view
  login() {
    this.dialogRef.close();
    const dialogRef = this.matDialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // student selection
  onCheckboxChange(event: any) {
    this.student = event.checked;
  }

  // close this view
  close(): void {
    this.dialogRef.close();
  }

  // sign-up client
  signUp(): void {
    // validate email
    if (!this.sharedService.validateEmail(this.cliente.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formato de correo incorrecto'
      })
      return;
    }

    // validate phone
    if (!this.sharedService.validatePhone(this.cliente.telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formato de teléfono incorrecto'
      })
      return;
    }

    // validate name and last name
    if (!this.cliente.nombre || !this.cliente.apellido1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe ingresar su nombre completo'
      })
      return;
    }

    // validate student info
    if (this.student) {
      if (this.estudiante.carnet <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Número de carnet incorrecto'
        })
        return;
      }

      if (this.estudiante.universidadId <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No ha seleccionado la universidad'
        })
        return;
      }

      this.estudiante.correo = this.cliente.correo;
    }

    // add client to database
    this.clientesService.postCliente(this.cliente).subscribe({
      next: (response) => {
        if (this.student) {
          this.estudiantesService.postEstudiante(this.estudiante).subscribe({
            next: (response) => {
            },
            error: (response) => {
              console.log(response);
            }
          })
        }
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
