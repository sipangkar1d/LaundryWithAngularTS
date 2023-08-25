import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../model/auth-request';
import { ResponseWrapper } from 'src/app/shared/model/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) {
  }

  // register(request: AuthRequest) {
  //   return this.http.post<ResponseWrapper<any>>("api/auth/register-admin", request)
  // }

  login(request: AuthRequest) {
    return this.http.post<ResponseWrapper<any>>("api/auth/login", request)
  }
}
