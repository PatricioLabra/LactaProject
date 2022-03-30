import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { UserInfoService } from './user-info.service';

@Injectable()
export class CanActivateService implements CanActivate{
  constructor(private router:Router , private userService:UserInfoService) { }

  isLogged;
  canActivate(){

    this.userService.getIsLoggedin.subscribe((response:boolean)=>{
      this.isLogged=response;
    });
    if(this.isLogged!=true){
      console.log("No estas logeado");
      this.router.navigate([""])
      return false;
    }
    return true;
  }
}
