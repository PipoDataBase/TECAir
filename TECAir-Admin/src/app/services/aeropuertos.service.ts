import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Aeropuerto } from '../models/aeropuerto.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AeropuertosService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAeropuertos(): Observable<Aeropuerto[]> {
    return this.http.get<Aeropuerto[]>(this.baseApiUrl + '/api/Aeropuertos');
  }
}
