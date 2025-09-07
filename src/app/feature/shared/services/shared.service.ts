import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _HttpClient:HttpClient) { }


  getDashBoardDetails():Observable<any>{
    return this._HttpClient.get('admin/dashboard')
  }


}
