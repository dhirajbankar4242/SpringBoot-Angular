import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { Global } from '../admin/dto/dtos';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router()
  const localStorage = new StorageService();
  const token = localStorage.getItem(Global.key_token)

  if(token){
    return true
  }
  alert("login first")
  router.navigate(['/log_in'])
  return false;
};
