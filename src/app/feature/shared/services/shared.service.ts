import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../core/environment/environment';
import { IProfile } from '../interfaces/IProfile';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private _HttpClient: HttpClient) {}
  getDashBoardDetails(): Observable<any> {
    return this._HttpClient.get('admin/dashboard');
  }
  getCurrentUser(): Observable<IProfile> {
    return this._HttpClient.get<IProfile>(
      `admin/users/${localStorage.getItem('id')}`
    );
  }
}
