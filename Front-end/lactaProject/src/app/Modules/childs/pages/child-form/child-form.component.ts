import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ApiResponse } from '@interfaces/api_response';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';
import { ActivatedRoute, Router } from '@angular/router';
import { typeChild} from '@interfaces/child';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss']
})
export class ChildFormComponent implements OnInit {
  private element:any;
  id="";
  motherId="";
  chronic_diseases:Array<string>=[];
  other_diseases:Array<string>=[];
  form:FormGroup;
  constructor(
    private datePipe:DatePipe,
    private fb:FormBuilder, 
    private apiSend:ApiSendService, 
    private apiGet:ApiGetService, 
    private router:Router, 
    private route:ActivatedRoute,
    private location: Location
    ) {
    this.form=this.fb.group({
      name: ['', Validators.required],
      sintoma_parto_prematuro: [''],
      preeclampsia: [''],
      eclampsia: [''],
      diabetes_gestacional: [''],
      hipotiroidismo: [''],
      hipertiroidismo: [''],
      e_autoinmune: [''],
      new_disease: [''],
      other: new FormArray([
      ]),
      nutritional_status_mother: ['normal'],
      planned_pregnancy: ['false'],
      assisted_fertilization: ['false'],
      previous_lactaction: ['ninguna'],
      duration_of_past_lactaction_in_months: ['0'],
      breastfeeding_education: ['false'],
      birthplace: ['publico', Validators.required],
      type_of_birth: ['parto', Validators.required],
      birth: ['', Validators.required],
      gestional_age: [''],
      gender: ['indefinido'],
      birth_weight: [''],
      has_suplement: ['true'],
      why_recived_suplement: [''],
      another_reason_sup: [''],
      joint_accommodation: ['false'],
      use_of_pacifier: ['false'],
      breastfeeding_b4_2hours: ['false'],
      post_discharge_feeding: ['lme'],
      skin_to_skin_contact: ['false'],
      last_weight_control: ['']
    });
   }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idChild')as string;
    this.motherId = this.route.snapshot.paramMap.get('idMother')as string;
    // Form controls
    if(this.id != '0'){
      this.apiGet.getChild(this.id).subscribe((response:ApiResponse)=>{
        if(response.success){
          this.element = response.data;
          this.fillInputs();
        }
      });
    }
  }
  // Funcion que rellena los campos de los form control, en caso de que este control se utilice para editar un lactante
  private fillInputs(){
    this.descomponerList();
    //Razon de suplemento
    let reason = this.element.birth_data.why_recived_suplement;
    if ( (reason != 'solicitud materna') && (reason != 'hambre') && 
    (reason != 'hipoglicemia') && (reason != 'sugerencia de algún profesional')) {
      reason = 'otras';
      this.form.get('another_reason_sup')?.setValue(this.element.birth_data.why_recived_suplement);
    }
    //fecha
    let parts=this.element.birth_data.birthday.split('-')
    let newdate=new Date(parts[0], parts[1] - 1, parts[2]);
    this.form.get('birth')?.setValue(this.datePipe.transform(newdate,"yyyy-MM-dd"));
    //-----
    this.form.get('name')?.setValue(this.element.name);
    this.form.get('nutritional_status_mother')?.setValue(this.element.gestacion_data.nutritional_status_mother);
    this.form.get('planned_pregnancy')?.setValue(this.element.gestacion_data.planned_pregnancy);
    this.form.get('assisted_fertilization')?.setValue(this.element.gestacion_data.assisted_fertilization);
    this.form.get('previous_lactaction')?.setValue(this.element.gestacion_data.previous_lactaction);
    this.form.get('duration_of_past_lactaction_in_months')?.setValue(this.element.gestacion_data.duration_of_past_lactaction_in_months);
    this.form.get('breastfeeding_education')?.setValue(this.element.gestacion_data.breastfeeding_education);
    this.form.get('birthplace')?.setValue(this.element.birth_data.birthplace);
    this.form.get('type_of_birth')?.setValue(this.element.birth_data.type_of_birth);
    this.form.get('gestional_age')?.setValue(this.element.birth_data.gestional_age);
    this.form.get('gender')?.setValue(this.element.birth_data.gender);
    this.form.get('birth_weight')?.setValue(this.element.birth_data.birth_weight);
    this.form.get('has_suplement')?.setValue(this.element.birth_data.has_suplement);
    this.form.get('why_recived_suplement')?.setValue(reason);
    this.form.get('joint_accommodation')?.setValue(this.element.birth_data.joint_accommodation);
    this.form.get('use_of_pacifier')?.setValue(this.element.birth_data.use_of_pacifier);
    this.form.get('breastfeeding_b4_2hours')?.setValue(this.element.birth_data.breastfeeding_b4_2hours);
    this.form.get('post_discharge_feeding')?.setValue(this.element.birth_data.post_discharge_feeding);
    this.form.get('skin_to_skin_contact')?.setValue(this.element.birth_data.skin_to_skin_contact);
    this.form.get('last_weight_control')?.setValue(this.element.birth_data.last_weight_control);
  }
  // Funcion que descompone la lista de enfermedades cronicas y las valida dentro del form, No tiene en cuenta las 'otras'
  private descomponerList(){
    const { diseases_during_pregnancy } = this.element.gestacion_data;
    if( diseases_during_pregnancy[0] != 'ninguna' ){
      let disease;
      const length = diseases_during_pregnancy.length;
      for( let i=0; i < length; i++ ){
        disease = diseases_during_pregnancy[i];
        
        if( disease == 'sintoma de parto prematuro' ){
          this.form.get('sintoma_parto_prematuro')?.setValue(true);
        }
        if( disease == 'preeclampsia' ){
          this.form.get('preeclampsia')?.setValue(true);
        }
        if( disease == 'eclampsia' ){
          this.form.get('eclampsia')?.setValue(true);
        }
        if( disease == 'diabetes gestacional' ){
          this.form.get('diabetes_gestacional')?.setValue(true);
        }
        if( disease == 'hipertiroidismo' ){
          this.form.get('hipertiroidismo')?.setValue(true);
        }
        if( disease == 'hipotiroidismo' ){
          this.form.get('hipotiroidismo')?.setValue(true);
        }
        if( disease == 'enfermedad autoinmune' ){
          this.form.get('e_autoinmune')?.setValue(true);
        }
        if ( (disease != 'sintoma de parto prematuro') && (disease != 'preeclampsia') && 
        (disease != 'eclampsia') && (disease != 'enfermedad autoinmune') && (disease != 'diabetes gestacional') && 
        (disease != 'hipotiroidismo') && (disease != 'hipertiroidismo')) {
          this.addExistingOtherDiseases(disease);
        }
      }
    }
  }
  // Funcion que agrega otras enfermedades ( Se utiliza principalmente para traer datos existentes del formulario de editar )
  private addExistingOtherDiseases = (disease) => {
    this.other_diseases.push(disease);
    (<FormArray>this.form.get('other')).push( new FormControl(true));
    this.other_diseases.push(disease);
  } 
  // Funcion que ACTUALMENTE solo se encarga de imprimir por consola los valores obtenidos en el formulario
  public sendChildData() {
    this.createList();
    let suplement_reason = this.form.get("why_recived_suplement")?.value;
    if ( this.form.get('why_recived_suplement')?.value == 'otras' ) {
      suplement_reason = this.form.get("another_reason_sup")?.value
    }
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
        why_recived_suplement: suplement_reason,
        joint_accommodation: this.form.get("joint_accommodation")?.value,
        use_of_pacifier: this.form.get("use_of_pacifier")?.value,
        post_discharge_feeding: this.form.get("post_discharge_feeding")?.value,
        last_weight_control: this.form.get("last_weight_control")?.value
      },
    }
    this.apiSend.addChild(childData,this.motherId).subscribe((response:ApiResponse)=>{
      this.goToMotherProfile();
    });
  }

// Funcion que ACTUALMENTE solo se encarga de imprimir por consola los valores obtenidos en el formulario
  public editChildData() {
    this.createList();
    let suplement_reason = this.form.get("why_recived_suplement")?.value;
    if ( this.form.get('why_recived_suplement')?.value == 'otras' ) {
      suplement_reason = this.form.get("another_reason_sup")?.value
    }
    let childData1:typeChild={
      _id: this.id,
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
        why_recived_suplement: suplement_reason,
        joint_accommodation: this.form.get("joint_accommodation")?.value,
        use_of_pacifier: this.form.get("use_of_pacifier")?.value,
        post_discharge_feeding: this.form.get("post_discharge_feeding")?.value,
        last_weight_control: this.form.get("last_weight_control")?.value
      }
    }
    this.apiSend.updateChild(childData1).subscribe((response:ApiResponse)=>{
      this.goToMotherProfile();
    });
  }

  goToMotherProfile(){
    this.location.back();
  }

  newDisease = () => {
    if ( this.other_diseases.indexOf(this.form.get("new_disease")?.value) == -1) {
      (<FormArray>this.form.get('other')).push( new FormControl(true));
      this.other_diseases.push(this.form.get("new_disease")?.value);
      this.form.get("new_disease")?.setValue('');
    }else{
      console.log('este valor ya existe');
    }
  }

  checkDisease = () => {
    this.createList();
    this.chronic_diseases.forEach((el) => console.log(el));
  }
  
  // Funcion que crea una lista de enfermedades cronicas
  private createList(){
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
    this.form.get('other')['controls'].forEach((element, index) => {
      if (element.value) {
        this.chronic_diseases.push(this.other_diseases[index]);
      }
    });
    if(this.chronic_diseases.length == 0){
      this.chronic_diseases.push("ninguna");
    }
  }
}
