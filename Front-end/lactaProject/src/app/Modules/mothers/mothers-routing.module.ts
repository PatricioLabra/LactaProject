import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MothersViewComponent } from './pages/mothers-view/mothers-view.component';



const routes: Routes=[
  {path:"asesoradas", component:MothersViewComponent}
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
export class MothersRoutingModule { }
