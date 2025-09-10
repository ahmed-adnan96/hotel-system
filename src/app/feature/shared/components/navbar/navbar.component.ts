import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { IProfile } from '../../interfaces/IProfile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: false,
})
export class NavbarComponent implements OnInit, OnDestroy {
  private currentUser!: Subscription;
  ngOnInit(): void {
    this.getCurrentUser();
  }
  username: string = localStorage.getItem('userName') ?? 'User';
  imagePath!: string;
  private readonly _SharedService = inject(SharedService);
  private readonly Router = inject(Router);
  getCurrentUser() {
    this.currentUser = this._SharedService.getCurrentUser().subscribe({

      next: (res: IProfile) => {
        this.imagePath = res.data.user.profileImage;
      },
    });
  }
  logOut() {
    localStorage.clear();
    this.Router.navigate(['/auth/login']);
  }
  ngOnDestroy(): void {
    this.currentUser.unsubscribe();
  }
}
