import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';

// import { SessionService } from '../session.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


export const prefixReq = '[HTTP Interceptor ⤴] -';
export const prefixRes = '[HTTP Interceptor ⤵] -';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
//   constructor(private router: Router ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = 'token';
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authHeader}`, 'Content-Type': 'application/json' },
      withCredentials: true
    });

    console.groupCollapsed(`${prefixReq} Auth`);
    console.log(`Adding Auth header`);
    console.groupEnd();
    // Pass on the cloned request instead of the original request.
    return next.handle(req).pipe(this.handleErrors); // change here req by authReq 😃
  }

  handleErrors(source: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        return error.status === 401 ? this.handle401(error) : throwError(error);
      })
    );
  }

  handle401(error: HttpErrorResponse) {
    const authResHeader = error.headers.get('WWW-Authenticate');
    if (/is expired/.test(authResHeader)) {
        console.log("this.router.navigate(['login']);");
        //   this.router.navigate(['login']);
        // this.sessionService.refreshToken();
    } else {
        console.log("this.router.navigate(['authfailed']);");
    //   this.router.navigate(['authfailed']);
    }
    return EMPTY;
  }
}