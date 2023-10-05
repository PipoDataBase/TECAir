import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Vuelo } from '../models/vuelo.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(this.baseApiUrl + '/api/Vuelos');
  }

  getVuelo(id: string): Observable<Vuelo> {
    return this.http.get<Vuelo>(this.baseApiUrl + '/api/Vuelos/' + id);
  }

  postVuelo(vuelo: Vuelo): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/api/Vuelos', vuelo);
  }

  putVuelo(id: number, vuelo: Vuelo): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/api/Vuelos/' + id, vuelo);
  }

  deleteVuelo(id: number): Observable<number> {
    return this.http.delete<number>(this.baseApiUrl + '/api/Vuelos/' + id);
  }
}
