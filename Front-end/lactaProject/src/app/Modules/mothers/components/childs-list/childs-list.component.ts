import { Component, OnInit } from '@angular/core';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiResponse } from '@interfaces/api_response';

interface ChildResume {
  idChild: string,
  name: string,
  birth: Date
};

@Component({
  selector: 'app-childs-list',
  templateUrl: './childs-list.component.html',
  styleUrls: ['./childs-list.component.scss']
})
export class ChildsListComponent implements OnInit {

  public childs: Array<ChildResume> | null = null;

  constructor(private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.apiGet.getChildsList('61908b5341fc603acb35a84f').subscribe((response: ApiResponse) => {
      this.childs = response.data.childsFiltered;
      console.log(this.childs);
    });
  }
}
