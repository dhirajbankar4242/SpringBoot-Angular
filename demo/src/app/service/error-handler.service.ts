import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toaster: ToastrService, private router: Router) {
  }

  handleError(error: HttpErrorResponse): Observable<never> {

    console.error('An error occurred:', error);

    if (error.status == 0) {
      this.toaster.error('check connectivity and try again', 'Service down!');
    } else if (error.status === 401) {
      this.toaster.error('check your access or try to login again', 'Unauthorized access!');
      this.router.navigate(['/login']);
    } else if (error.status === 403) {
      this.toaster.error('check your access or try to login again', 'Unauthorized access!');
      this.router.navigate(['/login']);
    } else {
      this.toaster.error(error.error.message);
    }
    // Return an observable with an error message
    return throwError(error);
  }
}
