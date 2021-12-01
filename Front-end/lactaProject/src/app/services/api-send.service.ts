import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { ApiClass } from './api.class';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiResponse } from '@interfaces/api_response';
import { typeMother } from '@interfaces/mother';
import { typeChild } from '@interfaces/child';
import { typeControl } from '@interfaces/control';
import { typeUser } from '@interfaces/user';

@Injectable({
  providedIn: CoreModule
})
export class ApiSendService extends ApiClass {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<string>('');
  private helper = new JwtHelperService();

  constructor(http: HttpClient) {
    super(http);
    this.checkToken();
  }

  /**
   * Agrega una nueva madra al sistema
   * @param motherInfo Informacion de la nueva madra a agregar
   */
  public addMother(motherInfo: typeMother): Observable<ApiResponse> {
    const url: string = this.makeUrl(['mother']);
    return this.http.post<ApiResponse>(url, motherInfo);
  }

  /**
   * Modifica la informacion de una asesorada a partir de su id
   * @param idMother Id de la asesorada a modificar sus datos
   */
  public updateMother(motherInfo: typeMother): Observable<ApiResponse> {
    const url: string = this.makeUrl(['mother', motherInfo._id]);
    return this.http.put<ApiResponse>(url, motherInfo);
  }

  /**
   * Elimina una asesorada del sistema
   * @param idMother Id de la asesorada a eliminar
   */
  public deleteMother(idMother: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['mother', idMother]);
    return this.http.delete<ApiResponse>(url);
  }

  /**
   * Agrega un nuevo lactante al sistema
   * @param childInfo Informacion del nuevo lactance a agregar
   * @param idMother Id de la asesorada asociada al lactance
   */
  public addChild(childInfo: typeChild, idMother: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['child', idMother]);
    return this.http.post<ApiResponse>(url, childInfo);
  }

  /**
   * Modifica la informacion de una asesorada a partir de su id
   * @param idMother Id de la asesorada a modificar sus datos
   */
  public updateChild(childInfo: typeChild): Observable<ApiResponse> {
    const url: string = this.makeUrl(['child', childInfo._id]);
    return this.http.put<ApiResponse>(url, childInfo);
  }

  /**
   * Elimina un lactante del sistema
   * @param idChild Id del lactante a eliminar
   */
  public deleteChild(idChild: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['child', idChild]);
    return this.http.delete<ApiResponse>(url);
  }

  /**
   * Agrega un nuevo control al sistema
   * @param controlInfo Informacion del control a agregar
   */
  public addControl(controlInfo: typeControl, idChild: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['control']);
    return this.http.post<ApiResponse>(url, { dataNewControl: controlInfo, id_child: idChild });
  }

  /**
   * Actualiza la informacion de un control en especifico
   * @param controlInfo Nueva informacion a actualizar del control
   */
  public updateControl(controlInfo: typeControl): Observable<ApiResponse> {
    const url: string = this.makeUrl(['control', controlInfo._id]);
    return this.http.put<ApiResponse>(url, controlInfo);
  }

  /**
   * Elimina un control del sistema usando su id
   * @param idControl Id del control a eliminar
   */
  public deleteControl(idControl: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['control', idControl]);
    return this.http.delete<ApiResponse>(url);
  }

  /**
   * Agrega un nuevo usuario al sistema
   * @param userInfo Informacion del usuario a agregar
   */
  public addUser(userInfo: typeUser): Observable<ApiResponse> {
    const url: string = this.makeUrl(['user', 'signUp']);
    return this.http.post<ApiResponse>(url, userInfo);
  }

  /**
   * Actualiza la informacion de un usuario
   * @param userInfo Nueva informacion del usuario
   */
  public editUser(userInfo: typeUser): Observable<ApiResponse> {
    const url: string = this.makeUrl(['user', userInfo._id]);
    return this.http.put<ApiResponse>(url, userInfo);
  }

  /**
   * Elimina un usuario del sistema usando su id
   * @param idUser Id del usuario a eliminar
   */
  public deleteUser(idUser: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['user', idUser]);
    return this.http.delete<ApiResponse>(url);
  }

  /**
   * Inicia sesion
   * @param user Usuario que va a iniciar sesion
   * @param pass Contraseña del usuario que va a iniciar sesion
   */

  public signIn(user: string, pass: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['user', 'signin']);
    return this.http.post<ApiResponse>(url, { rut: user, password: pass }).pipe(map(res => {
      this.isLoggedIn.next(true);
      this.saveData(res);
      this.user.next(sessionStorage.getItem('nombre') || '')
      return res;
    }));
  }

   // verifica si hay un token en el sessionStorage
   private checkToken():void {
    const token : string | null= sessionStorage.getItem('token');

    if (token?.length != 0 && token != null && !this.helper.isTokenExpired(token)) {
      this.isLoggedIn.next(true);
    } else {
      this.logout()
      this.isLoggedIn.next(false)
    }
  }

  public logout(){
    sessionStorage.clear();
    this.isLoggedIn.next(false);
  }

  private saveData(data:any) {
    sessionStorage.setItem('token', data.data.token);
  }
}
