import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PastControlsComponent } from './pages/past-controls/past-controls.component';
import { InprocessControlComponent } from './pages/inprocess-control/inprocess-control.component';
import { MotherIncomingcontrolsListComponent } from './components/mother-incomingcontrols-list/mother-incomingcontrols-list.component';
import { ControlDataComponent } from './components/control-data/control-data.component';
import { ControlsListComponent } from './components/controls-list/controls-list.component';
import { ControlsRoutingModule } from './controls-routing.module';
import { PopUpPrintControlComponent } from './components/pop-up-print-control/pop-up-print-control.component';
import { PopupScheduleControlComponent } from './components/popup-schedule-control/popup-schedule-control.component';
import { PastControlsListComponent } from './components/past-controls-list/past-controls-list.component';

@NgModule({
  declarations: [
    PastControlsComponent,
    InprocessControlComponent,
    MotherIncomingcontrolsListComponent,
    ControlDataComponent,
    ControlsListComponent,
    PopUpPrintControlComponent,
    PopupScheduleControlComponent,
    PastControlsListComponent
  ],
  imports: [
    ControlsRoutingModule,
    SharedModule
  ],
  exports:[
    PastControlsComponent,
    InprocessControlComponent,
    MotherIncomingcontrolsListComponent,
    PopupScheduleControlComponent,
    ControlDataComponent,
    ControlsListComponent
  ]
})
export class ControlsModule { }
