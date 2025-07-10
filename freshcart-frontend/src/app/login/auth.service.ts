import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  private tokenKey = 'freshcart_jwt';
  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  /**
   * Login and store JWT on success
   */
  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, { responseType: 'text' }).pipe(
      tap(token => {
        this.setToken(token);
        this.loggedIn$.next(true);
      })
    );
  }

  /**
   * Register a new user
   */
  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  /**
   * Logout and clear JWT
   */
  logout(): void {
    this.clearToken();
    this.loggedIn$.next(false);
  }

  /**
   * Observable for login state
   */
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  /**
   * Get JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Store JWT token
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Remove JWT token
   */
  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Check if JWT token exists
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
} 