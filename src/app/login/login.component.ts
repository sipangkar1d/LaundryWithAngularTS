import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from './model/auth-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css'],
})
export class LoginComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  )
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  loginForm : FormGroup = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })

  form(property: string) {
    return this.loginForm.get(property) as FormGroup;
  }

  isLoading: boolean = false;

  onLogin(data: AuthRequest) {
    this.isLoading = true;
    this.authService.login(data).subscribe({
      next : (res) => {
        this.isLoading = false;
        let token = res.data?.token
        if (token) {
          sessionStorage.setItem('token', token)
          this.router.navigateByUrl('/pages')
        }
      },
      error : (err) => {
        this.isLoading = false;
        Swal.fire('Invalid email / password')
      }
    })
  }
}
