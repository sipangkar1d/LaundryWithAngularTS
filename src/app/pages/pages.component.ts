import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PagesService} from "./service/pages.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  constructor(private readonly router: Router,
              private readonly service: PagesService) {
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
      "url": 'report',
      "name": "Report"
    },
    {
      "url": 'staff',
      "name": "Staff"
    },
  ]
  role: string | undefined
  isToggleOn: boolean = true

  toggleHandler() {
    this.isToggleOn = !this.isToggleOn
  }

  ngOnInit() {
    this.service.getByAuthentication().subscribe({
      next: (res) => {
        this.role = res.data
      }
    })

    // if (this.role = )
  }

  ngAfterContentChecked() {
    this.currentPage = this.router.url.slice(7)
  }

  logOutHandler() {
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
