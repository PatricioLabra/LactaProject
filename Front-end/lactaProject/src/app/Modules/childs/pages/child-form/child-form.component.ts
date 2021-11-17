import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss']
})
export class ChildFormComponent implements OnInit {
  chronic_diseases:Array<string>=[];
  other_diseases:Array<string>=[];
  form:FormGroup;
  constructor(private fb:FormBuilder) {
    this.form=this.fb.group({
      name: ['', Validators.required],
      sintoma_parto_prematuro: [''],
      preeclampsia: [''],
      eclampsia: [''],
      diabetes_gestacional: [''],
      hipotiroidismo: [''],
      hipertiroidismo: [''],
      e_autoinmune: [''],
      other: [''],
      nutritional_status_mother: ['normal', Validators.required],
      planned_pregnancy: ['false', Validators.required],
      assisted_fertilization: ['false', Validators.required],
      previous_lactaction: ['ninguna', Validators.required],
      duration_of_past_lactaction_in_months: [''],
      breastfeeding_education: ['false', Validators.required],
      birthplace: ['publico', Validators.required],
      type_of_birth: ['parto', Validators.required],
      birth: ['', Validators.required],
      gestional_age: ['', Validators.required],
      gender: ['indefinido', Validators.required],
      birth_weight: ['', Validators.required],
      has_suplement: ['false', Validators.required],
      why_recived_suplement: [''],
      joint_accommodation: ['false', Validators.required],
      use_of_pacifier: ['false', Validators.required],
      breastfeeding_b4_2hours: ['false', Validators.required],
      post_discharge_feeding: ['lme', Validators.required],
      skin_to_skin_contact: ['false', Validators.required],
      last_weight_control: ['', Validators.required]
    });
   }
  ngOnInit(): void {
  }

  // Funcion que ACTUALMENTE solo se encarga de imprimir por consola los valores obtenidos en el formulario
  sendProfessionalData(){
    this.createList();
    console.log(this.chronic_diseases);
    console.log(this.form.get("nutritional_status_mother")?.value);
    console.log(this.form.get("planned_pregnancy")?.value);
    console.log(this.form.get("assisted_fertilization")?.value);
    console.log(this.form.get("previous_lactaction")?.value);
    console.log(this.form.get("duration_of_past_lactaction_in_months")?.value);
    console.log(this.form.get("breastfeeding_education")?.value);
    console.log(this.form.get("birthplace")?.value);
    console.log(this.form.get("birth")?.value);
    console.log(this.form.get("gestional_age")?.value);
    console.log(this.form.get("gender")?.value);
    console.log(this.form.get("birth_weight")?.value);
    console.log(this.form.get("why_recived_suplement")?.value);
    console.log(this.form.get("use_of_pacifier")?.value);
    console.log(this.form.get("breastfeeding_b4_2hours")?.value);
    console.log(this.form.get("post_discharge_feeding")?.value);
    console.log(this.form.get("skin_to_skin_contact")?.value);
    console.log(this.form.get("last_weight_control")?.value);
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
    if(this.form.get("sintoma_parto_prematuro")?.value == true){
      this.chronic_diseases.push("sintoma de parto prematuro"); 
    }
    if(this.form.get("preeclampsia")?.value == true){
      this.chronic_diseases.push("preeclampsia"); 
    }
    if(this.form.get("eclampsia")?.value == true){
      this.chronic_diseases.push("eclampsia"); 
    }
    if(this.form.get("diabetes_gestacional")?.value == true){
      this.chronic_diseases.push("diabetes gestacional"); 
    }
    if(this.form.get("hipotiroidismo")?.value == true){
      this.chronic_diseases.push("hipotiroidismo"); 
    }
    if(this.form.get("hipertiroidismo")?.value == true){
      this.chronic_diseases.push("hipertiroidismo"); 
    }
    if(this.form.get("e_autoinmune")?.value == true){
      this.chronic_diseases.push("enfermedad autoinmune"); 
    }
    if(this.chronic_diseases.length == 0){
      this.chronic_diseases.push("ninguna");
    }
  }
}
