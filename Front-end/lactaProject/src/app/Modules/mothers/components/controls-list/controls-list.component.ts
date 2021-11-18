import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ApiResponse } from '@interfaces/api_response';
import { typeControl } from '@interfaces/control';
import { ApiGetService } from 'src/app/services/api-get.service';
import { ApiSendService } from 'src/app/services/api-send.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-controls-list',
  templateUrl: './controls-list.component.html',
  styleUrls: ['./controls-list.component.scss']
})
export class ControlsListComponent implements OnInit {

  @Input()
  private idMother: string;
  actualControlId:string;
  public controls: typeControl[] | null = null;
  public controlForm: FormGroup;

  constructor(private apiGet: ApiGetService , private apiSend:ApiSendService, private router:Router, private fb:FormBuilder) { }

  @ViewChild('frame', { static: true }) public frameModal;
  @ViewChild('frame2', { static: true }) public frameModal2;

  ngOnInit(): void {
    this.apiGet.getNextControls(this.idMother).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.controls = response.data.nextControlsFiltered;
      }
    });

    this.controlForm = this.fb.group({
      name_child: ['ninguna', Validators.required],
      consultation_place: ['ninguna', Validators.required],
      monitoring_medium: ['ninguna', Validators.required],
      date_control: [null, Validators.required]
    });
  }

  show(value:string){
    this.actualControlId=value;
    this.frameModal.show();
  }
  eliminarCita(value:string){

    this.apiSend.deleteControl(value).subscribe( (response:ApiResponse) =>{
      if(response.success){
        console.log("Cita eliminada");
      }
      this.frameModal.hide();
    })

    this.controls=this.controls.filter((controls)=>controls._id!=value);
  }

  show2(value:string){
    this.actualControlId=value;
    this.frameModal2.show();
  }
}
