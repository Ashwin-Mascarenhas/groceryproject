import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.isLoggedIn().subscribe(val => this.isLoggedIn = val);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
