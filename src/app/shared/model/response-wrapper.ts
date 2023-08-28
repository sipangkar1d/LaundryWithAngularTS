import {Paging} from "./paging";

export interface ResponseWrapper<T> {
  statusCode?: number;
  messege?: string;
  errors?: null;
  data?: T;
  paging?: Paging ;
}
