import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiResponse } from '@interfaces/api_response';
import { typeControl } from '@interfaces/control';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-past-controls-list',
  templateUrl: './past-controls-list.component.html',
  styleUrls: ['./past-controls-list.component.scss']
})
export class PastControlsListComponent implements OnInit {

  @ViewChild('content', { static: true }) public contentModal;

  
  elements: any = [];
  headElements = ['Nombre Lactante', 'Fecha',""];

  reqId="61955c8bc61cbdf297a7c191"//Solo Este se tiene que sacar desde la ruta

  controlId:string;//para el popup, ya esta funcionando no es necesario cambiar
  clickeado=0;

  ngOnInit() {
    this.apiGet.getPastControls(this.reqId).subscribe((response: ApiResponse) => {
      console.log(response);
      if (response.success) {
        this.elements=response.data.nextControlsFiltered; //hay q actualizar el nextControlFiltered cuando se cambie el name en el backend
      }
    });

  }
  constructor( private apiGet: ApiGetService) {}

  show(value:string){
      this.clickeado=1;
      this.controlId = value;
      this.contentModal.show();
}
  hide(){
    this.contentModal.hide();
    this.clickeado=0;
  }

  
}
