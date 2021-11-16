import { Component, OnInit } from '@angular/core';
import { typeControl } from '@interfaces/control';

@Component({
  selector: 'app-controls-list',
  templateUrl: './controls-list.component.html',
  styleUrls: ['./controls-list.component.scss']
})
export class ControlsListComponent implements OnInit {

  public controls: typeControl | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
