import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private userService:UserInfoService) { }

  intercept(req, next) {
    const tokenizeReq= req.clone({
      setHeaders:{
        Authorization:`Bearer ${this.userService.getToken()}`
      }
    })
    return next.handle(tokenizeReq)
      
  }

  
}
