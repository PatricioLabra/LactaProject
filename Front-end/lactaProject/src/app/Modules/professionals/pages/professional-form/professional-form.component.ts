import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiSendService } from 'src/app/services/api-send.service';
import { typeUser } from '@interfaces/user';
import { ApiResponse } from '@interfaces/api_response';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.scss']
})
export class ProfessionalFormComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder, private apiSend:ApiSendService) {
    this.form=this.fb.group({
      name: ['', Validators.required],
      rut: ['', Validators.required],
      rut_vc: ['', Validators.required],
      password: ['', Validators.required],
      mail: ['', [Validators.email, Validators.required]],
      permission_level: ['0', Validators.required]
    });
   }
  ngOnInit(): void {
  }

  // Funcion que envia los datos recopilados del formulario hacia la base de datos
  sendProfessionalData(){
    let userData:typeUser={
      name: this.form.get("name")?.value,
      rut: this.form.get("rut")?.value + "-" + this.form.get("rut_vc")?.value,
      mail: this.form.get("mail")?.value,
      password: this.form.get("password")?.value,
      permission_level: this.form.get("permission_level")?.value,
    }
    this.apiSend.addUser(userData).subscribe((response: ApiResponse) => {
      console.log(response);
    });
  }
}
