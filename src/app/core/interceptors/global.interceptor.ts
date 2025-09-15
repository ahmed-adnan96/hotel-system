import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject } from '@angular/core';
import { environment } from '../environment/environment';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  if (req.url.includes('/assets/')) {
    return next(req).pipe(finalize(() => spinner.hide()));
  }

  const token = localStorage.getItem('userToken');

  const myReq = req.clone({
    url: environment.ServerUrl + req.url,
    setHeaders: token ? { Authorization: ` ${token}` } : {},
  });

  return next(myReq).pipe(
    finalize(() => {
      spinner.hide();
    })
  );
};
