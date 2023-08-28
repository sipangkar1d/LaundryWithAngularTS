import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoadingComponent} from './shared/component/loading/loading.component';
import {AlertComponent} from './shared/component/alert/alert.component';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {HomeComponent} from "./landing-page/home/home.component";
import {ServiceComponent} from "./landing-page/service/service.component";
import {AboutComponent} from "./landing-page/about/about.component";
import {TeamComponent} from "./landing-page/team/team.component";
import {ContactComponent} from "./landing-page/contact/contact.component";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoadingComponent,
    AlertComponent,
    LandingPageComponent,
    HomeComponent,
    ServiceComponent,
    AboutComponent,
    TeamComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
