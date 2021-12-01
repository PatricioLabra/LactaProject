import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoreRoutingModule } from './core-routing.module';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { StadisticsPanelComponent } from './pages/stadistics-panel/stadistics-panel.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ControlPanelComponent,
    StadisticsPanelComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MDBBootstrapModule,
    HttpClientModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    ControlPanelComponent
  ],
})
export class CoreModule { }
