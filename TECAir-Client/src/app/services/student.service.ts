import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Student } from '../models/student.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  public getClients(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseApiUrl + '/api/Estudiantes/' );
  }
  public getClient(id: string): Observable<Student> {

    id.replace("@", "%40");

  
    var student = this.http.get<Student>(this.baseApiUrl + '/api/Estudiantes/' + id)

    //only for package debug
    //console.log(id);
    //console.log(student)

    return student;
  }
}
