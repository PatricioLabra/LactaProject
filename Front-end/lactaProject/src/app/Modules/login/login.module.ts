import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { PostloginViewComponent } from './pages/postlogin-view/postlogin-view.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [LoginViewComponent, PostloginViewComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
