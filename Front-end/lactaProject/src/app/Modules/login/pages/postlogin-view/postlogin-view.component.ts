import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiSendService } from 'src/app/services/api-send.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-postlogin-view',
  templateUrl: './postlogin-view.component.html',
  styleUrls: ['./postlogin-view.component.scss']
})
export class PostloginViewComponent implements OnInit {
  postlogin:FormGroup;

  constructor(private fb:FormBuilder, private router: Router, private apiSend: ApiSendService, private userService:UserInfoService) {
    this.postlogin=this.fb.group({
      user_role: ['1',Validators.required],
    });
  }

  ngOnInit(): void {

  }

  buenas(){
    console.log(this.postlogin.value);
    this.changeRole(this.postlogin.get("user_role")?.value);
    this.router.navigate(['control-panel']);
  }

  changeRole(data:any){
    this.userService.changeRoleLevel(data);
  }
}
