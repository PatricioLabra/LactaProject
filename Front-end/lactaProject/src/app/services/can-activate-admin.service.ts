import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class CanActivateAdminService implements CanActivate{
  constructor(private router:Router) { }

  isLogged=1
  canActivate(){
    if(this.isLogged==null){
      console.log("No estas logeado");
      this.router.navigate([""])
      return false;
    }
    if(this.isLogged!=1){
      console.log("No estas logeado como admin");
      this.router.navigate([""])
      return false;
    }
    return true;
  }
}
