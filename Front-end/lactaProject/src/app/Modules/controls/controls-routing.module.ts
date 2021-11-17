import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PastControlsComponent } from './pages/past-controls/past-controls.component';
import { FirstControlFormComponent } from './pages/first-control-form/first-control-form.component';
import { ControlFormComponent } from './pages/control-form/control-form.component';

const routes: Routes=[
  {path:"prueba",component:PastControlsComponent},
  {path: "prueba2", component:FirstControlFormComponent},
  {path: "prueba3", component:ControlFormComponent}
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
