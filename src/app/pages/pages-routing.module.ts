import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { ReportComponent } from './report/report.component';
import { StaffComponent } from './staff/staff.component';
import { ProductComponent } from './product/product.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'landing-page',
        component: LandingComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'customer/:id',
        component: CustomerComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'category/:id',
        component: CategoryComponent,
      },
      {
        path: 'staff',
        component: StaffComponent,
      },
      {
        path: 'staff/:id',
        component: StaffComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'product/:id',
        component: ProductComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'report/:id',
        component: ReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
