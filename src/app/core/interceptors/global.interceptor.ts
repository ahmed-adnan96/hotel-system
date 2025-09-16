import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject } from '@angular/core';
import { environment } from '../environment/environment';
export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  if (req.url.startsWith('/assets')) {
    return next(req).pipe(finalize(() => spinner.hide()));
  }
  const myReq = req.clone({
    url: environment.ServerUrl + req.url,
    // setHeaders: {
    //   Authorization: `${localStorage.getItem('userToken')}`,
    // },
  });

  return next(myReq).pipe(
    finalize(() => {
      spinner.hide();
    })
  );
};
