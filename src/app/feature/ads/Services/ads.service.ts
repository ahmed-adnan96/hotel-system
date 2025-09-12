import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private _HttpClient:HttpClient){ }

  AddNewAdd(data:any):Observable<any>{
    return this._HttpClient.post('admin/ads' , data)
  }

  GetAdsById(id:any):Observable<any>{
    return this._HttpClient.get(`admin/ads/${id}`)
  }

  EditADs(Id:any , data:any):Observable<any>{
    return this._HttpClient.put(`admin/ads/${Id}`, data)
  }

  


}
