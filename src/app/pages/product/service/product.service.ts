import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

import {ResponseWrapper} from "../../../shared/model/response-wrapper";
import { ProductModel } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  create(product: ProductModel) {
    return this.http.post<ResponseWrapper<ProductModel>>("api/products", product)
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
    return this.http.get<ResponseWrapper<ProductModel[]>>("api/products", {params})
  }

  update(product: ProductModel) {
    return this.http.put<ResponseWrapper<ProductModel>>("api/products", product)
  }

  delete(id: string) {
    return this.http.delete<ResponseWrapper<any>>(`api/products/${id}`)
  }

  findById(id: string) {
    return this.http.get<ResponseWrapper<ProductModel>>(`api/products/${id}`)
  }
}
