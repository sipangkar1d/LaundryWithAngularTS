import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { StafComponent } from './staf/staf.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    StafComponent,
    CustomerComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
