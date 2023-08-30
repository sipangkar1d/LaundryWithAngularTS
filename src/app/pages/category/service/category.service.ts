import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CategoryModel} from "../model/category.model";
import {ResponseWrapper} from "../../../shared/model/response-wrapper";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) {
  }

  create(category: CategoryModel) {
    return this.http.post<ResponseWrapper<CategoryModel>>("api/categories", category)
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
    return this.http.get<ResponseWrapper<CategoryModel[]>>("api/categories", {params})
  }

  update(category: CategoryModel) {
    return this.http.put<ResponseWrapper<CategoryModel>>("api/categories", category)
  }

  delete(id: string) {
    return this.http.delete<ResponseWrapper<any>>(`api/categories/${id}`)
  }

  findById(id: string) {
    return this.http.get<ResponseWrapper<CategoryModel>>(`api/categories/${id}`)
  }
}
