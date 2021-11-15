import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChildProfileComponent } from './pages/child-profile/child-profile.component';



const routes: Routes=[
  {path:"perfil/lactante",component:ChildProfileComponent}//temporal
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
export class ChildsRoutingModule { }
