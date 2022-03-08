import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  logged=false
  constructor(private userService:UserInfoService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getIsLoggedin.subscribe((response:boolean)=>{
      this.logged=response;
    });
  }
}
