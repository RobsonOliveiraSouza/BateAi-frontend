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

    // Se não logado ou sem role, bloqueia
    if (!isLoggedIn || !role) {
      router.navigate(['/auth/login']);
      return false;
    }

    // Se for empresa, não há status, só validar role
    if (role === 'EMPRESA') {
      if (rolesPermitidos.includes(role)) {
        return true; // libera
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    }

    // Para usuários que têm status:
    if (!status) {
      router.navigate(['/auth/login']);
      return false;
    }

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