import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogInterceptor } from './log.interceptor';
import { ReadOnlyInterceptor } from './read-only.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { BusyInterceptor } from './busy.interceptor';
import { BackendInterceptor } from './backend.interceptor';

 


 export const interceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ReadOnlyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
 ]