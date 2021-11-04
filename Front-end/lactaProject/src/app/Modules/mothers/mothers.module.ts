import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MothersViewComponent } from './pages/mothers-view/mothers-view.component';
import { MotherProfileComponent } from './pages/mother-profile/mother-profile.component';
import { MotherFormComponent } from './pages/mother-form/mother-form.component';
import { MotherDataComponent } from './components/mother-data/mother-data.component';
import { MothersListComponent } from './components/mothers-list/mothers-list.component';



@NgModule({
  declarations: [MothersViewComponent, MotherProfileComponent, MotherFormComponent, MotherDataComponent, MothersListComponent],
  imports: [
    CommonModule
  ],
  exports:[MothersViewComponent, MotherProfileComponent, MotherFormComponent, MotherDataComponent, MothersListComponent]
})
export class MothersModule { }
