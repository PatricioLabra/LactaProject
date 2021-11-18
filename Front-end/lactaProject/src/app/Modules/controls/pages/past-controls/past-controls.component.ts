import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-past-controls',
  templateUrl: './past-controls.component.html',
  styleUrls: ['./past-controls.component.scss']
})
export class PastControlsComponent implements OnInit {

  public idMother: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idMother = this.activatedRoute.snapshot.params.id;
  }

}
