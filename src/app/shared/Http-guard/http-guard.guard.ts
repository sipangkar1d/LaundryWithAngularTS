import { CanActivateFn } from '@angular/router';

export const httpGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
