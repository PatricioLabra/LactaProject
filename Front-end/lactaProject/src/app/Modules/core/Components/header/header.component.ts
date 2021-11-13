import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged=1
  name="pepito pepon"
  constructor() { }

  ngOnInit(): void {
    this.logged=1
    this.name="pepito pepon"
  }

}
