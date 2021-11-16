import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiClass } from './api.class';
import { ApiResponse } from '@interfaces/api_response';

@Injectable({
  providedIn: 'root'
})
export class ApiGetService extends ApiClass {

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Obtiene la informacion de una asesorada en particular, dependiendo del id ingresado
   * @param idMother Id de la asesorada a obtener los datos
   */
  public getMother(idMother: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['mother', idMother]);
    return this.http.get<ApiResponse>(url);
  }

  public getChildsList(idMother: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['child', idMother]);
    return this.http.get<ApiResponse>(url);
  }
}
