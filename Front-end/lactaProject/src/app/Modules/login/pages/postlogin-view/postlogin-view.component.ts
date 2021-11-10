import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-postlogin-view',
  templateUrl: './postlogin-view.component.html',
  styleUrls: ['./postlogin-view.component.scss']
})
export class PostloginViewComponent implements OnInit {
  postlogin:FormGroup;
  constructor(private fb:FormBuilder) {
    this.postlogin=this.fb.group({
      user_role: ['1',Validators.required],
    });
  }

  ngOnInit(): void {
  }

  buenas(){
    console.log(this.postlogin.value);
  }
}
