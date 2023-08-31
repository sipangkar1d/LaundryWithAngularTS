import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Paging} from "../../shared/model/paging";
import Swal from "sweetalert2";
import { ProductModel } from './model/product.model';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  productForm = new FormGroup<any>({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    stock: new FormControl(null, [Validators.required, Validators.min(0)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)])
  })

  form(property: string) {
    return this.productForm.get(property) as FormGroup<any>
  }

  paging: Paging | undefined = {
    page: 0,
    size: 5,
    count: 0,
    totalPages: 0
  }

  products: ProductModel[] = []
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

  constructor(private readonly service: ProductService) {
  }

  ngOnInit() {
    this.getAll()
  }

  create(product: ProductModel) {
    this.isLoading = true
    if (product.id) {
      this.service.update(product).subscribe({
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
      this.service.create(product).subscribe({
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
        this.products = res.data
        this.paging = res.paging
        this.isLoading = false
      }
    })
  }

  delete(id: string) {
    this.isLoading = true
    Swal.fire({
      title: 'Are you sure to delete this product?',
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
        this.productForm.setValue({
          id: res.data.id,
          name: res.data.name,
          stock: res.data.stock,
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
  clearForm(){
    this.productForm.reset()
  }
}
