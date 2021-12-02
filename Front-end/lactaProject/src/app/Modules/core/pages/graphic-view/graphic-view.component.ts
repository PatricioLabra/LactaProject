import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphic-view',
  templateUrl: './graphic-view.component.html',
  styleUrls: ['./graphic-view.component.scss']
})
export class GraphicViewComponent implements OnInit {

  public keyword: string = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.keyword = this.activatedRoute.snapshot.params.keyword;
  }

}
