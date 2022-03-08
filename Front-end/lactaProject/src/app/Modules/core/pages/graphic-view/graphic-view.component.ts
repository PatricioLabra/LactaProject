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
  public chartType: string = 'bar';
  public flag=0

  public chartDatasets: Array<any> = [
    { 
      data: [],
      label: '', 
    }
  ];
  public dataux:Array<any>=[]
  public labelaux:Array<any>=[]
  public chartLabels: Array<any> = [];

  constructor(private activatedRoute: ActivatedRoute, private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.keyword = this.activatedRoute.snapshot.params.keyword;

    this.apiGet.getGraphicData(this.keyword).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.dataGraphic = response.data.options;
        this.chartDatasets[0].label=" Cantidad x " +response.data.name_data;
        for(var i in this.dataGraphic){
          this.dataux.push(this.dataGraphic[i].value)
          this.chartLabels.push(this.dataGraphic[i].name)
        }
        this.dataux.push(Math.max.apply(null,this.dataux)*1.3)
        this.chartDatasets[0].data=this.dataux;
        this.flag=1;
      }
    });
  }



  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize:1,
        },
        scaleLabel: {
          display: true,
          labelString: 'Cantidad'
        }
      }],
      xAxes:[{
        scaleLabel: {
          display: true,
        }
      }]
    }
  
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}

