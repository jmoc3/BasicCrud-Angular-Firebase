import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../auth/shared/data-access/auth-state.service';
import { map } from 'rxjs';

// Para vistas solo accesibles por usuarios
export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authstate = inject(AuthStateService);

    return authstate.authState$.pipe(
      map((state) => {
        if (!state) {
          router.navigateByUrl('/auth/sign-in');
          return false;
        }
        return true;
      }),
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authstate = inject(AuthStateService);

    return authstate.authState$.pipe(
      map((state) => {
        if (state) {
          router.navigateByUrl('/tasks');
          return false;
        }
        return true;
      }),
    );
  };
};
