import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _HttpClient: HttpClient) {
  }
  public email: string | any = '';


  login(data: any): Observable<any> {
    return this._HttpClient.post(`admin/users/login`, data);
  }


  register(data: any): Observable<any> {
    return this._HttpClient.post(`admin/users`, data);
  }

  changePassword(data:any):Observable<any>{
    return this._HttpClient.post('admin/users/change-password' , data)
  }
}


