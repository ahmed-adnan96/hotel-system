import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SharedService } from '../../services/shared.service';
import { DashboardResponse } from '../../interfaces/dashboard-responce';
import { log } from 'console';

import {
  Chart,
  ChartType,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip,
} from 'chart.js';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  pending: number = 0;
  complated: number = 0;
  chart!: Chart;
  DashBoardData: DashboardResponse = {
    rooms: 0,
    facilities: 0,
    bookings: {
      pending: 0,
      completed: 0,
    },
    ads: 0,
    users: {
      user: 0,
      admin: 0,
    },
  };

  //to make text center ...
  centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const { width, height } = chart;
      const ctx = chart.ctx;
      ctx.save();

      const fontSize = (height / 120).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000'; // text color

      const text = chart.config.options.plugins.centerText?.text || '';

      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.restore();
    },
  };
  constructor(private _SharedService: SharedService) {
    Chart.register(
      DoughnutController,
      ArcElement,
      Legend,
      this.centerTextPlugin,
      Tooltip
    );
  }
  ngOnInit(): void {
    this.getDashboardData();
  }

  createComplateChart(data: any) {
    this.chart = new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'completed'],
        datasets: [
          {
            data: [data.pending, data.completed],
            backgroundColor: ['#526BE8', '#A05ACE'],
            hoverOffset: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: { enabled: true },
          legend: {
            position: 'right',
            labels: {
              boxWidth: 15,
              boxHeight: 15,
              padding: 20,
              borderRadius: 10,
            },
          },
        },
      },
    });
  }

  createUserChart(data: any) {
    this.chart = new Chart('UserChart', {
      type: 'doughnut',
      data: {
        labels: ['User', 'Admin'],
        datasets: [
          {
            label: 'user',
            // data: [data.user , data.admin],
            data: [10, 15],
            backgroundColor: ['#54D14D', '#35C2FD'],
            hoverOffset: 3,
          },
        ],
      },
      options: {
        cutout: '80%',
        responsive: true,
        plugins: {
          legend: {
            display: false,
            tooltip: {
              enabled: true, // default is true
            },
          },
          centerText: { text: 'Users' } as any,
        } as any,
      },
    });
  }

  getDashboardData() {
    this._SharedService.getDashBoardDetails().subscribe({
      next: (res) => {
        console.log(res);
        this.DashBoardData = res.data;
        this.createComplateChart(this.DashBoardData.bookings);
        this.createUserChart(this.DashBoardData.users);
      },
    });
  }
}
