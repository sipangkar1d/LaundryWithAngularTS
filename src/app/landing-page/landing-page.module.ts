import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import {LandingPageComponent} from "./landing-page.component";
import {HomeComponent} from "./home/home.component";
import {ServiceComponent} from "./service/service.component";
import {AboutComponent} from "./about/about.component";
import {TeamComponent} from "./team/team.component";
import {ContactComponent} from "./contact/contact.component";


@NgModule({
  declarations: [
    LandingPageComponent,
    HomeComponent,
    ServiceComponent,
    AboutComponent,
    TeamComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
