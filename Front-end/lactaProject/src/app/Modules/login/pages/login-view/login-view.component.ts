import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  usuario="20111222-k"
  contraseña="1234"
  @ViewChild('frame', { static: true }) public frameModal;

  public login: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.login=this.fb.group({
      rut:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  log_in(){
    if(this.login.get("rut").value!=this.usuario && this.login.get("password").value!=this.contraseña){
      this.frameModal.show();
      this.login.get("rut").setValue("");
      this.login.get("password").setValue("");
      return;

    }
    this.router.navigate(['postlogin']);
  }
}
