import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalsViewComponent } from './pages/professionals-view/professionals-view.component';
import { ProfessionalProfileComponent } from './pages/professional-profile/professional-profile.component';
import { ProfessionalsListComponent } from './components/professionals-list/professionals-list.component';
import { ProfessionalDataComponent } from './components/professional-data/professional-data.component';
import { ProfessionalFormComponent } from './pages/professional-form/professional-form.component';
import { ProfessionalsRoutingModule } from './professionals-routing.module';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ProfessionalsViewComponent, 
    ProfessionalProfileComponent, 
    ProfessionalsListComponent, 
    ProfessionalDataComponent, 
    ProfessionalFormComponent],
  imports: [
    CommonModule,
    ProfessionalsRoutingModule,
    SharedModule,
  ],
  exports: [
    ProfessionalDataComponent, 
    ProfessionalProfileComponent, 
    ProfessionalsListComponent, 
    ProfessionalsViewComponent, 
    ProfessionalFormComponent
  ]
})
export class ProfessionalsModule { }
