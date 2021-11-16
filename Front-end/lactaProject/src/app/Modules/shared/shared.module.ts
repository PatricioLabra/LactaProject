import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule
  ],
  exports: [
    ReactiveFormsModule,
    MDBBootstrapModule
  ]
})
export class SharedModule { }
