import { Component, OnInit, Input } from '@angular/core';
import { typeMother } from '@interfaces/mother';
import { ApiResponse } from '@interfaces/api_response';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-mother-data',
  templateUrl: './mother-data.component.html',
  styleUrls: ['./mother-data.component.scss']
})
export class MotherDataComponent implements OnInit {

  @Input()
  private idMother: string;

  public motherData: typeMother;

  constructor(private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.apiGet.getMother(this.idMother).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.motherData = response.data.mother;
      }
    });
  }
}
