import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('jwt', response.token);
          // For demo, create a user object
          const user: User = {
            username: email,
            email: email,
            firstName: 'User',
            lastName: 'Demo',
            role: 'USER'
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return response;
      }));
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user)
      .pipe(map(response => {
        if (response) {
          // Auto-login after registration
          return this.login(user.email, user['password']);
        }
        return response;
      }));
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  updateProfile(user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, user);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, {
      oldPassword,
      newPassword
    });
  }
} 