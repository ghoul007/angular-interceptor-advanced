import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


export const prefixReq = '[HTTP Interceptor ⤴] -';
export const prefixRes = '[HTTP Interceptor ⤵] -';


@Injectable()
export class LogInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
     this.logRequest(req);
        return next.handle(req).pipe(
            tap(
                event => this.logResponse(event, req, started),
                event => this.logError(event, req, started)
                )
        );
    }



  private logRequest(req: HttpRequest<any>) {
    console.groupCollapsed(`%c ${prefixReq} Log Http Request`, 'color:#87CEFA');
    let headerList: {
      key: string;
      values: string;
    }[] = [];
    req.headers.keys().map(key => {
      headerList.push({ key, values: req.headers.getAll(key).toString() });
    });
    console.log(`${req.method} "${req.urlWithParams}"`);
    console.table(headerList);
    console.groupEnd();
  }


  private logResponse(event: HttpEvent<any>, req: HttpRequest<any>, started: number) {
    if (event instanceof HttpResponse) {
      console.groupCollapsed(`%c ${prefixRes} Log Http Response`,'color:green');
      const elapsed = Date.now() - started;
      console.log(
        `HTTP: Response for ${req.urlWithParams}\nreturned with status ${event.status}\nand took ${elapsed} ms`
      );
      console.groupEnd();
    }
  }
  private logError(event: HttpEvent<any>, req: HttpRequest<any>, started: number) {
    if (event instanceof HttpErrorResponse) {
      console.groupCollapsed(`%c ${prefixRes} Log Http Response Error`,'color:red');
      const elapsed = Date.now() - started;
      console.log(
        `Http Response Error for ${req.urlWithParams}\nreturned with status ${event.status}\nand took ${elapsed} ms`
      );
      console.groupEnd();
    }
  }

}