import { IProfile, IUser } from './../../interfaces/IProfile';
import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Observable } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: false,
})
export class ProfileComponent implements OnInit {
  //#region inject services
  private readonly _SharedService = inject(SharedService);
  //#endregion

  //#region inject Properties
  user!: IUser;
  //#endregion

  //#region Component Life cycle
  ngOnInit(): void {
    this.getProfile();
  }
  //#endregion

  //#region declaration Void
  getProfile() {
    this._SharedService.getCurrentUser().subscribe({
      next: (res: IProfile) => {
        this.user = res.data.user;
      },
    });
  }
  //#endregion
}
