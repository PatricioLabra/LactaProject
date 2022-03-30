import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@interfaces/api_response';
import { ModalDirective } from 'angular-bootstrap-md';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-reset-password-view',
  templateUrl: './reset-password-view.component.html',
  styleUrls: ['./reset-password-view.component.scss']
})
export class ResetPasswordViewComponent implements OnInit {

  resetForm:FormGroup;
  token:any;
  @ViewChild('frame') public frame: ModalDirective;

  constructor(private fb:FormBuilder, private activatedRoute:ActivatedRoute , private userService:UserInfoService , private router:Router) { }

  ngOnInit(): void {

    this.token = this.activatedRoute.snapshot.params.token;

    this.resetForm=this.fb.group({
      password:["",[Validators.required,Validators.minLength(6)]],
      verifyPassword:["",[Validators.required]]
    })
  }
  onClose(){
    this.router.navigate(["/"])
  }

  submit(){
    this.userService.newPassword(this.resetForm.get("password").value,this.token).subscribe((res:ApiResponse)=>{
      if(res.success){
        console.log(res)
        this.frame.show()
      }else{
        console.log(res.message)
      }
    })

  }

}
