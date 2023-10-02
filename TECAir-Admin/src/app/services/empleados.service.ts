import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Empleado } from '../models/empleado.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseApiUrl + '/api/Empleados');
  }

  getEmpleado(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(this.baseApiUrl + '/api/Empleados/' + id);
  }
}
