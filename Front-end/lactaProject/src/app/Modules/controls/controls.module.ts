import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastControlsComponent } from './pages/past-controls/past-controls.component';
import { InprocessControlComponent } from './pages/inprocess-control/inprocess-control.component';
import { MotherIncomingcontrolsListComponent } from './components/mother-incomingcontrols-list/mother-incomingcontrols-list.component';
import { ControlDataComponent } from './components/control-data/control-data.component';
import { AddControlComponent } from './components/add-control/add-control.component';
import { ControlsListComponent } from './components/controls-list/controls-list.component';
import { ControlsRoutingModule } from './controls-routing.module';
import { PopUpPrintControlComponent } from './components/pop-up-print-control/pop-up-print-control.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [PastControlsComponent, InprocessControlComponent, MotherIncomingcontrolsListComponent, ControlDataComponent, AddControlComponent, ControlsListComponent, PopUpPrintControlComponent],
  imports: [
    CommonModule,
    ControlsRoutingModule,
    MDBBootstrapModule
  ],
  exports:[PastControlsComponent, InprocessControlComponent, MotherIncomingcontrolsListComponent, ControlDataComponent, AddControlComponent, ControlsListComponent]
})
export class ControlsModule { }
