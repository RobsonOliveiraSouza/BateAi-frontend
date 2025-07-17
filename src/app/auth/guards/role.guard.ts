import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export function roleGuard(rolesPermitidos: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isLoggedIn = authService.isLoggedIn();
    const role = authService.getUserRole();
    const status = authService.getUserStatus();

    if (!isLoggedIn || !role || !status) {
      router.navigate(['/auth/login']);
      return false;
    }

    // Se status for pendente
    if (status.startsWith('PENDENTE')) {
      router.navigate(['/aguarde-aprovacao']);
      return false;
    }

    if (status.startsWith('REJEITADO')) {
      router.navigate(['/acesso-negado']);
      return false;
    }

    if (status.startsWith('APROVADO') && rolesPermitidos.includes(role)) {
      return true;
    }

    router.navigate(['/auth/login']);
    return false;
  };
}
