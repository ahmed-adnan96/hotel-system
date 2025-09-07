import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../../shared.module";
import { SharedService } from '../../services/shared.service';
import { DashboardResponse } from '../../interfaces/dashboard-responce';
import { log } from 'console';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  imports: [SharedModule , BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
DashBoardData:DashboardResponse = {
    rooms: 0,
    facilities: 0,
    bookings: {
      pending: 0,
      completed: 0
    },
    ads: 0,
    users: {
      user: 0,
      admin: 0
    }
  }
 constructor(private _SharedService:SharedService) {}
   ngOnInit(): void {
    // this.getDashboardData()
  }
  public doughnutChartLabels: string[] = [ 'pending', 'completed'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 50, 150, 120 , 15 ], label: 'dashboard' },
     
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    plugins: {
    legend: {
      position: 'right',  
      labels: {
        padding: 20,        
        boxWidth: 12,       
        font: { size: 14 }, 
      
      },
      
    }
  }
  };



  //  getDashboardData(){
//   this._SharedService.getDashBoardDetails().subscribe({
//     next:(res)=>{
//       this.DashBoardData = res.data
//       console.log(this.DashBoardData)
//       console.log(res.data)

//     },
//   })
//  }

}
