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
