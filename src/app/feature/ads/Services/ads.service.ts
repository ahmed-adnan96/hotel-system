import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdsResponse } from '../interfaces/IAds';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private _HttpClient:HttpClient){ }

  AddNewAdd(data:any):Observable<any>{
    return this._HttpClient.post('admin/ads' , data)
  }

  deleteAds(id:number):Observable<any>{
    return this._HttpClient.delete(`admin/ads/${id}`)
  }

  GetAdsById(id:any):Observable<any>{
    return this._HttpClient.get(`admin/ads/${id}`)
  }

  EditADs(Id:any , data:any):Observable<any>{
    return this._HttpClient.put(`admin/ads/${Id}`, data)
  }

    getAllAds():Observable<IAdsResponse>{
    return this._HttpClient.get<IAdsResponse>(`admin/ads`)
  }


}
