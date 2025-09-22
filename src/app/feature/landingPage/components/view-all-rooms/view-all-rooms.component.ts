import { Data } from './../../../room/interfaces/iroom';
import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-all-rooms',
  templateUrl: './view-all-rooms.component.html',
  styleUrl: './view-all-rooms.component.scss',
  standalone: false,
})
export class ViewAllRoomsComponent implements OnInit {
  startDate: any
  endDate: any
  roomList: any
  constructor(private _route: ActivatedRoute, private _homeService: HomeService) { }

  ngOnInit(): void {
    this.startDate = this._route.snapshot.queryParamMap.get('startDate');
    this.endDate = this._route.snapshot.queryParamMap.get('endDate');
    this.getExploreRooms()
  }


  getExploreRooms() {
    const data = {
      page: 3,
      size: 7,
      startDate: this.startDate,
      endDate: this.endDate
    }
    if (this.endDate) {
      this._homeService.getAllRooms(data).subscribe({
        next: (res) => {
          this.roomList = res.data.rooms
        }
      })
    }
    else {
      this._homeService.getAllRooms({ page: 1, size: 40 }).subscribe({
        next: (res) => {
          this.roomList = res.data.rooms

        },
      })
    }
  }
}
