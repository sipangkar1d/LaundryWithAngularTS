import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CustomerRequestModel} from "../model/customer-request.model";
import {ResponseWrapper} from "../../../shared/model/response-wrapper";
import {CustomerResponseModel} from "../model/customer-response.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly http: HttpClient) {
  }

  create(customer: CustomerRequestModel) {
    return this.http.post<ResponseWrapper<CustomerResponseModel>>("api/customers", customer)
  }

  update(customer: CustomerRequestModel) {
    return this.http.put<ResponseWrapper<CustomerResponseModel>>("api/customers", customer)
  }

  delete(id: string) {
    return this.http.delete<ResponseWrapper<any>>(`api/customers/${id}`)
  }

  getAll(
    keyword: string | null,
    page: number = 0,
    size: number = 5,
    sortBy: string = "name",
    direction: string = "asc") {
    const params = new HttpParams()
      .set("page", page)
      .set("size", size)
      .set("sort-by", sortBy)
      .set("direction", direction)

    if (keyword) {
      params.set("keyword", keyword)
    }

    return this.http.get<ResponseWrapper<CustomerResponseModel[]>>("api/customers", {params})
  }

  getById(id: string) {
    return this.http.get<ResponseWrapper<CustomerResponseModel>>(`api/customers/i/${id}`)
  }

  getByPhone(phone: string) {
    return this.http.get<ResponseWrapper<CustomerResponseModel>>(`api/customers/${phone}`)
  }
}
