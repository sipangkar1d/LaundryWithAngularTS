import {Paging} from "./paging";

export interface ResponseWrapper<T> {
  statusCode?: number;
  message?: string;
  errors?: null;
  data?: T;
  paging?: Paging ;
}
