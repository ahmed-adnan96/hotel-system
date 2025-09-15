import { Component, inject } from '@angular/core';
import { MyTranslateService } from '../../../../core/Services/my-translate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-room-navbar',
  templateUrl: './room-navbar.component.html',
  styleUrl: './room-navbar.component.scss',
  standalone: false,
})
export class RoomNavbarComponent {
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);
  change(lang: string): void {
    this._MyTranslateService.changeLanguage(lang);
  }
}
