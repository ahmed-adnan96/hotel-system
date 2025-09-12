import { Data } from './../../feature/room/interfaces/iroom';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly _HttpClient = inject(HttpClient);

  getAllBooking(data: any): Observable<any> {
    return this._HttpClient.get(`admin/booking`, { params: data });
  }
}
