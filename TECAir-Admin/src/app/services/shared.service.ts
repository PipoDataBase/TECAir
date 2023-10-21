import { Injectable } from '@angular/core';
import { Aeropuerto } from '../models/aeropuerto.module';
import { VueloAeropuerto } from '../models/vuelo-aeropuerto.module';
import { DatePipe } from '@angular/common';

export const _filter = (opt: Aeropuerto[], value: string): Aeropuerto[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item =>
    item.ubicacion.toLowerCase().includes(filterValue) ||
    item.id.toLowerCase().includes(filterValue) ||
    item.nombre.toLowerCase().includes(filterValue)
  );
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // regular expression to get the airport code
  regex = /\((.*?)\)/;
  regex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // get location type (origin/destination)
  locationType(va: VueloAeropuerto[], tipo: string): string {
    if (va[0].tipo == tipo) {
      return va[0].aeropuertoId;
    }
    else if (va[1].tipo == tipo) {
      return va[1].aeropuertoId;
    }
    return "";
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

  // flight state
  getState(state: boolean): string {
    if (state) {
      return "Abierto";
    }
    return "Cerrado";
  }

  // validate client or student email
  validateEmail(email: string) {
    return this.regex2.test(email);
  }

  // validate client phone
  validatePhone(phone: number) {
    return phone >= 10000000 && phone <= 99999999;
  }
}
