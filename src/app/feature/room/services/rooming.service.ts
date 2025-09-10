import { IRoomResponse } from './../interfaces/iroom';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRootObject } from '../interfaces/IRoomDetailes';

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
  getRoomDetails(id: string): Observable<IRootObject> {
    return this._HttpClient.get<IRootObject>(`admin/rooms/${id}`);
  }
  deleteRoom(id: any): Observable<any> {
    return this._HttpClient.delete(`admin/rooms/${id}`);
  }
  getAllRoom(data: any): Observable<any> {
    return this._HttpClient.get('admin/rooms', {
      params: data,
    });
  }
}
