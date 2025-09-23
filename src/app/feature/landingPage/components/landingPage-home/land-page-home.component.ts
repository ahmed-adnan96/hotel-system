import { Component,OnInit} from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Iroom } from '../../interfaces/iroom';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-land-page-home',
  templateUrl: './land-page-home.component.html',
  styleUrl: './land-page-home.component.scss',
  standalone: false,
})
export class LandPageHomeComponent implements OnInit {
  roomList: Iroom[] = [];
  AdsList:any[] = [];
  lang :string = '';
  CarousalDirection:boolean = false;

  constructor(private _HomeService: HomeService , private _Router:Router , private _translate: TranslateService) {}

  ngOnInit(): void {
    this.getAllRooms();
    this.getAllAds();
    this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
      if(this.lang === 'ar'){
        this.CarousalDirection = true;
        this.changeOptions(true)
      }
      else{
        this.CarousalDirection = false
        this.changeOptions(false)
      }
      console.log(this.CarousalDirection)
    });

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

  changeOptions(flag :boolean) {
    this.customOptions = { ...this.customOptions, rtl: flag}
  }
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    rtl: this.CarousalDirection,
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

explore(formData:FormGroup){
  let Dates = formData.value
  if(!Dates){
    return;
  }
  const startDate =Dates.start.toISOString().split('T')[0];
  const endDate = Dates.end.toISOString().split('T')[0];
  this._Router.navigate(['/ViewAllRooms'], { queryParams: {'startDate': startDate, 'endDate': endDate } });
}
}
