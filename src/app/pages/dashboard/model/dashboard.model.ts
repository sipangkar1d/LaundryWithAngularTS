import {Paging} from "../../../shared/model/paging";

export interface DashboardResponse {
  customerTotal: number;
  revenueTotal: number;
  activities: any[];
  transactionResponses: any[];
  paging: Paging;
}

