import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';

@Injectable()
export class CanActivateService implements CanActivate{
  constructor(private router:Router) { }

  isLogged=1
  canActivate(){
    if(this.isLogged==null){
      console.log("No estas logeado");
      this.router.navigate([""])
      return false;
    }
    return true;
  }
}
