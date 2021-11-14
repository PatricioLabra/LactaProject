import { Component, OnInit } from '@angular/core';
import { typeMother } from '@interfaces/mother';
import { ApiResponse } from '@interfaces/api_response';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-mother-data',
  templateUrl: './mother-data.component.html',
  styleUrls: ['./mother-data.component.scss']
})
export class MotherDataComponent implements OnInit {

  public motherData: typeMother;

  constructor(private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.apiGet.getMother('618b4a3110ac658e96ca116e').subscribe((response: ApiResponse) => {
      console.log(response);
      if (response.success) {
        this.motherData = response.data.mother;
      }
    });
  }
}
