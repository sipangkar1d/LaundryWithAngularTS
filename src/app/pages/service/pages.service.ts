import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ResponseWrapper} from "../../shared/model/response-wrapper";

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private readonly http: HttpClient,
              private readonly route: ActivatedRoute) { }

  getByAuthentication(){
    return this.http.get<ResponseWrapper<string>>("api/auth/me")
  }

}
