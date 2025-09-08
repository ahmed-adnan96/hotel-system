import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, SharedModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  resetPassForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
      seed: new FormControl(null, [Validators.required]),
    },
    { validators: this.confirmPassword }
  );

  onSubmit(data: FormGroup) {
    console.log(data);
    this._AuthService.onResetPassword(data.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.massege);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.massege);
      },
      complete: () => {
        this._Router.navigateByUrl('/auth/resetPassword');
        this._ToastrService.success('Password Reset Successfully', 'Success');
      },
    });
  }
}
