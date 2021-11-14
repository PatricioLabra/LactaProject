import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthDataComponent } from './components/birth-data/birth-data.component';
import { ChildsListComponent } from './components/childs-list/childs-list.component';
import { LactancyDataComponent } from './components/lactancy-data/lactancy-data.component';
import { ChildFormComponent } from './pages/child-form/child-form.component';
import { ChildProfileComponent } from './pages/child-profile/child-profile.component';
import { ChildsRoutingModule } from './childs-routing.module';



@NgModule({
  declarations: [
    BirthDataComponent,
    ChildsListComponent,
    LactancyDataComponent,
    ChildFormComponent,
    ChildProfileComponent
  ],
  imports: [
    CommonModule,
    ChildsRoutingModule
  ],
  exports:[
    BirthDataComponent,
    ChildsListComponent,
    LactancyDataComponent,
    ChildFormComponent,
    ChildProfileComponent
  ]
})
export class ChildsModule { }
