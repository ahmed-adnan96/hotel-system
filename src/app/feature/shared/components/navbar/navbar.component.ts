import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { environment } from '../../../../core/environment/environment';
import { Router } from '@angular/router';

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
      next: (res) => {
        // https://upskilling-egypt.com:3000/uploads/70235_2024-01-12T14:22:12.496Z_wallpaperflare.com_wallpaper%20(1).jpg
        this.imagePath = encodeURI('https://upskilling-egypt.com:3000/' + res.data.user.profileImage)
        console.log(this.imagePath);
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
