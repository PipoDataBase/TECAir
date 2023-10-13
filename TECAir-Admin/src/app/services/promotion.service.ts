import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Promocion } from '../models/promotion.module';
import { Promocion2 } from '../models/promotion2.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getPromociones(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(this.baseApiUrl + '/api/Promociones');
  }

  postPromocion(promocion: Promocion2): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/api/Promociones', promocion);
  }

  deletePromocion(id: number): Observable<number> {
    return this.http.delete<number>(this.baseApiUrl + '/api/Promociones/' + id);
  }
}
