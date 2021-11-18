import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { typeMother } from '@interfaces/mother';
import { ApiResponse } from '@interfaces/api_response';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mother-form',
  templateUrl: './mother-form.component.html',
  styleUrls: ['./mother-form.component.scss']
})
export class MotherFormComponent implements OnInit {
  rut_array:Array<string> = [];
  element:any;
  chronic_diseases:Array<string>=[];
  other_diseases:Array<string>=[];
  form:FormGroup;
  id="";
  constructor(private fb:FormBuilder, private apiSend: ApiSendService, private apiGet: ApiGetService, private router:Router, private route: ActivatedRoute) {
    this.id=this.route.snapshot.paramMap.get('id') as string;
    console.log(this.id);
    // Form controls del form
    this.form=this.fb.group({
      name: ['', Validators.required],
      rut: ['', Validators.required],
      rut_vc: ['', Validators.required],
      commune: ['', Validators.required],
      phone_number: ['', Validators.required],
      mail: ['', [Validators.email, Validators.required] ],
      birth: ['', Validators.required],
      ocupation: ['', Validators.required],
      studies: ['ninguna'],
      marital_status: ['soltera'],
      forecast: ['ninguna'],
      number_of_children: ['', Validators.required],
      hipertension_a: ['', Validators.required],
      diabetes_m1: ['', Validators.required],
      diabetes_m2: ['', Validators.required],
      hipotiroidismo: ['', Validators.required],
      hipertiroidismo: ['', Validators.required],
      other: [''],
    });
    // Si la id que recibe el formulario, es igual a 0: Formulario para agregar / en caso contrario: Formulario para editar
    if (this.id!='0'){
      this.apiGet.getMother(this.id).subscribe((response: ApiResponse) => {
        console.log(response);
        if (response.success) {
          this.element=response.data.mother;
          this.fillInputs();
        }
      });
    }

  }

  ngOnInit(): void {

 
  }
  // Funcion que rellena los datos de la asesorada en los form control
  fillInputs(){
    this.form.get('name')?.setValue(this.element.name);
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
  descomponerList(){
    if(this.element.chronic_diseases[0] != 'ninguna'){
      for(let i=0;i<5;i++){
        if(this.element.chronic_diseases[i] == 'hipertension arterial'){
          this.form.get('hipertension_a')?.setValue(true);
        }
        if(this.element.chronic_diseases[i] == 'diabetes mellitus 1'){
          this.form.get('diabetes_m1')?.setValue(true);
        }
        if(this.element.chronic_diseases[i] == 'diabetes mellitus 2'){
          this.form.get('diabetes_m2')?.setValue(true);
        }
        if(this.element.chronic_diseases[i] == 'hipotiroidismo'){
          this.form.get('hipotiroidismo')?.setValue(true);
        }
        if(this.element.chronic_diseases[i] == 'hipertiroidismo'){
          this.form.get('hipertiroidismo')?.setValue(true);
        }
      }
    }
  }
  // Funcion que ACTUALMENTE solo se encarga de imprimir por consola los valores obtenidos en el formulario
  sendMotherData(){
    
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
      console.log(response);
      this.goLastPage();
      });
    
  }

  editMotherData(){
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
    console.log(response);
    this.goLastPage();
    });
  }
  // Funcion que re dirige hacia la ruta de /asesoradas
  goLastPage() {
    const url: string = 'asesoradas';
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
