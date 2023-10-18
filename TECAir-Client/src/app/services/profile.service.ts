import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Profile } from '../models/profile.module';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService  {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  public getClients(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.baseApiUrl + '/api/Clientes/' );
  }
  
  public getClient(id: string): Observable<Profile> {

    id.replace("@", "%40");

    console.log(id);

    return this.http.get<Profile>(this.baseApiUrl + '/api/Clientes/' + id);
  }

  addClient(addClientRequest: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.baseApiUrl + '/api/Clientes', addClientRequest);
}

}
