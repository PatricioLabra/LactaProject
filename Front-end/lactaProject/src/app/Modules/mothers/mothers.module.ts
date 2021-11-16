import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MothersViewComponent } from './pages/mothers-view/mothers-view.component';
import { MotherProfileComponent } from './pages/mother-profile/mother-profile.component';
import { MotherFormComponent } from './pages/mother-form/mother-form.component';
import { MotherDataComponent } from './components/mother-data/mother-data.component';
import { MothersListComponent } from './components/mothers-list/mothers-list.component';
import { SharedModule } from '@shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MothersRoutingModule } from './mothers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildsListComponent } from './components/childs-list/childs-list.component';
import { ControlsListComponent } from './components/controls-list/controls-list.component';


@NgModule({
  declarations: [
    MothersViewComponent, 
    MotherProfileComponent, 
    MotherFormComponent, 
    MotherDataComponent, 
    MothersListComponent,
    ChildsListComponent,
    ControlsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModule,
    MothersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    MothersViewComponent,
    MotherProfileComponent,
    MotherFormComponent,
    MotherDataComponent,
    MothersListComponent
  ]
})
export class MothersModule { }
