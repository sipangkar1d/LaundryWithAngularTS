import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css','./../app.component.css']
})
export class PagesComponent {

  constructor(private readonly router: Router) {
  }

  currentPage: string | undefined

  sidebar = [
    {
      "url": 'dashboard',
      "name": "Dashboard",
    },
    {
      "url": 'customer',
      "name": "Customer"
    },
    {
      "url": 'category',
      "name": "Category"
    },
    {
      "url": 'product',
      "name": "Product"
    },
    {
      "url": 'staff',
      "name": "Staff"
    },
    {
      "url": 'report',
      "name": "Report"
    },
  ]

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.currentPage = this.router.url.slice(7)
  }

  logOutHandler(){
    sessionStorage.clear()
    this.router.navigateByUrl('/auth')
  }

}
