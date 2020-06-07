import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
export const prefixReq = '[HTTP Interceptor ⤴] -';
export const prefixRes = '[HTTP Interceptor ⤵] -';



@Injectable()
export class ReadOnlyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const readOnly = false; // this.sessionService.readOnly;
        if (!readOnly || this.okIfReadOnly(req)) {
          console.groupCollapsed(`${prefixReq} Read-Only`);
          console.log(`Data is not read-only`);
          console.groupEnd();
          return next.handle(req);
        } else {
          const msg = `Can't ${req.method} ${req.url} when read-only`;
          console.groupCollapsed(`${prefixReq} Read-Only`);
          console.error(msg);
          console.groupEnd();
          return throwError(new Error(msg));
        }
    }


    okIfReadOnly(req: HttpRequest<any>) {
        /**
         * Put whitelist of readonly routes here
         */
        const whitelist = [/api\/heroes/gi];
        return whitelist.some(wl => wl.test(req.url));
      }
}