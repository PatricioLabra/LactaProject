import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiResponse } from '@interfaces/api_response';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  @ViewChild('frame', { static: true }) public frameModal;

  public login: FormGroup;
  showErrorMessage=1;

  constructor(private fb: FormBuilder, private router: Router, private userService:UserInfoService) { 
    this.login=this.fb.group({
      rut:['',[Validators.required,Validators.minLength(9),Validators.maxLength(10),Validators.pattern("^[0-9]+-[0-9kK]{1}$")]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.userLogged();
  }

  private async userLogged() {
    this.userService.getIsLoggedin.subscribe(response =>{
      if(response){
        console.log("Ya te encuentras logeado");
        this.router.navigateByUrl("control-panel");
      }
    })
  }

  log_in(){
    this.userService.signInUser(this.login.get("rut")?.value, this.login.get("password")?.value).subscribe((
      response: ApiResponse)=>{
        if(response.success){
          if(response.data.userInfo.permission_level==1){
            this.router.navigate(['postlogin']);
          }else{
            this.router.navigate(['control-panel']);
          }
        }else{
          console.log(response.message);
        }
      },(error:any)=>{
        this.showErrorMessage=0;
        console.log(error);}
    );
  }
}
