import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PopUpPrintControlComponent } from './components/pop-up-print-control/pop-up-print-control.component';



const routes: Routes=[
  {path:"prueba",component:PopUpPrintControlComponent}
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
