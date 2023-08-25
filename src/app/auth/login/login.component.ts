import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from '../model/auth-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../../app.component.css'],
})
export class LoginComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  isLoading: boolean = false;

  loginForm = new FormGroup<any>({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  form(property: string) {
    return this.loginForm.get(property) as FormGroup;
  }

  login(user: AuthRequest) {
    this.isLoading = true;
    this.authService.login(user).subscribe({
      next: (res) => {
        let token = res.data.token;
        sessionStorage.setItem('token', token);
        console.log(token);
        this.router.navigateByUrl('pages');
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
