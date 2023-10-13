import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion.module';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getPromociones(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(this.baseApiUrl + '/api/Promociones');
  }

  getNPromociones(n: number): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(this.baseApiUrl + '/api/Promociones/N/' + n);
  }
}
