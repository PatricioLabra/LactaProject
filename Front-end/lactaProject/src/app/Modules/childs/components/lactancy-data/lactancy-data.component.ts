import { Component, OnInit, Input } from '@angular/core';
import { ApiResponse } from '@interfaces/api_response';
import { typeChild } from '@interfaces/child';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-lactancy-data',
  templateUrl: './lactancy-data.component.html',
  styleUrls: ['./lactancy-data.component.scss']
})
export class LactancyDataComponent implements OnInit {

  @Input()
  public childId: string;
  public childData:typeChild;

  ngOnInit() {
    this.apiGet.getChild(this.childId).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.childData=response.data
      }
    });

  }
  constructor( private apiGet: ApiGetService) {}

}
