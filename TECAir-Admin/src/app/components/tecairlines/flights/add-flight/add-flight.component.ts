import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Avion } from 'src/app/models/avion.module';
import { Vuelo } from 'src/app/models/vuelo.module';
import { AvionesService } from 'src/app/services/aviones.service';
import { VuelosService } from 'src/app/services/vuelos.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent {
  username: string = '';
  selectedPlate: string = '';
  fechaSalida: string = '';
  fechaLlegada: string = '';
  aviones: Avion[] = [];
  vuelo: Vuelo = {
    nVuelo: 0,
    empleadoUsuario: '',
    avionMatricula: '',
    fechaSalida: '',
    fechaLlegada: '',
    estado: true,
    precio: 0,
  }

  constructor(private route: ActivatedRoute, private router: Router, private avionesService: AvionesService, private vuelosService: VuelosService) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })

    this.avionesService.getAviones().subscribe({
      next: (aviones) => {
        this.aviones = aviones;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  addFlight() {
    this.vuelo.empleadoUsuario = this.username;
    this.vuelo.avionMatricula = this.selectedPlate;

    var date1 = new Date(this.fechaSalida);
    var date2 = new Date(this.fechaLlegada);
    var offset1 = date1.getTimezoneOffset();
    var offset2 = date2.getTimezoneOffset();

    date1.setMinutes(date1.getMinutes() - offset1);
    date2.setMinutes(date2.getMinutes() - offset2);
    this.vuelo.fechaSalida = date1.toISOString().replace('Z', '+00:00');
    this.vuelo.fechaLlegada = date2.toISOString().replace('Z', '+00:00');

    this.vuelosService.postVuelo(this.vuelo).subscribe({
      next: (response) => {
        console.log(response);
        //navigate
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  back() {
    //this.router.navigate(["tecair"]);
  }
}
