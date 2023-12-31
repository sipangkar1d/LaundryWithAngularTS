import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {CustomerComponent} from './customer/customer.component';
import {CategoryComponent} from './category/category.component';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReportComponent} from './report/report.component';
import {StaffComponent} from './staff/staff.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductComponent} from './product/product.component';
import {LandingComponent} from './landing/landing.component';
import {LoadingComponent} from "../shared/component/loading/loading.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {SearchComponent} from "../shared/component/search/search.component";

@NgModule({
  declarations: [
    CustomerComponent,
    CategoryComponent,
    PagesComponent,
    DashboardComponent,
    ReportComponent,
    StaffComponent,
    ProductComponent,
    LandingComponent,
    LoadingComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
})
export class PagesModule {
}
