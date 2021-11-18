import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
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
  public element:any;
  controlId="";

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

  editarCita(){
    this.element.child_name = this.controlForm.get('name_child')?.value;
    this.element.consultation_place = this.controlForm.get('consultation_place')?.value;
    this.element.monitoring_medium = this.controlForm.get('monitoring_medium')?.value;
    this.element.date_control = this.controlForm.get('date_control')?.value;
    this.apiSend.updateControl(this.element).subscribe((response:ApiResponse)=>{
      console.log(response);
    });
  }

  show2(value:string){
    this.apiGet.getControl(value).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.element = response.data;
        console.log(this.element);
        console.log(response);
        console.log(value);
        this.fillInputs();
        this.actualControlId=value;
        this.frameModal2.show();
      }
    });
  
  }
  
  // Funcion que rellena los datos de la asesorada en los form control
  fillInputs(){
    this.controlForm.get('name_child')?.setValue(this.element.child_name);
    this.controlForm.get('consultation_place')?.setValue(this.element.consultation_place);
    this.controlForm.get('monitoring_medium')?.setValue(this.element.monitoring_medium);
    this.controlForm.get('date_control')?.setValue(this.element.date_control);
  }
}
