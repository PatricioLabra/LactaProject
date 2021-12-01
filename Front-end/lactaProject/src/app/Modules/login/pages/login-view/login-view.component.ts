import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiResponse } from '@interfaces/api_response';
import { ApiSendService } from 'src/app/services/api-send.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  @ViewChild('frame', { static: true }) public frameModal;

  public login: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private apiSend:ApiSendService) { 
    this.login=this.fb.group({
      rut:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiSend.isLogged.subscribe(response =>{
      console.log(response);
    });
  }

  log_in(){
    this.apiSend.signIn(this.login.get("rut")?.value, this.login.get("password")?.value).subscribe((
      response: ApiResponse)=>{
        if(response.success){
          this.router.navigate(['postlogin']);
        }else{
          console.log(response.message);
        }
      },(error:any)=>{console.log(error);}
    );
  }
}
