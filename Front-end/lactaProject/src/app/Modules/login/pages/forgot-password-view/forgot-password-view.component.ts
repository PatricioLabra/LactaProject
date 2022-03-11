import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-view',
  templateUrl: './forgot-password-view.component.html',
  styleUrls: ['./forgot-password-view.component.scss']
})
export class ForgotPasswordViewComponent implements OnInit {

  forgotForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.forgotForm=this.fb.group({
      email:['', [Validators.email, Validators.required]]
    })
  }

}
