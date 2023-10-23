import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente.module';
import { Universidad } from 'src/app/models/universidad.module';
import { UniversidadesService } from 'src/app/services/universidades.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent {
  username: string = '';
  isMobile: boolean;
  student: boolean = false;

  email: string = '';
  cliente: Cliente = {
    correo: '',
    telefono: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    estudiantes: []
  }
  universidad: Universidad = {
    id: 0,
    nombre: '',
    ubicacion: '',
  }

  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedService, private clientesService: ClientesService, private universidadesService: UniversidadesService) {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })

    this.route.paramMap.subscribe({
      next: (params) => {
        const email = params.get('email');
        if (email) {
          this.email = email;
        }
      }
    })

    // get client from database
    this.clientesService.getCliente(this.email).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        if (this.cliente.estudiantes && this.cliente.estudiantes.length > 0) {
          this.student = true;

          this.universidadesService.getUniversidad(this.cliente.estudiantes[0].universidadId).subscribe({
            next: (universidad) => {
              this.universidad = universidad;
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
  }

  close(): void {
    this.router.navigate(["tecair"]);
  }

  save(): void {
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

    // update client in database
    this.clientesService.putCliente(this.cliente.correo, this.cliente).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Información guardada!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(["tecair"]);
        });
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
