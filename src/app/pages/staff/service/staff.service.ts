import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResponseWrapper} from "../../../shared/model/response-wrapper";
import { StaffModel } from '../model/staff.model';
import { StaffRequest } from '../model/staff-register-request.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private readonly http: HttpClient) { }

  create(staff: StaffRequest) {
    return this.http.post<ResponseWrapper<StaffModel>>("api/auth/register", staff)
  }

  getAll(keyword: string | undefined, page: number = 0, size: number = 5, sortBy: string = "name", direction: string = "asc") {
    const params = new HttpParams()
      .set("page", page)
      .set("size", size)
      .set("sort-by", sortBy)
      .set("direction", direction)
    if (keyword) {
      params.set("keyword", keyword)
    }
    return this.http.get<ResponseWrapper<StaffModel[]>>("api/staff", {params})
  }

  delete(id: string) {
    return this.http.delete<ResponseWrapper<any>>(`api/staff/${id}`)
  }

  findById(id: string) {
    return this.http.get<ResponseWrapper<StaffModel>>(`api/staff/${id}`)
  }
}
