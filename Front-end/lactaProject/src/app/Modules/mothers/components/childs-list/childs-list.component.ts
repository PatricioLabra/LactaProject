import { Component, Input, OnInit } from '@angular/core';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiResponse } from '@interfaces/api_response';

interface ChildResume {
  _id: string,
  name: string,
  birth: Date
};

@Component({
  selector: 'app-childs-list',
  templateUrl: './childs-list.component.html',
  styleUrls: ['./childs-list.component.scss']
})
export class ChildsListComponent implements OnInit {

  @Input()
  public idMother: string;
  public childs: Array<ChildResume> | null = null;

  constructor(private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.apiGet.getChildsList(this.idMother).subscribe((response: ApiResponse) => {
      this.childs = response.data.childsFiltered;
    });
  }
}
