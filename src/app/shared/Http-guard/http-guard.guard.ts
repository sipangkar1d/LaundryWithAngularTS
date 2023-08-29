import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const httpGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (sessionStorage.getItem('token')){
    return true
  } else {
    router.navigateByUrl('/login')
    return false
  }
};
