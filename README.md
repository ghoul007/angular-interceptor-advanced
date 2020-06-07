# Angular Interceptors

With interception, you declare interceptors that inspect and transform HTTP requests from your application to a server. The same interceptors can also inspect and transform a server's responses on their way back to the application. Multiple interceptors form a forward-and-backward chain of request/response handlers.

Interceptors can perform a variety of implicit tasks, from authentication to logging, in a routine, standard way, for every HTTP request/response


 
[see more]( https://angular.io/guide/http#http-interceptors)

Multiple interceptors form a forward-and-backward chain of request/response handlers.

```
 export const interceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ReadOnlyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
 ]
```

