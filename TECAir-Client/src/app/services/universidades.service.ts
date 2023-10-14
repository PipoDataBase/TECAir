import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Universidad } from '../models/universidad.module';

@Injectable({
  providedIn: 'root'
})
export class UniversidadesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getUniversidades(): Observable<Universidad[]> {
    return this.http.get<Universidad[]>(this.baseApiUrl + '/api/Universidades');
  }
}
