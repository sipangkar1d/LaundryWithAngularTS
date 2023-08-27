import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { HomeComponent } from '../landing-page/home/home.component';
import { ServiceComponent } from '../landing-page/service/service.component';
import { AboutComponent } from '../landing-page/about/about.component';
import { TeamComponent } from '../landing-page/team/team.component';
import { ContactComponent } from '../landing-page/contact/contact.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class AuthModule { }
