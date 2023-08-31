import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Paging } from '../../shared/model/paging';
import Swal from 'sweetalert2';
import { StaffModel } from './model/staff.model';
import { StaffService } from './service/staff.service';
import { StaffRequest } from './model/staff-register-request.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent {
  staffForm = new FormGroup<any>({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[1-9][0-9]*$'),
    ]),
    address: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,  Validators.minLength(8)])
  });

  form(property: string) {
    return this.staffForm.get(property) as FormGroup<any>;
  }

  paging: Paging | undefined = {
    page: 0,
    size: 5,
    count: 0,
    totalPages: 0,
  };

  staffs: StaffModel[] = [];
  currentPage = 1;
  initialPaging: number[] = [1, 2, 3];
  isLoading = false;
  sortBy = 'name';
  direction = true;
  keyword: string | undefined;

  sortByHandle(sortBy: string) {
    this.sortBy = sortBy;
    this.getAll();
  }

  directionHandle() {
    this.direction = !this.direction;
    // this.getAll()
  }

  paginationHandle(page: number) {
    this.paging!.page = page - 1;
    this.currentPage = page;
    this.getAll();
  }

  movePagingLeft() {
    this.initialPaging = this.initialPaging.map((number) => number - 3);
    this.currentPage -= 3;
    if (this.initialPaging[0] <= 1 || this.currentPage <= 1) {
      this.initialPaging = [1, 2, 3];
    }
    if (this.currentPage <= 1) {
      this.currentPage = 1;
    }
    this.getAll();
  }

  sizeHandle(size: number) {
    this.paging!.size = size;
    this.initialPaging = [1, 2, 3];
    this.currentPage = 1;
    this.getAll();
  }

  movePagingRight() {
    this.initialPaging = this.initialPaging.map((number) => number + 3);
    this.currentPage += 3;
    if (this.initialPaging[2] >= this.paging!.totalPages) {
      this.initialPaging = [
        this.paging!.totalPages - 2,
        this.paging!.totalPages - 1,
        this.paging!.totalPages,
      ];
    }
    if (this.currentPage >= this.paging!.totalPages) {
      this.currentPage = this.paging!.totalPages;
    }
    this.getAll();
  }

  constructor(private readonly service: StaffService) {}

  ngOnInit() {``
    this.getAll();
  }

  create(staff: StaffRequest) {
    this.isLoading = true;

    this.service.create(staff).subscribe({
      next: (res) => {
        this.getAll();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1000,
        }).then((value) => {
          this.isLoading = false;
          this.staffForm.setValue({
            email: null,
            password:null,
            name: null,
            phone: null,
            address: null,
          });
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        }).then((value) => (this.isLoading = false));
      },
    });
  }

  getAll() {
    this.isLoading = true;
    this.service
      .getAll(
        this.keyword,
        this.currentPage - 1,
        this.paging?.size,
        this.sortBy,
        this.direction ? 'asc' : 'desc'
      )
      .subscribe({
        next: (res) => {
          this.staffs = res.data;
          this.paging = res.paging;
          this.isLoading = false;
          this.staffForm.setValue({
            email: null,
            password:null,
            name: null,
            phone: null,
            address: null,
          });
        },
      });
  }

  delete(id: string) {
    this.isLoading = true;
    Swal.fire({
      title: 'Are you sure to delete this staff?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe({
          next: (res) => {
            this.getAll();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1000,
            }).then((value) => (this.isLoading = false));
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            }).then((value) => (this.isLoading = false));
          },
        });
      }
    });
  }

  getById(id: string) {
    this.isLoading = true;
    this.service.findById(id).subscribe({
      next: (res) => {
        this.staffForm.setValue({
          name: res.data.name,
          phone: res.data.phone,
          address: res.data.address,
          email: res.data.email,
        });
        this.isLoading = false;
      },
      error: (err) => {
        Swal.fire('something went wrong');
        this.isLoading = false;
      },
    });
  }
}
