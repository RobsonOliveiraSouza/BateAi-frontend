import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const targetUrl = state.url;

  if (!token && targetUrl !== '/auth/login') {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
