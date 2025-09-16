import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';
export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const id = inject(PLATFORM_ID);
  let userToken = '';
  if (isPlatformBrowser(id)) {
    userToken = localStorage.getItem('userToken') || '';
  }
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  const myReq = req.clone({
    url: environment.ServerUrl + req.url,
    setHeaders: {
      Authorization: `${userToken}`,
    },
  });

  return next(myReq).pipe(
    finalize(() => {
      spinner.hide();
    })
  );
};
