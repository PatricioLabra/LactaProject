import { Component, Input, OnInit } from '@angular/core';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiResponse } from '@interfaces/api_response';
import { Router } from '@angular/router';

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

  constructor(private apiGet: ApiGetService, private router:Router) { }

  ngOnInit(): void {
    this.apiGet.getChildsList(this.idMother).subscribe((response: ApiResponse) => {
      this.childs = response.data.childsFiltered;
    });
  }

  goToAddControl(childId:string){
    const url:string = 'controls/agregar-control/' + childId + '/primer-control';
    this.router.navigate([url]);
  }
}
