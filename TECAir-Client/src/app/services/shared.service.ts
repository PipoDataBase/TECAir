import { Injectable } from '@angular/core';
import { Aeropuerto } from '../models/aeropuerto.module';
import { Viaje } from '../models/viaje.module';
import { DatePipe, formatDate } from '@angular/common';

export const _filter = (opt: Aeropuerto[], value: string): Aeropuerto[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item =>
    item.ubicacion.toLowerCase().includes(filterValue) ||
    item.id.toLowerCase().includes(filterValue) ||
    item.nombre.toLowerCase().includes(filterValue)
  );
};

export const _filterOfTravels = (opt: Viaje[], origen: string, destino: string, fecha: string): Viaje[] => {
  const filterValue1 = origen.toLowerCase();
  const filterValue2 = destino.toLowerCase();
  const filterValue3 = fecha;

  return opt.filter(item =>
    item.origen.toLowerCase().includes(filterValue1) &&
    item.destino.toLowerCase().includes(filterValue2) &&
    item.fechaSalida.includes(filterValue3)
  );
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  regex = /\((.*?)\)/;

  searchedOrigin: string = "";
  searchedDestiny: string = "";
  selectedDate: string = "";

  constructor(private datePipe: DatePipe) { }

  // get the airport location
  getName(aeropuertos: Aeropuerto[], value: string): string {
    var result = aeropuertos.find(aeropuerto => aeropuerto.id === value);
    if (result) {
      return result.ubicacion;
    }
    return "";
  }

  // get the airport code
  getCode(value: string): string {
    const match = value.match(this.regex);
    if (match) {
      return match[1];
    }
    else {
      return "";
    }
  }

  // filter airports by code, name and location
  _filterAirports(aeropuertos: Aeropuerto[], value: string): Aeropuerto[] {
    if (value && typeof value === 'string') {
      return _filter(aeropuertos, value);
    }
    return aeropuertos;
  }

  // departure and arrival format date
  formatDate(date: string): string {
    date = date.replace(':00Z', '');
    const result = this.datePipe.transform(date, 'M/d/yyyy, h:mm a');
    if (result) {
      return result
    }
    return date;
  }

  // departure and arrival format date
  formatDate2(date: string): string {
    date = date.replace(':00Z', '');
    const result = this.datePipe.transform(date, 'M/d/yyyy\nh:mm a');
    if (result) {
      return result
    }
    return date;
  }

  _filterTravelsByOriginDestiny(viajes: Viaje[], origen: string, destino: string, fecha: string): Viaje[] {
    if (origen && destino && fecha) {
      for (let i = 0; i < viajes.length; i++) {
        viajes[i].fechaSalida = this.formatDate2(viajes[i].fechaSalida);
        viajes[i].fechaLlegada = this.formatDate2(viajes[i].fechaLlegada);
      }

      return _filterOfTravels(viajes, origen, destino, fecha);
    }
    return viajes;
  }
}
