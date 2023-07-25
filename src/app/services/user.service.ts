import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { IUser, IUserDetails } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl = 'https://reqres.in/api'

  usersCache: IUser | undefined

  constructor(private http: HttpClient ) { }

  getUsers(payload: any): Observable<IUser> {
    // if (this.usersCache && payload.pageNumber === payload.previousPageIndex) {
    //   return of(this.usersCache);    // Here i Apply Cashing
    // }
    
    return this.http.get<IUser>(`${this.baseUrl}/users?page=${payload.pageNumber}`).pipe(
      map(users => {
        this.usersCache = users;    // Here i Apply Cashing
        return users;
      }),)
  }

  getUserByID(userId: number): Observable<IUserDetails> {
    return this.http.get<IUserDetails>(`${this.baseUrl}/users/${userId}`)
  }
}
