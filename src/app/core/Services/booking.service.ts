import { Data } from './../../feature/room/interfaces/iroom';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRootObject } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly _HttpClient = inject(HttpClient);

  getAllBooking(data: any): Observable<any> {
    return this._HttpClient.get(`admin/booking`, { params: data });
  }
  getAllUsers(data: any): Observable<IUserRootObject> {
    return this._HttpClient.get<IUserRootObject>(`admin/users`, {
      params: data,
    });
  }
}
