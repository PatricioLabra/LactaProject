import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserInfoService } from './user-info.service';

@Injectable()
export class CanActivateAdminService implements CanActivate{
  constructor(private router:Router, private userService:UserInfoService) { }

  isLogged;
  rol;
  canActivate(){
    this.userService.getUserInfo.subscribe((response:any)=>{
      this.rol=response.role;
    });
    this.userService.getIsLoggedin.subscribe((response:boolean)=>{
      this.isLogged=response;
    });
    if(this.isLogged!=true){
      console.log("No estas logeado");
      this.router.navigate([""])
      return false;
    }
    if(this.rol!=1){
      console.log("No estas logeado como admin");
      this.router.navigate([""])
      return false;
    }
    return true;
  }
}
