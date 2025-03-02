import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('cart') && !req.url.includes('orders')) return next(req);
  const _PLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(_PLATFORM_ID)) {
    const newReq = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')!,
      },
    });
    return next(newReq);
  }
  return next(req);
};
