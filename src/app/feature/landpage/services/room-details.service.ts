import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoomDetailsResponse, IRoomReviewRes } from '../interfaces/IRoomDetails';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService {

  constructor(private _HttpClient: HttpClient) { }

  getRoomDetails(id: string): Observable<IRoomDetailsResponse> {
    return this._HttpClient.get<IRoomDetailsResponse>(`portal/rooms/${id}`)
  }
  getRoomReview(id: string): Observable<IRoomReviewRes> {
    return this._HttpClient.get<IRoomReviewRes>(`portal/room-reviews/${id}`)
  }
  addRoomReview(data: any): Observable<any> {
    return this._HttpClient.post(`portal/room-reviews`, { data })
  }
}
