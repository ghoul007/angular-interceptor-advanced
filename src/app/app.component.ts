import { BusyService } from './busy.service';
import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { Observable, interval, asapScheduler, forkJoin } from 'rxjs';
import { User } from './users';
import { delay, observeOn, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';
  users$: any;
  loader$: Observable<boolean>;
  loader: any;
  users: User;
  state$: Observable<{}>;

  constructor(private usersService: UsersService, private busyService: BusyService) { }
  ngOnInit() {
    this.state$ = this.busyService.busyState$.pipe(
      observeOn(asapScheduler) // Ensure is async; remove and look in console
    );
    // this.users$ = this.usersService.getUsers();
    //  this.usersService.getUsers().subscribe();
    //  this.usersService.getUsers().subscribe();
    //  this.usersService.getUsers1().subscribe();
    // debugger;
    forkJoin(
      this.usersService.getUsers(),
      this.usersService.getUsers1(),
      this.usersService.getFake()
    ).subscribe(([users, u, fake]) => { 
      console.log([users, u, fake]);
      this.users = users })
  }


}
