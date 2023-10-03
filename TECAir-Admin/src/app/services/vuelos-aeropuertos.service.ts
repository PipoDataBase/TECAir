import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { VueloAeropuerto } from '../models/vuelo-aeropuerto.module';

@Injectable({
  providedIn: 'root'
})
export class VuelosAeropuertosService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  postVueloAeropuerto(vueloAeropuerto: VueloAeropuerto): Observable<VueloAeropuerto> {
    return this.http.post<VueloAeropuerto>(this.baseApiUrl + '/api/VuelosAeropuertos', vueloAeropuerto);
  }
}
