import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mother-profile',
  templateUrl: './mother-profile.component.html',
  styleUrls: ['./mother-profile.component.scss']
})
export class MotherProfileComponent implements OnInit {

  public idMother: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idMother = this.activatedRoute.snapshot.params.id;
  }
}
