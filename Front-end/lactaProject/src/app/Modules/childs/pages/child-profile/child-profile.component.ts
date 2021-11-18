import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api_response';
import { typeChild } from '@interfaces/child';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss']
})
export class ChildProfileComponent implements OnInit {

  childId="61955ea11b759d88b0b06a1d" //Para conectar Solo hay q asignar este id desde la ruta
  childData:typeChild;


  ngOnInit() {
    this.apiGet.getChild(this.childId).subscribe((response: ApiResponse) => {
      console.log(response);
      if (response.success) {
        this.childData=response.data
        console.log(this.childData.gestacion_data)
      }
    });

  }
  constructor( private apiGet: ApiGetService) {}

  eliminarLactante(){
    console.log("XD")
  }

}
