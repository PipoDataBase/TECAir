import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../models/viaje.module';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getViajes(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.baseApiUrl + '/api/Viajes');
  }

  getViaje(id: string): Observable<Viaje> {
    return this.http.get<Viaje>(this.baseApiUrl + '/api/Viajes/' + id);
  }

  postViaje(viaje: Viaje): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/api/Viajes', viaje);
  }

  deleteViaje(id: number): Observable<number> {
    return this.http.delete<number>(this.baseApiUrl + '/api/Viajes/' + id);
  }
}
