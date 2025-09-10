import {
  AfterViewInit,
  Component,
  Inject,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RoomingService } from '../../services/rooming.service';
import { IRoom, IRootObject } from '../../interfaces/IRoomDetailes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss',
  standalone: false,
})
export class ViewRoomComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string }
  ) {}

  //#region inject services
  private readonly _RoomingService = inject(RoomingService);

  //#endregion

  //#region declaration properties
  room!: IRoom;
  //#endregion

  //#region declaration Void
  gatRoomDetails() {
    this._RoomingService.getRoomDetails(this.data.roomId).subscribe({
      next: (res: IRootObject) => {
        {
          this.room = res.data.room;
        }
      },
    });
  }
  //#endregion

  //#region carouselOptions

  carouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['‹', '›'],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
  };

  //#endregion

  //#region component life cycle.
  ngOnInit(): void {
    this.gatRoomDetails();
  }
  //#endregion
}
