import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  flag=1; //variable que deberia indicar si el usuario esta conectado como admin o asesora normal.

  constructor() { }

  ngOnInit(): void {
  }

}
