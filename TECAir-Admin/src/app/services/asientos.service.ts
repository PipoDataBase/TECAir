import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Asiento } from '../models/asiento.module';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAsientos(): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(this.baseApiUrl + '/api/Asientos');
  }

  putAsiento(id: string, nVuelo: number, avionMatricula: string, asiento: Asiento): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/api/Asientos/' + id + '-' + nVuelo + '-' + avionMatricula , asiento);
  }
}
