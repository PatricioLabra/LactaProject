import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiResponse } from '@interfaces/api_response';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';

@Component({
  selector: 'app-past-controls-list',
  templateUrl: './past-controls-list.component.html',
  styleUrls: ['./past-controls-list.component.scss']
})
export class PastControlsListComponent implements OnInit {

  @ViewChild('content', { static: true }) public contentModal;
  @ViewChild('frame', { static: true }) public frameModal;
  
  elements: any = [];
  elementsFiltered:any=[]
  headElements = ['Nombre Lactante', 'Fecha',""];
  citaSeleccionada:any;

  @Input()
  reqId: string;

  controlId:string;//para el popup, ya esta funcionando no es necesario cambiar
  clickeado=0;

  ngOnInit() {
    this.apiGet.getPastControls(this.reqId).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.elements=response.data.passControlsFiltered;
        this.elementsFiltered=this.elements;
      }
    });

  }

  constructor(private apiGet: ApiGetService , private apiSend:ApiSendService) {}

  show(value:string){
      this.clickeado=1;
      this.controlId = value;
      this.contentModal.show();
  }
  show2(value:string){
    this.citaSeleccionada=value;
    this.frameModal.show();
  }

  filtrarLista(value:any){
    if(value==0){
      this.elementsFiltered=this.elements;
    }
    else{
      this.elementsFiltered=this.elements.filter((controls)=>controls.child_name==value)
      console.log(this.elementsFiltered)
    }
  }

  hide(){
    this.contentModal.hide();
    this.clickeado=0;
  }
  eliminarCita(value:string){
    console.log(value)

    this.apiSend.deleteControl(value).subscribe( (response:ApiResponse) =>{
      if(response.success){
        console.log("Cita eliminada");
      }
      this.frameModal.hide();
    })

    this.elements=this.elements.filter((controls)=>controls._id!=value);
  }
}
