import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api_response';
import { typeChild } from '@interfaces/child';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-birth-data',
  templateUrl: './birth-data.component.html',
  styleUrls: ['./birth-data.component.scss']
})
export class BirthDataComponent implements OnInit {

  childId="619558f6590af9c8a6ce588e" //Para conectar Solo hay q asignar este id desde la ruta
  childData:typeChild;


  ngOnInit() {
    this.apiGet.getChild(this.childId).subscribe((response: ApiResponse) => {
      console.log(response);
      if (response.success) {
        this.childData=response.data
      }
    });

  }
  constructor( private apiGet: ApiGetService) {}
}
