import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfessionalsViewComponent } from './pages/professionals-view/professionals-view.component';
import { ProfessionalFormComponent } from './pages/professional-form/professional-form.component';



const routes: Routes=[
  {path:"profesionales",component:ProfessionalsViewComponent},
  {path:"profesionales/agregar/:id",component:ProfessionalFormComponent}
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
export class ProfessionalsRoutingModule { }
