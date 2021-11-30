import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { CanActivateService } from 'src/app/services/can-activate.service';

const routes: Routes=[
  { path: "control-panel", component: ControlPanelComponent , canActivate:[CanActivateService]}
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
