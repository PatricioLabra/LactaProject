import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ApiResponse } from '@interfaces/api_response';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';
import { ActivatedRoute, Router } from '@angular/router';
import { typeControl } from '@interfaces/control';
import { Location } from '@angular/common';

@Component({
  selector: 'app-first-control-form',
  templateUrl: './first-control-form.component.html',
  styleUrls: ['./first-control-form.component.scss']
})
export class FirstControlFormComponent implements OnInit {
  idChild="";
  indications:Array<string>=[];
  other_indications = [];
  
  form:FormGroup;
  constructor(private location:Location , private fb:FormBuilder, private apiSend:ApiSendService, private apiGet:ApiGetService, private router:Router, private route:ActivatedRoute) {
    this.idChild = this.route.snapshot.paramMap.get('idChild')as string;
    
    this.form=this.fb.group({
      consultation_place: [''],
      monitoring_medium: [''],
      date_control: [new Date().toISOString().split('T')[0], Validators.required],
      age: ['', Validators.required],
      age_type: ['month'],
      weight: [''],
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
      date_control2: [''],
      new_indication: [''],
      other: new FormArray([
      ]),
    });
   }
  ngOnInit(): void {
  }


  // Funcion que imprime por consola los form control value
  public sendControlData(){
    this.createList();
    let reason = this.form.get("reason_of_consultation")?.value;
    let companion = this.form.get("accompanied_by")?.value;
    if ( this.form.get('reason_of_consultation')?.value == 'otras' ) {
      reason = this.form.get("other_consultation")?.value
    }
    if ( this.form.get('accompanied_by')?.value == 'otras' ) {
      companion = this.form.get("other_companion")?.value
    }
    let controlData:typeControl={
      
        consultation_place: this.form.get("consultation_place")?.value,
        monitoring_medium: this.form.get("monitoring_medium")?.value,
        date_control: this.form.get("date_control")?.value,
        age: this.calculateAge(),
        weight: this.form.get("weight")?.value,
        reason_of_consultation: reason,
        accompanied_by: companion,
        emotional_status: this.form.get("emotional_status")?.value,
        observations: this.form.get("observations")?.value,
        indications: this.indications,

    }
    this.apiSend.addControl(controlData,this.idChild).subscribe((response:ApiResponse)=>{
      if(this.form.get("next_control")?.value == 'true'){
        let nextControlData:typeControl={
          consultation_place: this.form.get("consultation_place2")?.value,
          monitoring_medium: this.form.get("monitoring_medium2")?.value,
          date_control: this.form.get("date_control2")?.value,
        }
        this.apiSend.addControl(nextControlData,this.idChild).subscribe((response:ApiResponse)=>{
        }); 
      }
      this.goToMotherProfile();
    });
  }

  goToMotherView(){
    const url:string = 'asesoradas/';
    this.router.navigate([url]);
  }

  goToMotherProfile() {
    this.location.back()
  }

  // Funcion que re calcula la edad a semanas
  private calculateAge = () => {

    let new_age = 0;
    const age = this.form.get('age')?.value;
    const age_type = this.form.get('age_type')?.value;

    if ( age_type == 'day' ) new_age = age / 7;
    if ( age_type == 'week' ) new_age = age;
    if ( age_type == 'month' ) new_age = age * 4.34524;
    if ( age_type == 'year' ) new_age = age * 52.1429;
    return new_age;
  }

  newIndication = () => {
    if ( this.other_indications.indexOf(this.form.get("new_indication")?.value) == -1) {
      (<FormArray>this.form.get('other')).push( new FormControl(true));
      this.other_indications.push(this.form.get("new_indication")?.value);
      this.form.get("new_disease")?.setValue('');
    }else{
      console.log('este valor ya existe');
    }
  }

  // Funcion que crea una lista de enfermedades cronicas
  private createList(){
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
    this.form.get('other')['controls'].forEach((element, index) => {
      if (element.value) {
        this.indications.push(this.other_indications[index]);
      }
    });
    if(this.indications.length == 0){
      this.indications.push("ninguna");
    }
  }
}
