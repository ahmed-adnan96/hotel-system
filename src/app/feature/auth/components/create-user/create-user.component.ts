import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  standalone: false,
})
export class CreateUserComponent {
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router,
  ) { }

  //#region  declaration properties
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  srcImg: any;
  files: File[] = [];
  selected = 'option2';
  //#endregion

  //#region declaration FormGroup
  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    userName: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, { validators: this.confirmPassword });
  //#endregion

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    let myData = new FormData();
    let formValues: any = this.registerForm.getRawValue();
    for (let key in formValues) {
      myData.append(key, String(formValues[key]));
    }
    if (this.srcImg) {
      myData.append('profileImage', this.srcImg);
    }
    this._AuthService.register(myData).subscribe({
      next: (res) => {
        console.log(res)
        this._Router.navigate(['/auth/login']);
      },
      complete: () => {
        this._ToastrService.success('you have been registered successfully');
      }
    });
  }
  //#endregion

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }


  // dropZone
  onSelect(event: any) {
    const selectedFile = event.addedFiles[0];
    if (selectedFile) {
      this.files = [selectedFile];
    }
    this.srcImg = this.files[0];
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
