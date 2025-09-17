import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { RoomDetailsService } from '../../services/room-details.service';
import { ActivatedRoute } from '@angular/router';
import { ICommentReq, IRoom, IRoomComment, IRoomDetailsResponse, IRoomReview } from '../../interfaces/IRoomDetails';
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
  endDate!: Date;
  startDate!: Date;
  message!: string;
  comment!: string;
  editId!: string;
  editComment!: string;
  rating = 0;
  languageLoaded = true;
  manualCarouselOptions !: OwlOptions;
  autoplayCarouselOptions !: OwlOptions;
  constructor(private _RoomDetailsService: RoomDetailsService, private _route: ActivatedRoute, private _toastrService: ToastrService, private translateService: TranslateService) { }

  token = localStorage.getItem('userToken')
  ngOnInit(): void {
    this.roomId=this._route.snapshot.paramMap.get('id')as string;

    this.getRoomDetails(this.roomId)
    this.getRoomReview(this.roomId)
    this.getRoomComment(this.roomId)
    this.setCarouselOptions(this.translateService.currentLang);

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.languageLoaded = false;

      this.setCarouselOptions(event.lang);

      setTimeout(() => this.languageLoaded = true, 0);
    });
  }

  getRoomDetails(id: string) {
    this._RoomDetailsService.getRoomDetails(id).subscribe({
      next: (res: IRoomDetailsResponse) => {
        this.roomDetails = res.data.room;
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
  updateComment(id: string) {
    this._RoomDetailsService.updateComment(id, { "comment": this.comment }).subscribe({
      complete: () => {
        this.getRoomComment(this.roomId)
        this.comment = ''
        this._toastrService.success('Comment updated successfully')
      },
    })
  }
  setRating(value: number) {
    this.rating = value;
  }
  setCarouselOptions(lang: string) {
    this.autoplayCarouselOptions = {
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
      rtl: lang === 'ar'
    };

    this.manualCarouselOptions = {
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
      rtl: lang === 'ar'
    }
  }
}
