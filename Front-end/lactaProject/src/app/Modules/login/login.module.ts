import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { PostloginViewComponent } from './pages/postlogin-view/postlogin-view.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ForgotPasswordViewComponent } from './pages/forgot-password-view/forgot-password-view.component';
import { ResetPasswordViewComponent } from './pages/reset-password-view/reset-password-view.component';


@NgModule({
  declarations: [LoginViewComponent, PostloginViewComponent, ForgotPasswordViewComponent, ResetPasswordViewComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  exports: [LoginViewComponent, PostloginViewComponent]
})
export class LoginModule { }
