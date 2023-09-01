import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AlertComponent} from './shared/component/alert/alert.component';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {HomeComponent} from "./landing-page/home/home.component";
import {ServiceComponent} from "./landing-page/service/service.component";
import {AboutComponent} from "./landing-page/about/about.component";
import {TeamComponent} from "./landing-page/team/team.component";
import {ContactComponent} from "./landing-page/contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {ConfigInterceptor} from "./shared/interceptor/config.interceptor";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import { ErrorComponent } from './pages/error/error.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AlertComponent,
    LandingPageComponent,
    HomeComponent,
    ServiceComponent,
    AboutComponent,
    TeamComponent,
    ContactComponent,
    LoginComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    NgSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ConfigInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {
}
