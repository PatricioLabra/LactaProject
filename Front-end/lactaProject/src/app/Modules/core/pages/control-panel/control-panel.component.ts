import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  isLogged;
  role;

  constructor(private userService:UserInfoService) { }

  ngOnInit(): void {
    this.userService.getIsLoggedin.subscribe((response:boolean)=>{
      this.isLogged=response;
    });
    this.userService.getUserInfo.subscribe((response:any)=>{
      this.role=response.role;
    });
  }

}
