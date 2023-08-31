import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Paging} from "../../shared/model/paging";
import {CustomerResponseModel} from "../customer/model/customer-response.model";
import {CategoryModel} from "./model/category.model";
import {HttpClient} from "@angular/common/http";
import {CategoryService} from "./service/category.service";
import Swal from "sweetalert2";
import {CustomerRequestModel} from "../customer/model/customer-request.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css', './../../app.component.css']
})
export class CategoryComponent {
  categoryForm = new FormGroup<any>({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)])
  })

  form(property: string) {
    return this.categoryForm.get(property) as FormGroup<any>
  }

  paging: Paging | undefined = {
    page: 0,
    size: 5,
    count: 0,
    totalPages: 0
  }

  categories: CategoryModel[] = []
  currentPage = 1
  initialPaging: number[] = [1, 2, 3]
  isLoading = false
  sortBy = "name";
  direction = true
  keyword: string | undefined

  sortByHandle(sortBy: string) {
    this.sortBy = sortBy
    this.getAll()
  }

  directionHandle() {
    this.direction = !this.direction
    // this.getAll()
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

  constructor(private readonly service: CategoryService) {
  }

  ngOnInit() {
    this.getAll()
  }

  create(category: CategoryModel) {
    this.isLoading = true
    if (category.id) {
      this.service.update(category).subscribe({
        next: (res) => {
          this.getAll()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          }).then(value => {
            this.isLoading = false

          })
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          }).then(value => this.isLoading = false)
        }
      })

    } else {
      this.service.create(category).subscribe({
        next: (res) => {
          this.getAll()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          }).then(value => {
            this.isLoading = false
            this.clearForm()
          })
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          }).then(value => this.isLoading = false)
        }
      })
    }

  }

  getAll() {
    this.isLoading = true
    this.service.getAll(
      this.keyword,
      this.currentPage - 1,
      this.paging?.size,
      this.sortBy,
      this.direction ? "asc" : "desc"
    ).subscribe({
      next: (res) => {
        this.categories = res.data
        this.paging = res.paging
        this.isLoading = false
      }
    })
  }

  delete(id: string) {
    this.isLoading = true
    Swal.fire({
      title: 'Are you sure to delete this category?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe({
          next: (res) => {
            this.getAll()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1000
            }).then(value => this.isLoading = false)
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            }).then(value => this.isLoading = false)
          }
        })
      }
    });

  }

  getById(id: string) {
    this.isLoading = true
    this.service.findById(id).subscribe({
      next: (res) => {
        this.categoryForm.setValue({
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          price: res.data.price
        })
        this.isLoading = false
      },
      error: (err) => {
        Swal.fire("something went wrong")
        this.isLoading = false
      }
    })
  }

  clearForm() {
    this.categoryForm.reset();
    console.log(this.categoryForm.value)
  }

}
