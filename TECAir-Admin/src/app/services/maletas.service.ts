import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Maleta } from '../models/maleta.module';

@Injectable({
  providedIn: 'root'
})
export class MaletasService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getMaletas(): Observable<Maleta[]> {
    return this.http.get<Maleta[]>(this.baseApiUrl + '/api/Maletas');
  }

  getMaleta(id: string): Observable<Maleta> {
    return this.http.get<Maleta>(this.baseApiUrl + '/api/Maletas/' + id);
  }

  postMaleta(maleta: Maleta): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/api/Maletas', maleta);
  }

  deleteMaleta(id: number): Observable<number> {
    return this.http.delete<number>(this.baseApiUrl + '/api/Maletas/' + id);
  }
}
