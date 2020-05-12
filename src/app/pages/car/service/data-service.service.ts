import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getAllBrands(type): Observable<any> {
    return this.http.get(`${environment.ENDPOINT}${type}/marcas`);
  }

  getAllModels(type, idBrand): Observable<any> {
    return this.http.get(`${environment.ENDPOINT}${type}/marcas/${idBrand}/modelos`);
  }
}
