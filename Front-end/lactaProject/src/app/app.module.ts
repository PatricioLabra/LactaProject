import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './Modules/core/core.module';
import { LoginModule } from './Modules/login/login.module';
import { SharedModule } from './Modules/shared/shared.module';
import { MothersModule } from './Modules/mothers/mothers.module';
import { ChildsModule } from './Modules/childs/childs.module';
import { ProfessionalsModule } from './Modules/professionals/professionals.module';
import { ControlsModule } from './Modules/controls/controls.module';

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
    ControlsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
