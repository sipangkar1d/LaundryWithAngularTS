import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./../../app.component.css']
})
export class LoginComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
  }

  login() {
    this.router.navigateByUrl('pages')
  }
}
