import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  
  form:FormGroup;
  constructor(private location:Location , private fb:FormBuilder, private apiSend:ApiSendService, private apiGet:ApiGetService, private router:Router, private route:ActivatedRoute) {
    this.idChild = this.route.snapshot.paramMap.get('idChild')as string;
    console.log(this.idChild);
    
    this.form=this.fb.group({
      consultation_place: ['domicilio'],
      monitoring_medium: ['whatsapp'],
      date_control: [new Date().toISOString().split('T')[0], Validators.required],
      age: ['', Validators.required],
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
      date_control2: ['']
    });
   }
  ngOnInit(): void {
  }


  // Funcion que imprime por consola los form control value
  sendControlData(){
    this.createList();
    let controlData:typeControl={
      
        consultation_place: this.form.get("consultation_place")?.value,
        monitoring_medium: this.form.get("monitoring_medium")?.value,
        date_control: this.form.get("date_control")?.value,
        weight: this.form.get("weight")?.value,
        reason_of_consultation: this.form.get("reason_of_consultation")?.value,
        accompanied_by: this.form.get("accompanied_by")?.value,
        emotional_status: this.form.get("emotional_status")?.value,
        observations: this.form.get("observations")?.value,
        indications: this.indications,

    }
    console.log(this.indications);
    this.apiSend.addControl(controlData,this.idChild).subscribe((response:ApiResponse)=>{
      console.log(response);
      if(this.form.get("next_control")?.value == 'true'){
        let nextControlData:typeControl={
          consultation_place: this.form.get("consultation_place2")?.value,
          monitoring_medium: this.form.get("monitoring_medium2")?.value,
          date_control: this.form.get("date_control2")?.value,
        }
        this.apiSend.addControl(nextControlData,this.idChild).subscribe((response:ApiResponse)=>{
          console.log(response);
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
