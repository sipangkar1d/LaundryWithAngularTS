import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {AuthRequest} from "../model/auth-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','./../../app.component.css']
})
export class RegisterComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  registerForm : FormGroup = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })

  onRegister(data: AuthRequest) {
    console.log("Register Request : ", data)
    this.authService.register(data).subscribe({
      next : (res) => {
        console.log("Response : ", res)
        let token = res.data.token
        if (token) {
          sessionStorage.setItem('token', token)
          this.router.navigateByUrl('/auth/login')
          Swal.fire('Registration Successful', 'You can now log in with your new account.', 'success');
        }
      },
      error : (err) => {
        console.log("Error : ", err)
        Swal.fire('Registration Failed', 'There was an error during registration. Please try again later.', 'error');
      }
    })
  }


  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
