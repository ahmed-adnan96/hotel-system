import { IRoomRequest, IRoomResponse } from './../interfaces/iroom';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomingService {
  constructor(private _HttpClient: HttpClient) {}
  createRoom(roomDetails: FormData): Observable<IRoomResponse> {
    return this._HttpClient.post<IRoomResponse>('admin/rooms', roomDetails);
  }
  editRoom(roomDetails: any, id: any): Observable<any> {
    return this._HttpClient.put(`admin/rooms/${id}`, roomDetails);
  }
  getRoomDetails(id: any): Observable<any> {
    return this._HttpClient.get(`admin/rooms/${id}`);
  }
  deleteRoom(id: any): Observable<any> {
    return this._HttpClient.delete(`admin/rooms/${id}`);
  }
  getAllRoom(data:any): Observable<any> {
    return this._HttpClient.get('admin/rooms', {
      params: data
    } );
  }
}
