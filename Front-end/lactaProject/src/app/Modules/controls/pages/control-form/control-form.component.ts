import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-form',
  templateUrl: './control-form.component.html',
  styleUrls: ['./control-form.component.scss']
})
export class ControlFormComponent implements OnInit {
  indications:Array<string>=[];
  form:FormGroup;
  constructor(private fb:FormBuilder) {
    this.form=this.fb.group({
      consultation_place: ['domicilio',Validators.required],
      monitoring_medium: ['whatsapp',Validators.required],
      date_control: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      reason_of_consultation: ['', Validators.required],
      other_consultation: [''],
      accompanied_by: ['', Validators.required],
      other_companion: [''],
      emotional_status: ['', Validators.required],
      observations: ['', Validators.required],
      mejorar_acople: [''],
      a_frecuencia: [''],
      pezonera: [''],
      sonda_al_dedo: [''],
      relactacion: [''],
      next_control: ['false'],
      consultation_place2: [''],
      monitoring_medium2: [''],
      date_control2: ['']
    });
   }
  ngOnInit(): void {
  }
  // Funcion que imprime por consola los form control value
  sendControlData(){
    this.createList;
    console.log(this.form.get("consultation_place")?.value);
    console.log(this.form.get("monitoring_medium")?.value);
    console.log(this.form.get("date_control")?.value);
    console.log(this.form.get("age")?.value);
    console.log(this.form.get("weight")?.value);
    console.log(this.form.get("reason_of_consultation")?.value);
    console.log(this.form.get("other_consultation")?.value);
    console.log(this.form.get("accompanied_by")?.value);
    console.log(this.form.get("other_companion")?.value);
    console.log(this.form.get("emotional_status")?.value);
    console.log(this.form.get("observations")?.value);
    console.log(this.indications);
    console.log(this.form.get("next_control")?.value);
    console.log(this.form.get("consultation_place2")?.value);
    console.log(this.form.get("monitoring_medium2")?.value);
    console.log(this.form.get("date_control2")?.value);
  }

  // Funcion que crea una lista de enfermedades cronicas
  createList(){
    if(this.form.get("mejorar_acople")?.value == true){
      this.indications.push("mejorar acople"); 
    }
    if(this.form.get("a_frecuencia")?.value == true){
      this.indications.push("aumento de frecuencia al pecho/extractor"); 
    }
    if(this.form.get("pezonera")?.value == true){
      this.indications.push("pezonera"); 
    }
    if(this.form.get("sonda_al_dedo")?.value == true){
      this.indications.push("sonda al dedo"); 
    }
    if(this.form.get("relactacion")?.value == true){
      this.indications.push("relactación"); 
    }
    if(this.indications.length == 0){
      this.indications.push("ninguna");
    }
  }
}
