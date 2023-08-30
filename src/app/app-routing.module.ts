import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {LoginComponent} from "./login/login.component";
import {ConfigInterceptor} from "./shared/interceptor/config.interceptor";
import {httpGuardGuard} from "./shared/Http-guard/http-guard.guard";
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('src/app/pages/pages.module').then((module) => module.PagesModule),
    canActivate: [httpGuardGuard]
  },
  {
    path: '**',
    redirectTo: "notfound404",
    pathMatch: "full"
  
  },
  {
    path: "notfound404",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
