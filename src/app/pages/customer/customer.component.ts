import {Component} from '@angular/core';
import {CustomerResponseModel} from "./model/customer-response.model";
import {Paging} from "../../shared/model/paging";
import {CustomerService} from "./service/customer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerRequestModel} from "./model/customer-request.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css', './../../app.component.css']
})
export class CustomerComponent {
  customerForm = new FormGroup<any>({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]),
    address: new FormControl(null, [Validators.required])
  })

  form(property: string) {
    return this.customerForm.get(property) as FormGroup<any>
  }

  paging: Paging | undefined = {
    page: 0,
    size: 5,
    count: 0,
    totalPages: 0
  }

  customers: CustomerResponseModel[] = []
  currentPage = 1
  initialPaging: number[] = [1, 2, 3]
  isLoading = false
  sortBy = "name";
  direction = true

  sortByHandle(sortBy: string) {
    this.sortBy = sortBy
    this.getAll()
  }

  directionHandle() {
    this.direction = !this.direction
    this.getAll()
  }


  paginationHandle(page: number) {
    this.paging!.page = page - 1
    this.currentPage = page
    this.getAll()
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
    this.getAll()
  }

  sizeHandle(size: number) {
    this.paging!.size = size
    this.initialPaging = [1, 2, 3]
    this.currentPage = 1
    this.getAll()
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
    this.getAll()
  }

  constructor(private readonly service: CustomerService) {
  }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.isLoading = true
    this.service.getAll(
      null,
      this.currentPage - 1,
      this.paging?.size,
      this.sortBy,
      this.direction ? "asc" : "desc"
    ).subscribe({
      next: (res) => {
        this.customers = res.data
        this.paging = res.paging
        this.isLoading = false
      }
    })
  }

  customerGetById(id: string) {
    this.isLoading = true
    this.service.getById(id).subscribe({
      next: (res) => {
        this.customerForm.setValue({
          id: res.data.id,
          name: res.data.name,
          phone: res.data.phone,
          address: res.data.address
        })
        this.isLoading = false
      }
    })
  }


  create(customer: CustomerRequestModel) {
    this.isLoading = true
    if (customer.id) {
      this.service.update(customer).subscribe({
        next: (res) => {
          this.getAll()
          if (res.data) {
            Swal.fire("Success Update Customer")
          } else {
            Swal.fire(
              "Something went wrong",
            )
          }

        },
        error: err => {
          this.isLoading = false
        }
      })
    } else {
      this.service.create(customer).subscribe({
        next: (res) => {
          this.getAll()
          if (res.data) {
            Swal.fire("Success Create Customer")
          } else {
            Swal.fire(
              "Something went wrong",
            )
          }
        },
        error: err => {
          this.isLoading = false
        }
      })
    }
    this.customerForm.setValue({
      id: null,
      name: null,
      phone: null,
      address: null
    })
  }
}
