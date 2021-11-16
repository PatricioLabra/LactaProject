import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-past-controls-list',
  templateUrl: './past-controls-list.component.html',
  styleUrls: ['./past-controls-list.component.scss']
})
export class PastControlsListComponent implements OnInit {

  @ViewChild('content', { static: true }) public contentModal;

  name:string;
  elements: any = [];
  headElements = ['Nombre Lactante', 'Fecha',""];

  ngOnInit() {
    for (let i = 1; i <= 15; i++) {
      this.elements.push({
        name:i,fecha:new Date()
      });
    }
  }

  show(value:string){
    this.name = value;
    this.contentModal.show();
}

  
}
