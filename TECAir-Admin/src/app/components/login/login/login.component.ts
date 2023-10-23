import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.module';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hide: boolean = true;
  empleados: Empleado[] = [];

  constructor(private router: Router, private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.empleadosService.getEmpleados().subscribe({
      next: (empleados) => {
        this.empleados = empleados;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  login(): void {
    const employeeFound = this.empleados.find((empleado) => empleado.usuario === this.username && empleado.contraseña === this.password);
    if (employeeFound) {
      this.router.navigate(["tecair-admin", this.username]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Credenciales inválidas',
      })
    }
  }
}
