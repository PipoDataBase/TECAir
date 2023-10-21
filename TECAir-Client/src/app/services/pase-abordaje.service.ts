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

  postPaseAbordaje(paseAbordaje: PaseAbordaje): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/api/PasesAbordajes', paseAbordaje);
  }
}
