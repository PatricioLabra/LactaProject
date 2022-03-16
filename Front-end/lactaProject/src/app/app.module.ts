import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { LoginModule } from '@login/login.module';
import { SharedModule } from '@shared/shared.module';
import { MothersModule } from '@mothers/mothers.module';
import { ChildsModule } from '@childs/childs.module';
import { ProfessionalsModule } from '@professionals/professionals.module';
import { ControlsModule } from '@controls/controls.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanActivateAdminService } from './services/can-activate-admin.service';
import { CanActivateService } from './services/can-activate.service';
import {DatePipe} from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LoginModule,
    SharedModule,
    MothersModule,
    ChildsModule,
    ProfessionalsModule,
    ControlsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [CanActivateAdminService,CanActivateService,DatePipe,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
