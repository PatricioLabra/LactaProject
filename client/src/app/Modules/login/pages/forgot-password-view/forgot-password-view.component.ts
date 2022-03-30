import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '@interfaces/api_response';
import { ModalDirective } from 'angular-bootstrap-md';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-forgot-password-view',
  templateUrl: './forgot-password-view.component.html',
  styleUrls: ['./forgot-password-view.component.scss']
})
export class ForgotPasswordViewComponent implements OnInit {

  forgotForm:FormGroup;
  @ViewChild('frame') public frame: ModalDirective;
  constructor(private fb:FormBuilder, private userService:UserInfoService, private location:Location) { }

  ngOnInit(): void {
    this.forgotForm=this.fb.group({
      email:['', [Validators.email, Validators.required]]
    })
  }
  onOpen(event: any) {
    console.log(event);
  }
  onClose(){
    this.location.back();
  }
  submit(){
    this.userService.forgotPasswordRequest(this.forgotForm.get("email").value).subscribe((res:ApiResponse)=>{
      if(res.success){
        console.log(res)
        this.frame.show()
      }else{
        console.log(res.message)
      }
    })

  }

}
