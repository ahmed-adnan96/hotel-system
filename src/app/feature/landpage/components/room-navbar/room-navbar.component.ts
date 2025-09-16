import { Component, inject } from '@angular/core';
import { MyTranslateService } from '../../../../core/Services/my-translate.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-room-navbar',
  templateUrl: './room-navbar.component.html',
  styleUrl: './room-navbar.component.scss',
  standalone: false,
})
export class RoomNavbarComponent {
  private readonly _MyTranslateService = inject(MyTranslateService);
  private readonly _SharedService = inject(SharedService);
  readonly _TranslateService = inject(TranslateService);
  imagePath: string = '';
  username: string = localStorage.getItem('userName') ?? '';
  change(lang: string): void {
    this._MyTranslateService.changeLanguage(lang);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');
    this.imagePath = this._SharedService.imagePath;
    return !!token;
  }

  navMenu: any[] = [
    {
      title: 'navbar.Home',
      menuLink: '/landPage/layoutRoom/landPageHome',
      isActive: true,
    },
    {
      title: 'navbar.Explore',
      menuLink: '/landPage/layoutRoom/ViewAllRooms',
      isActive: true,
    },
    {
      title: 'navbar.Reviews',
      menuLink: '/landPage/layoutRoom/RoomDetails',
      isActive: this.isLoggedIn(),
    },
    {
      title: 'navbar.Favorites',
      menuLink: '/landPage/layoutRoom/ViewAllRooms',
      isActive: this.isLoggedIn(),
    },
  ];
  //#region declaration Function
  logOut(): void {
    localStorage.clear();
  }
  //#endregion
}
