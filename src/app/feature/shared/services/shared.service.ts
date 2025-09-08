import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private _HttpClient: HttpClient) {}
  private isOpenedSubject = new BehaviorSubject<boolean>(false);

  isOpened$ = this.isOpenedSubject.asObservable();
  getDashBoardDetails(): Observable<any> {
    return this._HttpClient.get('admin/dashboard');
  }
  getCurrentUser(): Observable<any> {
    return this._HttpClient.get(`admin/users/${localStorage.getItem('id')}`);
  }
}
