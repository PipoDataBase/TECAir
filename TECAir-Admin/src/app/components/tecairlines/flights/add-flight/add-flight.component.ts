import { Component } from '@angular/core';
import { Avion } from 'src/app/models/avion.module';
import { AvionesService } from 'src/app/services/aviones.service';

export interface Vuelo {
  fechaSalida: string;
  fechaLlegada: string;
  estado: boolean;
  precio: string;
  movie_Id: string;
  projectionType: string;
  language: string;
}

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent {
  aviones: Avion[] = [];
  selectedPlate: string = '';

  constructor(private avionesService: AvionesService) { }

  ngOnInit(): void {
    this.avionesService.getAviones().subscribe({
      next: (aviones) => {
        this.aviones = aviones;
        console.log(aviones);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
