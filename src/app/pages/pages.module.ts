import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { StaffComponent } from './staff/staff.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CategoryComponent,
    PagesComponent,
    DashboardComponent,
    ReportComponent,
    StaffComponent,
    ProductComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, ReactiveFormsModule, FormsModule],
})
export class PagesModule {}
