import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


export interface BusyPayload {
    isBusy: boolean;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class BusyService {
    blockingTaskCount = 0;
    private subject = new ReplaySubject<BusyPayload>();
    //   busyState$ = of({isBusy: false, message: "msg"});
    busyState$ = this.subject.asObservable();


    constructor() { }

    increment(msg: string) {
        this.blockingTaskCount++;
        this.subject.next({ isBusy: true, message: msg })
    }

    decrement() {
        this.blockingTaskCount--;
        if (this.blockingTaskCount <= 0) {
            this.subject.next({ isBusy: false })
        }
    }
}