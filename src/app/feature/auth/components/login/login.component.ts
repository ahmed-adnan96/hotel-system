import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  //#region Inject services
  private readonly _AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  //#endregion

  //#region  declaration properties
  hide: boolean = true;

  //#endregion

  //#region declaration FormGroup
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
  });
  //#endregion

  //#region declaration void
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const myData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this._AuthService.login(myData).subscribe({
      next: (res) => {
        this._ToastrService.success('you have been login successfully');
        localStorage.setItem('userToken', res.data.token);
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('userName', res.data.user.userName);
        localStorage.setItem('id', res.data.user._id);
        this._Router.navigate(['/dashboard']);
        this._AuthService.email = this.loginForm.value.email;
      },
    });
  }
  //#endregion
}
