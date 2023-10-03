import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Avion } from '../models/avion.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvionesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAviones(): Observable<Avion[]> {
    return this.http.get<Avion[]>(this.baseApiUrl + '/api/Aviones');
  }

  getAvion(id: string): Observable<Avion> {
    return this.http.get<Avion>(this.baseApiUrl + '/api/Aviones/' + id);
  }
}
