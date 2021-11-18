import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiResponse } from '@interfaces/api_response';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';
import { ActivatedRoute, Router } from '@angular/router';
import { typeChild} from '@interfaces/child';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss']
})
export class ChildFormComponent implements OnInit {
  id="";
  motherId="";
  chronic_diseases:Array<string>=[];
  other_diseases:Array<string>=[];
  form:FormGroup;
  constructor(private fb:FormBuilder, private apiSend:ApiSendService, private apiGet:ApiGetService, private router:Router, private route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('idChild')as string;
    console.log(this.id);
    this.motherId = this.route.snapshot.paramMap.get('idMother')as string;
    console.log(this.motherId);
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
  sendChildData(){
    this.createList();
    let childData:typeChild={
      name: this.form.get("name")?.value,
      gestacion_data: {
        diseases_during_pregnancy: this.chronic_diseases,
        nutritional_status_mother: this.form.get("nutritional_status_mother")?.value,
        planned_pregnancy: this.form.get("planned_pregnancy")?.value,
        assisted_fertilization: this.form.get("assisted_fertilization")?.value,
        previous_lactaction: this.form.get("previous_lactaction")?.value,
        duration_of_past_lactaction_in_months: this.form.get("duration_of_past_lactaction_in_months")?.value,
        breastfeeding_education: this.form.get("breastfeeding_education")?.value,
      },
      birth_data:{
        birthplace: this.form.get("birthplace")?.value,
        type_of_birth: this.form.get("type_of_birth")?.value,
        birthday: this.form.get("birth")?.value,
        gestional_age: this.form.get("gestional_age")?.value,
        gender: this.form.get("gender")?.value,
        birth_weight: this.form.get("birth_weight")?.value,
        skin_to_skin_contact: this.form.get("skin_to_skin_contact")?.value,
        breastfeeding_b4_2hours: this.form.get("breastfeeding_b4_2hours")?.value,
        has_suplement: this.form.get("has_suplement")?.value,
        why_recived_suplement: this.form.get("why_recived_suplement")?.value,
        joint_accommodation: this.form.get("joint_accommodation")?.value,
        use_of_pacifier: this.form.get("use_of_pacifier")?.value,
        post_discharge_feeding: this.form.get("post_discharge_feeding")?.value,
        last_weight_control: this.form.get("last_weight_control")?.value
      }
    }
    console.log(childData);
    this.apiSend.addChild(childData,this.motherId).subscribe((response:ApiResponse)=>{
      console.log(response);
      this.goToMotherProfile(this.motherId);
    });
  }

  goToMotherProfile(idMother:string){
    const url:string = 'asesoradas/profile/' + idMother;
    this.router.navigate([url]);
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
