import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Iroom } from '../../interfaces/iroom';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-page-home',
  templateUrl: './land-page-home.component.html',
  styleUrl: './land-page-home.component.scss',
  standalone: false,
})
export class LandPageHomeComponent implements OnInit {
  roomList: Iroom[] = [];
  AdsList:any[] = []
  constructor(private _HomeService: HomeService , private _Router:Router) {}

  ngOnInit(): void {
    this.getAllRooms();
    this.getAllAds();
  }

 readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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
    rtl: this.isArabic(),
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

  isArabic(): boolean {
   return localStorage.getItem('lang') === 'ar'; 
}

 
explore(formData:FormGroup){
  let Dates = formData.value
  if(!Dates){
    return;
  }
  const startDate =Dates.start.toISOString().split('T')[0];
  const endDate   = Dates.end.toISOString().split('T')[0];
  this._Router.navigate(['/explore'], { queryParams: {'startDate': startDate, 'endDate': endDate } });  
}
}
