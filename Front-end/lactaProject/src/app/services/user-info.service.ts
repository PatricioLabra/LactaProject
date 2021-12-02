import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { typeUser } from '@interfaces/user';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiClass } from './api.class';
import { ApiResponse } from '@interfaces/api_response';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService extends ApiClass{

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private helper = new JwtHelperService();

  changeUser: Subject<{isLogged: boolean, isAdmin: boolean, nickname: string}> = new Subject();
  changesUser$ =  this.changeUser.asObservable();

  isLogged: boolean;
  isAdmin: boolean;
  userInfo: typeUser;
  token: string;

  constructor(http: HttpClient) {
    super(http);
    this.resetUserData();
    this.checkToken();
  }

  public signInUser(user: string, pass: string): Observable<ApiResponse> {
    const url: string = this.makeUrl(['user', 'signin']);
    return this.http.post<ApiResponse>(url, { rut: user, password: pass }).pipe(map(res => {
      this.isLoggedIn.next(true);
      this.saveData(res);
      return res;
    }));
  }

  /**
   * Se encarga de verificar si hay un token valido en el session Storage
   */
  private checkToken():void {
    const token : string | null= sessionStorage.getItem('token');
    if (token?.length != 0 && token != null && !this.helper.isTokenExpired(token)) {
      this.isLoggedIn.next(true);
    } else {
      this.signOutUser()
      this.isLoggedIn.next(false)
    }
  }

  /**
   * Verifica si hay una sesion activa
   */
  get getIsLoggedin():Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  /**
   * Guarda el token en el session storage
   */
  private saveData(data:any) {
    let id:any = this.helper.decodeToken(data.data.token);
    sessionStorage.setItem('user_id', id._id);
    sessionStorage.setItem('token', data.data.token);
  }

    /**
   * Cierra la sesion
   */
  public signOutUser() {
    this.resetUserData();
    sessionStorage.clear();
    this.isLoggedIn.next(false);
  }

  /**
   * Reestablece los datos del usuario a valores por defecto
   */
  private resetUserData() {
    this.isLogged = false;
    this.isAdmin = false;
    this.userInfo = null;
    this.token = '';
  }
}
