import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mother-form',
  templateUrl: './mother-form.component.html',
  styleUrls: ['./mother-form.component.scss']
})
export class MotherFormComponent implements OnInit {
  chronic_diseases:Array<string>=[];
  other_diseases:Array<string>=[];
  form:FormGroup;
  constructor(private fb:FormBuilder) {
    this.form=this.fb.group({
      name: ['', Validators.required],
      rut: ['',Validators.required],
      rut_vc: ['',Validators.required],
      comune: ['',Validators.required],
      phone_number: ['',Validators.required],
      mail: ['',Validators.email ],
      birth: ['',Validators.required],
      ocupation: ['',Validators.required],
      studies: ['',Validators.required],
      marital_status: ['',Validators.required],
      forecast: ['',Validators.required],
      number_of_children: ['',Validators.required],
      hipertension_a: ['',Validators.required],
      diabetes_m1: ['',Validators.required],
      diabetes_m2: ['',Validators.required],
      hipotiroidismo: ['',Validators.required],
      hipertiroidismo: ['',Validators.required],
      other: [''],
    });
   }

  ngOnInit(): void {
  }
  // Funcion que ACTUALMENTE solo se encarga de imprimir por consola los valores obtenidos en el formulario
  sendMotherData(){
    this.createList();
    console.log(this.form.get("name")?.value);
    console.log(this.form.get("rut")?.value + "-" + this.form.get("rut_vc")?.value);
    console.log(this.form.get("comune")?.value);
    console.log(this.form.get("phone_number")?.value);
    console.log(this.form.get("mail")?.value);
    console.log(this.form.get("birth")?.value);
    console.log(this.form.get("ocupation")?.value);
    console.log(this.form.get("studies")?.value);
    console.log(this.form.get("marital_status")?.value);
    console.log(this.form.get("forecast")?.value);
    console.log(this.form.get("number_of_children")?.value);
    console.log(this.chronic_diseases);
  }
  // Funcion que se encarga de crear enfermedades que no esten en la lista principal
 otherDiseaseFunction(){
    if(this.form.get("other")?.value != ""){
      this.chronic_diseases.push(this.form.get("other")?.value);
      this.other_diseases.push(this.form.get("other")?.value);
    }
  }
  // Funcion que crea una lista de enfermedades cronicas
  createList(){
    if(this.form.get("hipertension_a")?.value == true){
      this.chronic_diseases.push("hipertension arterial"); 
    }
    if(this.form.get("diabetes_m1")?.value == true){
      this.chronic_diseases.push("diabetes mellitus 1"); 
    }
    if(this.form.get("diabetes_m2")?.value == true){
      this.chronic_diseases.push("diabetes mellitus 2"); 
    }
    if(this.form.get("hipotiroidismo")?.value == true){
      this.chronic_diseases.push("hipotiroidismo"); 
    }
    if(this.form.get("hipertiroidismo")?.value == true){
      this.chronic_diseases.push("hipertiroidismo"); 
    }
    if(this.chronic_diseases.length == 0){
      this.chronic_diseases.push("ninguna");
    }
  }
}
