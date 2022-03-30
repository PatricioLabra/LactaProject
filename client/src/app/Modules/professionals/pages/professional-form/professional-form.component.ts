import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';
import { typeUser } from '@interfaces/user';
import { ApiResponse } from '@interfaces/api_response';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.scss']
})
export class ProfessionalFormComponent implements OnInit {
  element:any;
  id="";
  form:FormGroup;
  constructor(private fb:FormBuilder, private apiSend:ApiSendService, private apiGet:ApiGetService, private router:Router, private route: ActivatedRoute) {
    //this.id=this.route.snapshot.paramMap.get('id') as string;
    this.form=this.fb.group({
      name: ['', Validators.required],
      rut: ['', [Validators.required,Validators.pattern("^[0-9]{7,8}$")]],
      rut_vc: ['', [Validators.required,Validators.pattern("^[0-9kK]{1}$")]],
      mail: ['', [Validators.email, Validators.required]],
      permission_level: ['0', Validators.required]
    });
   }
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id') as string;
    if (this.id != '0'){
      this.apiGet.getProfessionalData(this.id).subscribe((response:ApiResponse)=>{
        if(response.success){
          this.form.get("name").setValue(response.data.name);
          this.form.get("mail").setValue(response.data.mail);
          this.form.get("permission_level").setValue(response.data.permission_level);
          let rut=response.data.rut;
          rut=rut.replace('-','');
          this.form.get("rut").setValue(rut.slice(0,-1));
          this.form.get("rut_vc").setValue(rut.slice(-1).toUpperCase());
        }else{
          console.log(response.message)
        }
      });
    }
  }

  fillInputs(){
    this.form.get('name')?.setValue(this.element);
  }

  // Funcion que envia los datos recopilados del formulario hacia la base de datos
  sendProfessionalData(){
    let userData:typeUser={
      name: this.form.get("name")?.value,
      rut: this.form.get("rut")?.value + "-" + this.form.get("rut_vc")?.value.toLowerCase(),
      mail: this.form.get("mail")?.value,
      password: this.form.get("password")?.value,
      permission_level: this.form.get("permission_level")?.value,
    }
    this.apiSend.addUser(userData).subscribe((response: ApiResponse) => {
      console.log(response);
      this.goLastPage();
    });
  }

  editProfessionalData(){
    let userData1:typeUser={
      _id: this.id,
      name: this.form.get("name")?.value,
      rut: this.form.get("rut")?.value + "-" + this.form.get("rut_vc")?.value.toLowerCase(),
      mail: this.form.get("mail")?.value,
      password: this.form.get("password")?.value,
      permission_level: this.form.get("permission_level")?.value,
    }
    this.apiSend.editUser(userData1).subscribe((response:ApiResponse)=>{
      console.log(response);
      this.goLastPage();
    });
  }
  goLastPage() {
    const url: string = 'profesionales';
    this.router.navigate([url]);
  }
}
