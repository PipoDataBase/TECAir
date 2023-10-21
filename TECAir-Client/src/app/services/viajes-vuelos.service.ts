import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ViajeVuelo } from '../models/viaje-vuelo.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajesVuelosService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getViajesVuelos(): Observable<ViajeVuelo[]> {
    return this.http.get<ViajeVuelo[]>(this.baseApiUrl + '/api/ViajesVuelos');
  }

  postViajeVuelo(viajeVuelo: ViajeVuelo): Observable<ViajeVuelo> {
    return this.http.post<ViajeVuelo>(this.baseApiUrl + '/api/ViajesVuelos', viajeVuelo);
  }
}
