import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiSendService } from 'src/app/services/api-send.service';

@Component({
  selector: 'app-postlogin-view',
  templateUrl: './postlogin-view.component.html',
  styleUrls: ['./postlogin-view.component.scss']
})
export class PostloginViewComponent implements OnInit {
  postlogin:FormGroup;

  constructor(private fb:FormBuilder, private router: Router, private apiSend: ApiSendService) {
    this.postlogin=this.fb.group({
      user_role: ['1',Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.apiSend.isLogged);
  }

  buenas(){
    console.log(this.postlogin.value);
    this.router.navigate(['control-panel']);
  }
}
