import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaseAbordaje } from '../models/pase-abordaje.module';

@Injectable({
  providedIn: 'root'
})
export class PaseAbordajeService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getPasesAbordaje(): Observable<PaseAbordaje[]> {
    return this.http.get<PaseAbordaje[]>(this.baseApiUrl + '/api/PasesAbordajes');
  }

  getPaseAbordaje(id: number): Observable<PaseAbordaje> {
    return this.http.get<PaseAbordaje>(this.baseApiUrl + '/api/PasesAbordajes/' + id);
  }

  putPaseAbordaje(id: number, paseAbordaje: PaseAbordaje): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/api/PasesAbordajes/' + id, paseAbordaje);
  }

  postPaseAbordaje(paseAbordaje: PaseAbordaje): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/api/PasesAbordajes', paseAbordaje);
  }
}
