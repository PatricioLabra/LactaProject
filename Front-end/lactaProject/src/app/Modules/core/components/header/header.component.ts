import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged=false
  role="1"
  name="pepito pepon"
  constructor(private userService:UserInfoService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getIsLoggedin.subscribe((response:boolean)=>{
      this.logged=response;
    });
    this.userService.getUserInfo.subscribe((response:any)=>{
      this.name=response.name;
      this.role=response.role;
    });
  }

  logOut(){
    this.userService.signOutUser();
    this.router.navigate([""]);
  }
}
