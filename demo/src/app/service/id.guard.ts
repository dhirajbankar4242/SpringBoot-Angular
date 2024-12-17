import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class IdGuard implements CanActivate {
  constructor(private service:HttpService, private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const invitationToken = route.paramMap.get('id');
      if (invitationToken) {
        return this.service.checkId(invitationToken).pipe(
          map(exists => {
            if (exists) {
              return true;
            } else {
              this.router.navigate(['/error']);
              return false;
            }
          }),
          catchError(() => {
            this.router.navigate(['/error']);
            return of(false);
          })
        );
      } else {
        this.router.navigate(['/error']);
        return false;
      }
  }
  
}
