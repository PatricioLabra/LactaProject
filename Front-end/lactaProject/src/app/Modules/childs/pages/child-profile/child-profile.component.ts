import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@interfaces/api_response';
import { typeChild } from '@interfaces/child';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss']
})
export class ChildProfileComponent implements OnInit {

  childId: string;
  idMother: string;
  childData: typeChild;

  @ViewChild('frame', { static: true }) public frameModal;

  constructor(
    private apiGet: ApiGetService,
    private apiSend:ApiSendService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.childId = this.activateRouter.snapshot.params.idChild;
    this.idMother = this.activateRouter.snapshot.params.idMother;

    this.apiGet.getChild(this.childId).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.childData = response.data;
      }
    });
  }

  eliminarLactante(value: string){
    this.apiSend.deleteChild(value).subscribe( (response:ApiResponse) =>{
      if(response.success){
        console.log("lactante eliminado");
      }
      this.frameModal.hide();
    });
    this.router.navigate([`asesoradas/profile/${this.idMother}`])
  }

  show(){
    this.frameModal.show();
  }

  goToEditChild(idMother:string,ChildId:string){
    const url:string = 'asesoradas/' + idMother + '/agregar-lactante/' + ChildId;
    this.router.navigate([url]); 
  }
}
