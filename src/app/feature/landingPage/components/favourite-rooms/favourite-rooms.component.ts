import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourite-rooms',
  templateUrl: './favourite-rooms.component.html',
  styleUrl: './favourite-rooms.component.scss',
  standalone:false
})
export class FavouriteRoomsComponent implements OnInit {
  
  roomList:any
  constructor(private _HomeService:HomeService , private _ToastrService:ToastrService) {  
  }

  ngOnInit(): void {
    this.getAllGavouriteRooms()
  }
 
  getAllGavouriteRooms(){
    this._HomeService.getAllFavourites().subscribe({
      next:(res)=>{
         this.roomList = res.data.favoriteRooms[0].rooms;
      }
    })
  }


  deleteFromFavourite(id:any){
    this._HomeService.deleteFromFavourite(id).subscribe({
      next:()=>{
        this._ToastrService.error('rooms removed from favourite successfully')
        this.getAllGavouriteRooms()
      },
    })
  }
}
