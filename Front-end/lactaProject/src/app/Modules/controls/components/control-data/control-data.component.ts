import { Component, OnInit ,Input} from '@angular/core';
import { ApiResponse } from '@interfaces/api_response';
import { typeControl } from '@interfaces/control';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-control-data',
  templateUrl: './control-data.component.html',
  styleUrls: ['./control-data.component.scss']
})
export class ControlDataComponent implements OnInit {

  @Input() controlId:string;
  controlData=0;

  
  constructor( private apiGet: ApiGetService) {}

  ngOnInit(): void {
    this.apiGet.getControl(this.controlId).subscribe((response: ApiResponse) => {
      console.log(response);
      if (response.success) {
        this.controlData=response.data;
        console.log(this.controlData);
      }
    });
  }

}
