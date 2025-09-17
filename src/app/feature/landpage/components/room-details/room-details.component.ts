import { Component, OnInit } from '@angular/core';
import { RoomDetailsService } from '../../services/room-details.service';
import { ActivatedRoute } from '@angular/router';
import { IRoom, IRoomDetailsResponse, IRoomReview } from '../../interfaces/IRoomDetails';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss',
  standalone: false,
})
export class RoomDetailsComponent implements OnInit {

  roomId: string = '68c7732f7ccfcdd45ee94930'
  roomDetails!: IRoom
  roomReview: IRoomReview[] = [];
  endDate!: Date;
  startDate!: Date;
  message!: string;
  comment!: string;
  constructor(private _RoomDetailsService: RoomDetailsService, private _route: ActivatedRoute) { }

  token = localStorage.getItem('userToken')
  ngOnInit(): void {
    // this.roomId=this._route.snapshot.paramMap.get('id')as string;
    this.getRoomDetails(this.roomId)
    if (this.token) {
      this.getRoomReview(this.roomId)
    }
  }

  getRoomDetails(id: string) {
    this._RoomDetailsService.getRoomDetails(id).subscribe({
      next: (res: IRoomDetailsResponse) => {
        console.log(res.data.room)
        this.roomDetails = res.data.room;
      },
    })
  }


  getRoomReview(id: string) {
    this._RoomDetailsService.getRoomReview(id).subscribe({
      next: (res) => {
        this.roomReview = res.data.roomReviews
        console.log(this.roomReview);
      },
    })
  }

  carouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: true,
    nav: false,
    navText: ['<', '>'],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
  };
}
