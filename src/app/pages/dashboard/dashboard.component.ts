import {Component} from '@angular/core';
import {DashboardService} from "./service/dashboard.service";
import {DashboardResponse} from "./model/dashboard.model";
import {Paging} from "../../shared/model/paging";
import {TransactionResponse} from "../report/model/transaction-response";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private readonly service: DashboardService,
  ) {
  }

  dashboardResponse: DashboardResponse = {
    revenueTotal: 0,
    customerTotal: 0,
    activities: []
  }

  transactionResponse: TransactionResponse[] = []
  paging: Paging = {
    page: 0,
    size: 5,
    totalPages: 0,
    count: 0
  }
  currentPage = 1
  initialPaging: number[] = [1, 2, 3]
  isLoading = false
  keyword: string = ""

  paginationHandle(page: number) {
    this.paging!.page = page - 1
    this.currentPage = page
    this.getViewDashboard()
  }

  movePagingLeft() {
    this.initialPaging = this.initialPaging.map(number => number - 3);
    this.currentPage -= 3;
    if (this.initialPaging[0] <= 1 || this.currentPage <= 1) {
      this.initialPaging = [1, 2, 3]
    }
    if (this.currentPage <= 1) {
      this.currentPage = 1
    }
    this.getViewDashboard()
  }

  sizeHandle(size: number) {
    this.paging!.size = size
    this.initialPaging = [1, 2, 3]
    this.currentPage = 1
    this.getViewDashboard()
  }

  movePagingRight() {
    this.initialPaging = this.initialPaging.map(number => number + 3);
    this.currentPage += 3;
    if (this.initialPaging[2] >= this.paging!.totalPages) {
      this.initialPaging = [this.paging!.totalPages - 2, this.paging!.totalPages - 1, this.paging!.totalPages]
    }
    if (this.currentPage >= this.paging!.totalPages) {
      this.currentPage = this.paging!.totalPages
    }
    this.getViewDashboard()
  }

  ngOnInit(): void {
    this.getViewDashboard()
  }

  getViewDashboard() {
    this.isLoading = true
    this.service.getCustomerRevenueAndActivity().subscribe({
      next: (res) => {
        this.dashboardResponse = res.data
        this.service.getListTransaction(this.keyword, this.paging.size, this.paging.page).subscribe({
          next: (transactionRes) => {
            this.transactionResponse = transactionRes.data
            this.paging = transactionRes.paging
            this.isLoading = false
          },
          error: (err) => {
            this.isLoading = false
            Swal.fire(
              "Something went wrong",
            )
          }
        })
      },
      error: (err) => {
        this.isLoading = false
        Swal.fire(
          `${err.errors}`,
        )
      }
    })
  }

  getById(id: string) {
    this.isLoading = true

  }

  setIsPaid(id: string) {
    Swal.fire({
      title: 'Set this laundry paid',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Set Paid'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.setPaid(id).subscribe({
          next: (res) => {
            if (!res.errors) {
              Swal.fire({
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1000
              }).then(value => {
                this.isLoading = false
                this.getViewDashboard()
              })
            } else {
              console.log(res)
              Swal.fire(
                `${res.errors}`,
              ).then(value => {
                this.isLoading = false
              })
            }
          }
        })
      } else {
        this.isLoading = false
      }
    })
  }

  updateStatus(id: string) {
    Swal.fire({
      title: 'Update Status',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Update Status'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.updateStatus(id).subscribe({
          next: (res) => {
            if (!res.errors) {
              Swal.fire({
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1000
              }).then(value => {
                this.isLoading = false
                this.getViewDashboard()
              })
            } else {
              Swal.fire(
                `${res.errors}`,
              ).then(value => {
                this.isLoading = false
              })
            }
          }
        })
      } else {
        this.isLoading = false
      }
    })
  }

  clearForm() {
    // this.customerForm.reset()
  }
}
