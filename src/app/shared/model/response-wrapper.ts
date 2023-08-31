import {Paging} from "./paging";

export interface ResponseWrapper<T> {
  statusCode: number;
  message: string;
  errors: any;
  data: T;
  paging: Paging;
}
