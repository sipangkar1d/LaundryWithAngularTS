import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { AuthResponseWrapper } from '../model/auth-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public login (data : any) : Observable<any> {
    return this.http.post<AuthResponseWrapper>('/api/auth/login', data)
  }


  public register (data : any) : Observable<any> {
    return this.http.post<AuthResponseWrapper>('/api/auth/register', data)
  }
}
