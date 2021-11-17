import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mother-profile',
  templateUrl: './mother-profile.component.html',
  styleUrls: ['./mother-profile.component.scss']
})
export class MotherProfileComponent implements OnInit {

  public idMother: string = '61955c8bc61cbdf297a7c191';

  constructor() { }

  ngOnInit(): void {
  }

}
