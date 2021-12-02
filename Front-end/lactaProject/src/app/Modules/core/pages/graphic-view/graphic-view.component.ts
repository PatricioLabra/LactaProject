import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '@interfaces/api_response';
import { GraphicData } from '@interfaces/graphic';
import { ApiGetService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-graphic-view',
  templateUrl: './graphic-view.component.html',
  styleUrls: ['./graphic-view.component.scss']
})
export class GraphicViewComponent implements OnInit {

  public keyword: string = null;
  public dataGraphic: GraphicData;

  constructor(private activatedRoute: ActivatedRoute, private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.keyword = this.activatedRoute.snapshot.params.keyword;

    this.apiGet.getGraphicData(this.keyword).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.dataGraphic = response.data;
      }
    });
  }
}
