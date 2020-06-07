import { User } from './users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }


  getUsers(): Observable<User> {
    return this.httpClient.get<User>('http://slowwly.robertomurray.co.uk/delay/5400/url/https://jsonplaceholder.typicode.com/users');
    // return this.httpClient.get<User>('https://httpstat.us/500');
  }

  getUsers1(): Observable<User> {
    return this.httpClient.get<User>('http://slowwly.robertomurray.co.uk/delay/3000/url/https://jsonplaceholder.typicode.com/users');
    // return this.httpClient.get<User>('https://httpstat.us/500');
  }

  getFake(): Observable<User> {
    return this.httpClient.get<any>('http://localhost:4200/consents');
    // return this.httpClient.get<User>('https://httpstat.us/500');
  }

}
