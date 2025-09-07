import { IFacilities } from './../interfaces/ifacilities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environment/environment';
import { INewFacility } from '../interfaces/INewFacility';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  constructor(private _http: HttpClient) {}
  getAllFacilities(): Observable<IFacilities> {
    return this._http.get<IFacilities>('admin/room-facilities');
  }
  addNewFacility(data: INewFacility): Observable<INewFacility> {
    return this._http.post<INewFacility>('admin/room-facilities', data);
  }
  editFacility(id: number, data: INewFacility): Observable<INewFacility> {
    return this._http.put<INewFacility>(`admin/room-facilities/${id}`, data);
  }
}
