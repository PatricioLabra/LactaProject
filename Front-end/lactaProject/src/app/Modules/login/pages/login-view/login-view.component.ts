import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  login:FormGroup;

  constructor(private fb:FormBuilder) { 
    this.login=this.fb.group({
      rut:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  log_in(){
    console.log("Hola");
  }
}
