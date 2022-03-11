import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { PostloginViewComponent } from './pages/postlogin-view/postlogin-view.component';
import { CanActivateAdminService } from 'src/app/services/can-activate-admin.service';
import { ForgotPasswordViewComponent } from './pages/forgot-password-view/forgot-password-view.component';
import { ResetPasswordViewComponent } from './pages/reset-password-view/reset-password-view.component';

const routes: Routes=[
  { path: '', component: LoginViewComponent },
  {path:'forgotPassword',component:ForgotPasswordViewComponent},
  {path:'user/resetPassword/:token',component:ResetPasswordViewComponent},
  { path: 'postlogin', component: PostloginViewComponent , canActivate:[CanActivateAdminService]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
