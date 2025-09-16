import { Data } from './../../../room/interfaces/iroom';
import { Component, inject, OnInit } from '@angular/core';
import { MyTranslateService } from '../../../../core/Services/my-translate.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from '../../services/home.service';
import { Iroom } from '../../interfaces/iroom';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-land-page-home',
  templateUrl: './land-page-home.component.html',
  styleUrl: './land-page-home.component.scss',
  standalone: false,
})
export class LandPageHomeComponent implements OnInit {
  roomList: Iroom[] = [];
  AdsList:any[] = []
  constructor(private _HomeService: HomeService) {}

  ngOnInit(): void {
    this.getAllRooms();
    this.getAllAds();
  }

  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);
  change(lang: string): void {
    this._MyTranslateService.changeLanguage(lang);
  }

  getAllRooms() {
    let params = {
      page: 3,
      size: 7,
    };
    this._HomeService.getAllRooms(params).subscribe({
      next: (res) => {
        this.roomList = res.data?.rooms ?? [];
        console.log(this.roomList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllAds(){
    this._HomeService.getAllAds().subscribe({
      next:(res)=>{
        this.AdsList = res.data.ads
        console.log(this.AdsList)
      },
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

 
}
