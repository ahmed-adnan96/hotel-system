import { Component, inject, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RoomingService } from '../../services/rooming.service';
import { IRoom, IRootObject } from '../../interfaces/IRoom';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss',
  standalone: false,
})
export class ViewRoomComponent implements OnInit {
  //#region inject services
  private readonly _RoomingService = inject(RoomingService);
  //#endregion

  //#region declaration properties
  room!: IRoom;
  //#endregion

  //#region declaration Void
  gatRoomDetails() {
    this._RoomingService.getRoomDetails('68bfcfbf7ccfcdd45ee8f662').subscribe({
      next: (res: IRootObject) => {
        {
          console.log(res);
          this.room = res.data.room;
        }
      },
    });
  }
  //#endregion

  //#region carouselOptions
  carouselOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['‹', '›'],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
    nav: true,
  };
  //#endregion

  //#region component life cycle.
  ngOnInit(): void {
    this.gatRoomDetails();
  }
  //#endregion
}
