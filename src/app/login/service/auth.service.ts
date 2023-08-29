import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthResponse} from '../model/auth-response';
import {AuthRequest} from "../model/auth-request";
import {ResponseWrapper} from "../../shared/model/response-wrapper";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) {
  }

  public login(data: AuthRequest): Observable<ResponseWrapper<AuthResponse>> {
    return this.http.post<ResponseWrapper<AuthResponse>>('/api/auth/login', data)
  }
}
