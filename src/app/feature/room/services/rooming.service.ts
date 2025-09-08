import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomingService {
  constructor(private _HttpClient: HttpClient) {}
  createRoom(roomDetails: any): Observable<any> {
    return this._HttpClient.post('admin/rooms', roomDetails);
  }
  editRoom(roomDetails: any, id: any): Observable<any> {
    return this._HttpClient.put(`admin/rooms/${id}`, roomDetails);
  }
  getRoomDetails(id: any): Observable<any> {
    return this._HttpClient.get(`admin/rooms/${id}`);
  }
  deletRoom(id: any): Observable<any> {
    return this._HttpClient.delete(`admin/rooms/${id}`);
  }
  getAllRoom(page: number, size: number): Observable<any> {
    return this._HttpClient.get(`admin/rooms?page=${page}&size=${size}`);
  }
}
