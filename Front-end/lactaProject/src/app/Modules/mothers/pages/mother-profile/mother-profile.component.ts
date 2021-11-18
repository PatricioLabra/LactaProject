import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@interfaces/api_response';
import { ApiSendService } from 'src/app/services/api-send.service';

@Component({
  selector: 'app-mother-profile',
  templateUrl: './mother-profile.component.html',
  styleUrls: ['./mother-profile.component.scss']
})
export class MotherProfileComponent implements OnInit {

  public idMother: string | null = null;
  @ViewChild('frame', { static: true }) public frameModal;

  constructor(private activatedRoute: ActivatedRoute , private apiSend:ApiSendService, private router:Router , private route:Router) { }

  ngOnInit(): void {
    this.idMother = this.activatedRoute.snapshot.params.id;
  }

  show(){

    this.frameModal.show();

  }
  eliminarAsesorada(value:string){

    this.apiSend.deleteMother(value).subscribe( (response:ApiResponse) =>{
      if(response.success){
        console.log("asesorada eliminada");
      }
      this.frameModal.hide();
      this.route.navigate(["asesoradas"])
      
    })


  }

  goToEditMother(idMother:string){
    const url:string = 'asesoradas/agregar/' + idMother;
    this.router.navigate([url]);
  }

  goToAddChild(idMother:string){
    const url:string = 'asesoradas/' + idMother + '/agregar-lactante/0';
    this.router.navigate([url]);
  }
}
