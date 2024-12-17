import { HttpInterceptorFn } from '@angular/common/http';
import { Global } from '../admin/dto/dtos';
import { StorageService } from './storage.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = new StorageService()
  const token = localStorage.getItem(Global.key_token)

  if (req.url.includes('/auth')) {
    return next(req)
  }

  const cloneReq = req.clone({
    setHeaders: {
      'X-Authorization': `Bearer ${token}`
    }
  });

  return next(cloneReq);
};




