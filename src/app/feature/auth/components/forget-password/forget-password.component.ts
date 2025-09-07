import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, SharedModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  forgotPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  onSubmit(data: FormGroup) {
    console.log(data);
    this._AuthService.onForgotPassword(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._Router.navigateByUrl('/auth/resetPassword');
        this._ToastrService.success('Email Reset Successfully', 'Success');
      },
    });
  }
}
