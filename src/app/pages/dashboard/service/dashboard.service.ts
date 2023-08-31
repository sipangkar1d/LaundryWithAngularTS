import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResponseWrapper} from "../../../shared/model/response-wrapper";
import {DashboardResponse} from "../model/dashboard-response";
import {TransactionResponse} from "../../report/model/transaction-response";
import {TransactionRequest} from "../../report/model/transaction-request";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private readonly http: HttpClient) {
  }

  getCustomerRevenueAndActivity() {
    return this.http.get<ResponseWrapper<DashboardResponse>>("api/dashboard")
  }

  getListTransaction(keyword: string | null = null, size: number = 5, page: number = 0) {
    const params = new HttpParams()
      .set("size", size)
      .set("page", page)

    if (keyword) {
      params.set("keyword", keyword)
    }
    return this.http.get<ResponseWrapper<TransactionResponse[]>>("api/transactions/active", {params})
  }

  setPaid(id: string) {
    return this.http.get<ResponseWrapper<any>>(`api/transactions/set-paid/${id}`)
  }

  updateStatus(id: string) {
    return this.http.get<ResponseWrapper<any>>(`api/transactions/update-status/${id}`)
  }

  getTransactionById(id: string) {
    return this.http.get<ResponseWrapper<TransactionResponse>>(`api/transactions/${id}`)
  }

  createTransaction(transaction: TransactionRequest) {
    return this.http.post<ResponseWrapper<TransactionResponse>>("api/transactions", transaction)
  }
}
