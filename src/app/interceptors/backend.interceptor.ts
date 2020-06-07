import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.method === 'GET' && req.url === 'http://localhost:4200/consents') {
            return of(new HttpResponse({
                status: 200, body: [
                    {
                        name: 'Joe Smith',
                        email: 'josmith@gmail.com',
                    },
                    {
                        name: 'David Miller',
                        email: 'davidmiller@gmail.com',
                    },
                    {
                        name: 'Mary Wilson',
                        email: 'marywilson@gmail.com',
                    },
                    {
                        name: 'Patricia Williams',
                        email: 'patriciawilliams@gmail.com',
                    }
                ]
            }));
        }
        return next.handle(req);
    }
}