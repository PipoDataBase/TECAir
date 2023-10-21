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
import { LogInComponent } from '../log-in/log-in.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.module';
import { ClientesService } from 'src/app/services/clientes.service';
import { Universidad } from 'src/app/models/universidad.module';
import { Estudiante } from 'src/app/models/estudiante.module';
import { UniversidadesService } from 'src/app/services/universidades.service';
import { SharedService } from 'src/app/services/shared.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Inject } from '@angular/core';
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
  username: string = '';
  isMobile: boolean;
  student: boolean = false;
  universidades: Universidad[] = [];
  cliente: Cliente = {
    correo: '',
    telefono: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    estudiantes: []
  }
  estudiante: Estudiante = {
    carnet: 0,
    correo: '',
    universidadId: 0,
    millas: 0,
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SignUpComponent>, private matDialog: MatDialog, private clientesService: ClientesService, private estudiantesService: EstudiantesService, private universidadesService: UniversidadesService, private sharedService: SharedService) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  ngOnInit() {
    this.username = this.data.username;
    
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
    const username = this.username;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { username };

    const dialogRef = this.matDialog.open(LogInComponent, dialogConfig);

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
    const dialogRef = this.matDialog.open(LogInComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
