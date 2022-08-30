import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { typeMother } from '@interfaces/mother';
import { ApiResponse } from '@interfaces/api_response';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-mother-form',
  templateUrl: './mother-form.component.html',
  styleUrls: ['./mother-form.component.scss']
})
export class MotherFormComponent implements OnInit {
  rut_array:Array<string> = [];
  private element : typeMother;
  chronic_diseases:Array<string>=[];
  other_diseases:Array<string>=[];
  form:FormGroup;
  id="";
  constructor(
    private datePipe:DatePipe,
    private fb:FormBuilder, 
    private apiSend: ApiSendService, 
    private apiGet: ApiGetService, 
    private router:Router, 
    private route: ActivatedRoute,
    private location: Location
    ) {
    this.id=this.route.snapshot.paramMap.get('id') as string;
    // Form controls del form
    this.form=this.fb.group({
      name: ['', Validators.required],
      rut: ['', [Validators.required,Validators.pattern("^[0-9]{7,8}$")]],
      rut_vc: ['', [Validators.required,Validators.pattern("^[0-9kK]{1}$")]],
      commune: ['', Validators.required],
      phone_number: ['', Validators.required],
      mail: ['', [Validators.email, Validators.required] ],
      birth: ['', Validators.required],
      ocupation: ['', Validators.required],
      studies: ['ninguna'],
      marital_status: ['ninguno'],
      forecast: ['ninguna'],
      number_of_children: [''],
      hipertension_a: [''],
      diabetes_m1: [''],
      diabetes_m2: [''],
      hipotiroidismo: [''],
      hipertiroidismo: [''],
      new_disease: [''],
      other: new FormArray([
      ]),
    });
    
  }
  
  ngOnInit(): void {
    // Si la id que recibe el formulario, es igual a 0: Formulario para agregar / en caso contrario: Formulario para editar
    if (this.id!='0'){
      this.apiGet.getMother(this.id).subscribe((response: ApiResponse) => {
        if (response.success) {
          this.element =  response.data.mother;
          this.fillInputs();
        }
      });
    }
  }
  // Funcion que rellena los datos de la asesorada en los form control
  private fillInputs(){
    this.form.get('name')?.setValue(this.element.name);
    this.form.get('birth')?.setValue(this.element.birth);
    this.rut_array = this.element.rut.split('-');
    this.form.get('rut')?.setValue(this.rut_array[0]);
    this.form.get('rut_vc')?.setValue(this.rut_array[1]);
    this.form.get('commune')?.setValue(this.element.commune);
    this.form.get('phone_number')?.setValue(this.element.phone_number);
    this.form.get('mail')?.setValue(this.element.mail);
    this.form.get('ocupation')?.setValue(this.element.ocupation);
    this.form.get('studies')?.setValue(this.element.studies);
    this.form.get('marital_status')?.setValue(this.element.marital_status);
    this.form.get('forecast')?.setValue(this.element.forecast);
    this.form.get('number_of_children')?.setValue(this.element.number_of_living_children);
    this.descomponerList();
  }
  // Funcion que descompone la lista de enfermedades cronicas, No tiene en cuenta las 'otras'
  private descomponerList(){
    const { chronic_diseases } = this.element;
    if( chronic_diseases[0] != 'ninguna' ){
      let disease;
      const length = chronic_diseases.length;
      for( let i=0; i<length; i++ ) {
        disease = chronic_diseases[i];
        if( disease == 'hipertension arterial' ){
          this.form.get('hipertension_a')?.setValue(true);
        }
        if( disease == 'diabetes mellitus 1' ){
          this.form.get('diabetes_m1')?.setValue(true);
        }
        if( disease == 'diabetes mellitus 2' ){
          this.form.get('diabetes_m2')?.setValue(true);
        }
        if( disease == 'hipotiroidismo' ){
          this.form.get('hipotiroidismo')?.setValue(true);
        }
        if( disease == 'hipertiroidismo' ){
          this.form.get('hipertiroidismo')?.setValue(true);
        }
        if ( (disease != 'hipertension arterial') && (disease != 'diabetes mellitus 1') && 
        (disease != 'diabetes mellitus 2') && (disease != 'hipotiroidismo') && (disease != 'hipertiroidismo')) {
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
  // Funcion que se encarga de agregar una nueva asesorada
  public sendMotherData(){
    
      this.createList();
      let motherData:typeMother={
      name: this.form.get("name")?.value,
      rut: this.form.get("rut")?.value + "-" + this.form.get("rut_vc")?.value,
      commune: this.form.get("commune")?.value,
      phone_number: this.form.get("phone_number")?.value,
      mail: this.form.get("mail")?.value,
      birth: this.form.get("birth")?.value,
      ocupation: this.form.get("ocupation")?.value,
      studies: this.form.get("studies")?.value,
      marital_status: this.form.get("marital_status")?.value,
      forecast: this.form.get("forecast")?.value,
      chronic_diseases: this.chronic_diseases,
      number_of_living_children: this.form.get("number_of_children")?.value,
      };
      
      this.apiSend.addMother(motherData).subscribe((response: ApiResponse) => {
      this.goLastPage();
      });
    
  }

  public editMotherData(){
    this.createList();
    let motherData1:typeMother={
    _id: this.id,
    name: this.form.get("name")?.value,
    rut: this.form.get("rut")?.value + "-" + this.form.get("rut_vc")?.value,
    commune: this.form.get("commune")?.value,
    phone_number: this.form.get("phone_number")?.value,
    mail: this.form.get("mail")?.value,
    birth: this.form.get("birth")?.value,
    ocupation: this.form.get("ocupation")?.value,
    studies: this.form.get("studies")?.value,
    marital_status: this.form.get("marital_status")?.value,
    forecast: this.form.get("forecast")?.value,
    chronic_diseases: this.chronic_diseases,
    number_of_living_children: this.form.get("number_of_children")?.value,
    };
    this.apiSend.updateMother(motherData1).subscribe((response: ApiResponse) => {
    this.goLastPage();
    });
  }
  // Funcion que re dirige hacia la ruta de /asesoradas
  goLastPage() {
    this.location.back();
  }
  // Funcion que se encarga de agregar una nueva enfermedad
  newDisease = () => {
    if ( this.other_diseases.indexOf(this.form.get("new_disease")?.value) == -1) {
      (<FormArray>this.form.get('other')).push( new FormControl(true));
      this.other_diseases.push(this.form.get("new_disease")?.value);
      this.form.get("new_disease")?.setValue('');
    }else{
      console.log('este valor ya existe');
    }
  }
  // Funcion DE PRUEBA que se encarga de verificar las enfermedades
  checkDisease = () => {
    this.createList();
    this.chronic_diseases.forEach((el) => console.log(el));
  }
  // Funcion que crea una lista de enfermedades cronicas
  private createList(){
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
