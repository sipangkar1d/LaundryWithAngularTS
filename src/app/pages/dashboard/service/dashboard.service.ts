import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseWrapper} from "../../../shared/model/response-wrapper";
import {DashboardResponse} from "../model/dashboard.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private readonly http: HttpClient) {
  }

  get(page: number, size: number) {

    return this.http.get<ResponseWrapper<DashboardResponse>>("api/dashboard?page=" + page + "&size=" + size)
  }
}
