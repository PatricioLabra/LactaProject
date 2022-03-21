import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PastControlsComponent } from './pages/past-controls/past-controls.component';
import { FirstControlFormComponent } from './pages/first-control-form/first-control-form.component';
import { ControlFormComponent } from './pages/control-form/control-form.component';
import { CanActivateService } from 'src/app/services/can-activate.service';

const routes: Routes=[
  { path: "controls/past/:id", component: PastControlsComponent ,canActivate:[CanActivateService]},
  { path: "controls/agregar-control/:idChild/primer-control", component:FirstControlFormComponent, canActivate:[CanActivateService]},
  { path: "controls/seguimiento/:idChild", component:ControlFormComponent}
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
export class ControlsRoutingModule { }
