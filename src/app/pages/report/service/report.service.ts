import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {ResponseWrapper} from "../../../shared/model/response-wrapper";
import {TransactionResponse} from "../model/transaction-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private readonly http: HttpClient) {
  }

  getListTransaction(keyword: string | null = null, size: number = 5, page: number = 0) {
    const params = new HttpParams()
      .set("size", size)
      .set("page", page)

    if (keyword) {
      params.set("keyword", keyword)
    }
    return this.http.get<ResponseWrapper<TransactionResponse[]>>("api/transactions", {params})
  }

  findTransactionById(id: string) {
    return this.http.get<ResponseWrapper<TransactionResponse>>(`api/transactions/${id}`)
  }

  exportToPdf(size: number = 5): Observable<HttpResponse<Blob>> {
    const params = new HttpParams()
      .set("size", size)
    const headers = new HttpHeaders({'Accept': 'application/pdf'});
    return this.http.get("api/transactions/export", {headers, observe: 'response', responseType: 'blob', params});
  }
}
