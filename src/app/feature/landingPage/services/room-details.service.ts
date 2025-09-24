import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookingReq, IBookingRes, ICommentReq, IPaymentRes, IReviewReq, IRoomCommentRes, IRoomDetailsResponse, IRoomReviewRes } from '../interfaces/IRoomDetails';

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
  getRoomComment(id: string): Observable<IRoomCommentRes> {
    return this._HttpClient.get<IRoomCommentRes>(`portal/room-comments/${id}`)
  }
  addRoomReview(data: IReviewReq): Observable<any> {
    return this._HttpClient.post(`portal/room-reviews`, data)
  }
  addRoomComment(data: ICommentReq): Observable<any> {
    return this._HttpClient.post(`portal/room-comments`, data)
  }
  deleteComment(id: string): Observable<any> {
    return this._HttpClient.delete(`portal/room-comments/${id}`)
  }
  updateComment(id: string, data: any): Observable<any> {
    return this._HttpClient.patch(`portal/room-comments/${id}`, data)
  }
  booking(data: IBookingReq): Observable<IBookingRes> {
    return this._HttpClient.post<IBookingRes>(`portal/booking/`, data)
  }
  payment(token: string, id: string): Observable<IPaymentRes> {
    return this._HttpClient.post<IPaymentRes>(`portal/booking/${id}/pay`, {token})
  }
}
