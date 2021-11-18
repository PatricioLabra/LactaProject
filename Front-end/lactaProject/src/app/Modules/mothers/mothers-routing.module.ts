import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MothersViewComponent } from './pages/mothers-view/mothers-view.component';
import { MotherProfileComponent } from './pages/mother-profile/mother-profile.component';
import { MotherFormComponent } from './pages/mother-form/mother-form.component';

const routes: Routes=[
  { path: "asesoradas", component: MothersViewComponent },
  { path: "asesoradas/profile/:id", component: MotherProfileComponent},
  { path:"asesoradas/agregar/:id", component: MotherFormComponent},
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
