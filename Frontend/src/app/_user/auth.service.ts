import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface IUser {
  email: string;
  password: string;
}

export interface ICurrentUser {
  email: string;
  token: string;
}

const BASE_URL = 'https://localhost:44301/api/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSource = new BehaviorSubject<ICurrentUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.autoLogin(); // Load from localStorage on startup
  }

  private handleAuth(user: ICurrentUser) {
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  }
   setUser(users: ICurrentUser) {
    this.currentUserSource.next(users);
  }

  getUser(): ICurrentUser | null {
    return this.currentUserSource.value;
  }

  register(user: IUser): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(`${BASE_URL}/register`, user).pipe(
      tap(res => this.handleAuth(res)),
      catchError(err => {
        console.error('Registration failed:', err);
        return throwError(() => 'Registration failed');
      })
    );
  }

  // login(credentials: IUser): Observable<ICurrentUser> {
  //   return this.http.post<ICurrentUser>(${BASE_URL}/login, credentials).pipe(
  //     tap(res => this.handleAuth(res)),
  //     catchError(err => {
  //       console.error('Login failed:', err);
  //       return throwError(() => 'Invalid credentials');
  //     })
  //   );
  // }

  autoLogin() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: ICurrentUser = JSON.parse(userJson);
      this.currentUserSource.next(user);
    }
  }

  private isLoggedInSource = new BehaviorSubject<boolean>(this.hasToken());
    isLoggedIn$ = this.isLoggedInSource.asObservable();

    private hasToken(): boolean {
      return !!localStorage.getItem('token');
    }

  login(credentials: IUser): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(`${BASE_URL}/login`, credentials).pipe(
      tap(res => {
        this.handleAuth(res);
        this.isLoggedInSource.next(true);  // <== UPDATE here
      }),
      catchError(err => throwError(() => err.error.message || 'Login failed'))
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.isLoggedInSource.next(false);  // <== UPDATE here
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
