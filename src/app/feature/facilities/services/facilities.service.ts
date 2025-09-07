import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFacilities } from '../interfaces/ifacilities';
import { environment } from '../../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  constructor(private _http: HttpClient) { }
  getAllFacilities(): Observable<IFacilities> {
    return this._http.get<IFacilities>('admin/room-facilities')
  }

}
