import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken') !== null){
       this.getProfile();
    }
 
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


