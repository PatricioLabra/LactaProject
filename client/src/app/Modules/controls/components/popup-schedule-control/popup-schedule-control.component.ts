import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup-schedule-control',
  templateUrl: './popup-schedule-control.component.html',
  styleUrls: ['./popup-schedule-control.component.scss']
})
export class PopupScheduleControlComponent implements OnInit {

  public controlForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.controlForm = this.fb.group({
      name_child: ['ninguna', Validators.required],
      consultation_place: ['ninguna', Validators.required],
      monitoring_medium: ['ninguna', Validators.required],
      date_control: [null, Validators.required]
    });
  }
}
