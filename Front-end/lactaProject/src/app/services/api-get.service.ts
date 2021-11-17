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

  /**
   * Obtiene una lista de los lactantes asociados una asesorada en particular, dependiendo del id ingresado
   * @param idMother Id de la asesorada a obtener los datos
   */
  public getChildsList(idMother: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['child', idMother]);
    return this.http.get<ApiResponse>(url);
  }

  /**
   * Obtiene una lista con informacion resumida de las asesoradas
   */
  public getMothers(): Observable<ApiResponse> {
    const url: string = this.makeUrl(['mother']);
    return this.http.get<ApiResponse>(url);
  }

  /**
   * Obtiene la informacion de una asesorada en particular, dependiendo del id ingresado
   * @param idMother Id de la asesorada a obtener los datos
   */
  public getChild(idChild: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['child', 'profile', idChild]);
    return this.http.get<ApiResponse>(url);
  }

  /**
   * Obtiene una lista de los con informacion resumida de los controles pendientes
   * asociados a una asesorada en particular, dependiendo del id ingresado
   * @param idMother Id de la asesorada a obtener los datos
   */
  public getNextControls(idMother: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['control', idMother]);
    return this.http.get<ApiResponse>(url);
  }

  /**
   * Obtiene una lista de los con informacion resumida de los controles pasados
   * asociados a una asesorada en particular, dependiendo del id ingresado
   * @param idMother Id de la asesorada a obtener los datos
   */
  public getPastControls(idMother: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['control', 'past', idMother]);
    return this.http.get<ApiResponse>(url);
  }

  /**
   * Obtiene la informacion detallada de un control pasado de una asesorada
   * @param idControl Id del control a obtener su informacion
   */
  public getControl(idControl: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['control', 'profile', idControl]);
    return this.http.get<ApiResponse>(url);
  }

  /**
   * Obtiene la informacion de un usuario en particular
   * @param idUser Id del usuario
   */
  public getUserInfo(idUser: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['user', idUser]);
    return this.http.get<ApiResponse>(url);
  }

  /**
   * Obtiene una lista con informacion resumida de los usuarios registrados en el sistema
   */
  public getUsersList(): Observable<ApiResponse> {
    const url: string = this.makeUrl(['user']);
    return this.http.get<ApiResponse>(url);
  }
}
