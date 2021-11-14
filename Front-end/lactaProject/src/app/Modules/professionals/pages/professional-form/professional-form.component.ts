import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.scss']
})
export class ProfessionalFormComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder) {
    this.form=this.fb.group({
      name: ['', Validators.required],
      rut: ['', Validators.required],
      rut_vc: ['', Validators.required],
      password: ['', Validators.required],
      mail: ['', [Validators.email, Validators.required]],
      permission_level: ['0', Validators.required]
    });
   }
  ngOnInit(): void {
  }

  // Funcion que ACTUALMENTE solo se encarga de imprimir por consola los valores obtenidos en el formulario
  sendProfessionalData(){
    console.log(this.form.get("name")?.value);
    console.log(this.form.get("rut")?.value + "-" + this.form.get("rut_vc")?.value);
    console.log(this.form.get("password")?.value);
    console.log(this.form.get("mail")?.value);
    console.log(this.form.get("permission_level")?.value);
  }
}
