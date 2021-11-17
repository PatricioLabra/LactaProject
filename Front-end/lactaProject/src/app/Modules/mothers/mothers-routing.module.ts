import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MothersViewComponent } from './pages/mothers-view/mothers-view.component';
import { MotherFormComponent } from './pages/mother-form/mother-form.component';



const routes: Routes=[
  {path:"asesoradas", component:MothersViewComponent},
  {path:"asesoradas/agregar",component:MotherFormComponent}
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
