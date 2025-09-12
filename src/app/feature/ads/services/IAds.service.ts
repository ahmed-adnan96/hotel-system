import { IAdsResponse } from './../interfaces/IAds';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private _httpClient:HttpClient) { }

  getAllAds():Observable<IAdsResponse>{
    return this._httpClient.get<IAdsResponse>(`admin/ads`)
  }
}
