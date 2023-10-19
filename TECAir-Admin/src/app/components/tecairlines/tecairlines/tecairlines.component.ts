import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.module';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { LogInComponent } from '../reservations/log-in/log-in.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-tecairlines',
  templateUrl: './tecairlines.component.html',
  styleUrls: ['./tecairlines.component.css']
})
export class TecairlinesComponent {
  username: string = '';
  isMobile: boolean;
  empleado: Empleado = {
    usuario: '',
    contraseña: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
  }

  constructor(private route: ActivatedRoute, private router: Router, private empleadosService: EmpleadosService, private matDialog: MatDialog) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
          this.empleadosService.getEmpleado(id).subscribe({
            next: (response) => {
              this.empleado = response;
            }
          })
        }
      }
    })
  }

  home(): void {
    this.router.navigate(["tecair-admin", this.username, "trips"]);
  }

  openLoginDialog(): void {
    const username = this.username;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { username };
    this.matDialog.open(LogInComponent, dialogConfig);
  }

  logout(): void {
    this.router.navigate(["tecair-admin/login"]);
  }

  test(): void {
    console.log("Probar boton");
  }
}
