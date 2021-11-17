import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api_response';
import { typeControl } from '@interfaces/control';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-controls-list',
  templateUrl: './controls-list.component.html',
  styleUrls: ['./controls-list.component.scss']
})
export class ControlsListComponent implements OnInit {

  @Input()
  private idMother: string;
  public controls: typeControl | null = null;

  constructor(private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.apiGet.getNextControls(this.idMother).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.controls = response.data.nextControlsFiltered;
      }
    });
  }

}
