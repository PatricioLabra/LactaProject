import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

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
    console.log("Hola");
    this.router.navigate(['control-panel']);
  }
}
