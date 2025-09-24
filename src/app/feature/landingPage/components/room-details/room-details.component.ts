import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { RoomDetailsService } from '../../services/room-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBookingReq, IRoom, IRoomComment, IRoomDetailsResponse, IRoomReview } from '../../interfaces/IRoomDetails';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss',
  standalone: false,
})
export class RoomDetailsComponent implements OnInit {
  roomId: string = ''
  roomDetails!: IRoom
  roomReview: IRoomReview[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  roomComments: IRoomComment[] = [];
  endDate!: string;
  startDate!: string;
  message!: string;
  comment!: string;
  editId!: string;
  editComment!: string;
  rating = 0;
  discount = 0;
  roomPrice = 0;
  lang: string = '';
  CarousalDirection: boolean = false;

  constructor(private _RoomDetailsService: RoomDetailsService, private _route: ActivatedRoute, private _toastrService: ToastrService, private _translate: TranslateService, private _router: Router) { }

  token = localStorage.getItem('userToken')
  ngOnInit(): void {
    this.roomId = this._route.snapshot.paramMap.get('id') as string;
    this.getRoomDetails(this.roomId)
    this.getRoomReview(this.roomId)
    this.getRoomComment(this.roomId)
    this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
      if (this.lang === 'ar') {
        this.CarousalDirection = true;
        this.changeOptions(true)
      }
      else {
        this.CarousalDirection = false
        this.changeOptions(false)
      }
    });
  }

  getRoomDetails(id: string) {
    this._RoomDetailsService.getRoomDetails(id).subscribe({
      next: (res: IRoomDetailsResponse) => {
        this.roomDetails = res.data.room;
        this.roomPrice = res.data.room.price
        this.discount = res.data.room.discount
      },
    })
  }


  getRoomReview(id: string) {
    this._RoomDetailsService.getRoomReview(id).subscribe({
      next: (res) => {
        this.roomReview = res.data.roomReviews
      },
    })
  }

  addReview() {
    const data = {
      "roomId": this.roomId,
      "rating": this.rating,
      "review": this.message
    }
    this._RoomDetailsService.addRoomReview(data).subscribe({
      complete: () => {
        this.getRoomReview(this.roomId)
        this.message = ''
        this.rating = 0
        this._toastrService.success('Your rating and review have been added successfully')
      },
    })
  }
  getRoomComment(id: string) {
    this._RoomDetailsService.getRoomComment(id).subscribe({
      next: (res) => {
        this.roomComments = res.data.roomComments
      }
    })
  }
  addComment() {
    const data = {
      "roomId": this.roomId,
      "comment": this.comment
    }
    this._RoomDetailsService.addRoomComment(data).subscribe({
      complete: () => {
        this.comment = ''
        this._toastrService.success('Your comment have been added successfully')
        this.getRoomComment(this.roomId)
      },
    })
  }
  deleteComment(id: string) {
    this._RoomDetailsService.deleteComment(id).subscribe({
      complete: () => {
        this.getRoomComment(this.roomId)
        this._toastrService.success('Comment deleted successfully')
      },
    })
  }
  startEdit(id: string, comment: string) {
    this.comment = comment
    this.editId = id
  }
  updateComment() {
    this._RoomDetailsService.updateComment(this.editId, { "comment": this.comment }).subscribe({
      complete: () => {
        this.getRoomComment(this.roomId)
        this.comment = ''
        this.editId = ''
        this._toastrService.success('Comment updated successfully')
      },
    })
  }
  addRating(value: number) {
    this.rating = value;
  }
  changeOptions(flag: boolean) {
    this.autoplayCarouselOptions = { ...this.autoplayCarouselOptions, rtl: flag }
    this.manualCarouselOptions = { ...this.manualCarouselOptions, rtl: flag }
  }
  autoplayCarouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 8000,
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
    rtl: false
  };

  manualCarouselOptions: OwlOptions = {
    loop: false,
    autoplay: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    dots: false,
    nav: true,
    navText: ['<', '>'],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
    rtl: false
  }

  imagesCarouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: true,
    nav: false,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      }
    },
    rtl: false
  }

  getDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffDays = ((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
  }
      

  booking() {
    const days = this.getDays(this.startDate, this.endDate)
    const data: IBookingReq = {
      startDate: this.startDate,
      endDate: this.endDate,
      room: this.roomId,
      totalPrice: (this.roomPrice * days) - ((this.roomPrice * days) * (this.discount / 100))
    };
    this._RoomDetailsService.booking(data).subscribe({
      next: (res) => {
        this._router.navigate(['/payment'], { queryParams: { 'bookingId': res.data.booking._id, 'totalPrice': res.data.booking.totalPrice } })
      }
    })
  }
}
