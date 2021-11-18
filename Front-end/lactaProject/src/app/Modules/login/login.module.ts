import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { PostloginViewComponent } from './pages/postlogin-view/postlogin-view.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [LoginViewComponent, PostloginViewComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  exports: [LoginViewComponent, PostloginViewComponent]
})
export class LoginModule { }
