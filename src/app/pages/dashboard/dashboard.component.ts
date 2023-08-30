import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from "./service/dashboard.service";
import {DashboardResponse} from "./model/dashboard.model";
import {Paging} from "../../shared/model/paging";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private readonly router: Router,
    private readonly service: DashboardService,
  ) {
  }

  response: DashboardResponse = {
    revenueTotal: 0,
    customerTotal: 0,
    activities: [],
    transactionResponses: [],
    paging: {
      page: 0,
      count: 0,
      totalPages: 0,
      size: 5
    }
  }

  ngOnInit(): void {
    this.service.get(this.response.paging.page, this.response.paging.size).subscribe({
      next: (res) => {
        this.response = res.data
        console.log(this.response)
      },
      error: err => {
      }
    })
  }
}
