import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../shared/services/shared.service';
import { IProfile } from '../../../shared/interfaces/IProfile';
import { MyTranslateService } from '../../../core/Services/my-translate.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-room-navbar',
  templateUrl: './room-navbar.component.html',
  styleUrl: './room-navbar.component.scss',
  imports: [SharedModule],
  standalone: true,
})
export class RoomNavbarComponent implements OnInit {
  //#region inject Services
  private readonly _MyTranslateService = inject(MyTranslateService);
  private readonly _SharedService = inject(SharedService);
  readonly _TranslateService = inject(TranslateService);
  //#endregion

  //#region  declaration properties
  imagePath: string = '';
  username: string = localStorage.getItem('userName') ?? '';

  //#endregion

  //#region declaration Void
  change(lang: string): void {
    this._MyTranslateService.changeLanguage(lang);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token;
  }

  //#endregion

  //#region NavItem
  navMenu: any[] = [
    {
      title: 'navbar.Home',
      menuLink: '/Home',
      isActive: true,
    },
    {
      title: 'navbar.Explore',
      menuLink: '/ViewAllRooms',
      isActive: true,
    },
    {
      title: 'navbar.Reviews',
      menuLink: '/RoomDetails',
      isActive: this.isLoggedIn(),
    },
    {
      title: 'navbar.Favorites',
      // menuLink: 'test',
      isActive: this.isLoggedIn(),
    },
  ];
  //#endregion

  //#region declaration Function
  logOut(): void {
    localStorage.clear();
  }
  getCurrentUser() {
    if (localStorage.getItem('userToken')) {
      this._SharedService.getCurrentUser().subscribe({
        next: (res: IProfile) => {
          this.imagePath = res.data.user.profileImage;
        },
      });
    }
  }
  //#endregion

  //#region Component Life Cycle
  ngOnInit(): void {
    console.log(this.imagePath);
    this.getCurrentUser();
  }
  //#endregion

  
}
