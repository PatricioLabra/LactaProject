import { Injectable } from '@angular/core';
import { typeUser } from '@interfaces/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  changeUser: Subject<{isLogged: boolean, isAdmin: boolean, nickname: string}> = new Subject();
  changesUser$ =  this.changeUser.asObservable();

  isLogged: boolean;
  isAdmin: boolean;
  userInfo: typeUser;
  token: string;

  constructor() {
    this.resetUserData();
  }

  public signInUser(rut: string, password: string) {
    // TODO
  }

  public signOutUser() {
    this.resetUserData();
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
