import {Component} from '@angular/core';
import {TransactionResponse} from "./model/transaction-response";
import {Paging} from "../../shared/model/paging";
import {ReportService} from "./service/report.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', './../../app.component.css']
})
export class ReportComponent {
  transactionResponses: TransactionResponse[] = []
  transactionResponse: TransactionResponse | undefined
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
    this.getAllFinishTransaction()
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
    this.getAllFinishTransaction()
  }

  sizeHandle(size: number) {
    this.paging!.size = size
    this.initialPaging = [1, 2, 3]
    this.currentPage = 1
    this.getAllFinishTransaction()
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
    this.getAllFinishTransaction()
  }

  constructor(private readonly service: ReportService) {
  }

  ngOnInit() {
    this.getAllFinishTransaction()
  }

  getAllFinishTransaction() {
    this.isLoading = true
    this.service.getListTransaction(
      this.keyword,
      this.paging.size,
      this.paging.page
    ).subscribe({
      next: (res) => {
        if (!res.errors) {
          this.transactionResponses = res.data
          this.paging = res.paging
          this.isLoading = false
        } else {
          this.isLoading = false
          Swal.fire(
            `${res.errors}`
          )
        }
      }
    })
  }

  exportToPdf() {
    this.isLoading = true
    this.service.exportToPdf(
      this.paging.size,
    ).subscribe({
      next: (res) => {
        const blob = new Blob([res.body as Blob], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transaction.pdf';
        a.click();
        URL.revokeObjectURL(url);
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
        Swal.fire(
          `${err}`
        )
      }
    })
  }

  getDetail(id: string) {
    this.service.findTransactionById(id).subscribe({
      next: (res) => {

      }
    })
  }
}
