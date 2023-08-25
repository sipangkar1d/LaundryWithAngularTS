import {Paging} from "./paging";

export interface ResponseWrapper<T> {
  errors?: null;
  data?: T;
  paging?: Paging ;
}
