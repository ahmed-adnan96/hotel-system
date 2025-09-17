import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      //1-Get Language From localStorage
      const SavedLanguage = localStorage.getItem('lang') || 'en';
      //2- Set Default Language
      this._TranslateService.setFallbackLang('en');
      //3-use Language From localStorage
      this._TranslateService.use(SavedLanguage!);
      //4-Go to change direction
      this.changeDirection();
      //5-Go to Configuration in your appConfig
    }
  }
  changeDirection() {
    const SavedLanguage = localStorage.getItem('lang');

    if (SavedLanguage === 'ar') {
      // change dir rtl
      document.documentElement.dir = 'rtl';
    } else {
      // change dir ltr
      document.documentElement.dir = 'ltr';
    }
  }
  changeLanguage(lang: string = 'en'): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('lang', lang); //save Language in localStorage
      this._TranslateService.use(lang);
      this.changeDirection();
    }
  }
}
