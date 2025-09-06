import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  standalone: false,
})
export class ChangePasswordComponent {
  PasswordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/;
  passwordError: string =
    'Password must contain uppercase, lowercase, number, symbol (max 10 chars)';
  hide = true;
  hidenewPass = true;
  hideCofirmPass = true;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _ToastrService:ToastrService
  ) {}
  changePasswordForm: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.PasswordPattern),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.PasswordPattern),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.PasswordPattern),
      ]),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newpassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newpassword === confirmPassword ? null : { passwordMismatch: true };
  }

  ChangePassowrd(changePasswordForm: FormGroup) {
    this._auth.changePassword(changePasswordForm.value).subscribe({
      next:()=>{
        this._ToastrService.success('your password has been changed successfully')
        this._router.navigate(['auth/login'])
      }
    });
  }
}
