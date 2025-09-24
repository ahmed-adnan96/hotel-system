import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _HttpClient:HttpClient) { }
  getAllRooms(data:any):Observable<any>{
      return this._HttpClient.get('portal/rooms/available', {
        params:data
      })
  }

  getAllAds():Observable<any>{
    return this._HttpClient.get('portal/ads')
  }
  
  AddToFavourite(id:any):Observable<any>{
    let body ={
      roomId : id
    }
   return this._HttpClient.post('portal/favorite-rooms' , body)
  }

  getAllFavourites():Observable<any>{
   return this._HttpClient.get('portal/favorite-rooms')
  }


  deleteFromFavourite(id:any):Observable<any>{
    let body ={
      roomId : id
    }
   return this._HttpClient.delete(`portal/favorite-rooms/${id}` , {body})
  }
}
