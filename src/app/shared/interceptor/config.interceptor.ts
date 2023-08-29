import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class ConfigInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.status === 400) {
          errorMessage = 'Bad Request';
        } else if (error.status === 401) {
          errorMessage = 'Unauthorized';
          this.router.navigate(['/login']);
        } else if (error.status === 404) {
          errorMessage = 'Not Found';
          this.router.navigate(["/notfound404"]);
        } else if (error.status === 409) {
          errorMessage = 'Conflict Data';
        }else if (error.status === 500) {
          errorMessage = 'Server Error';
        }

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });

        return throwError(error);
      })
    );
  }
}
