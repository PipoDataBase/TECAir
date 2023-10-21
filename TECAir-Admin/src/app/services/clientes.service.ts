import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.module';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.baseApiUrl + '/api/Clientes/' + id);
  }

  postCliente(cliente: Cliente): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/api/Clientes', cliente);
  }
}
