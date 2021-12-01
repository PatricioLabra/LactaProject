import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { CanActivateService } from 'src/app/services/can-activate.service';
import { StadisticsPanelComponent } from './pages/stadistics-panel/stadistics-panel.component';

const routes: Routes=[
  { path: "control-panel", component: ControlPanelComponent , canActivate:[CanActivateService]},
  { path: "panel-estadisticas",component:StadisticsPanelComponent, canActivate:[CanActivateService]}
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
export class CoreRoutingModule { }
