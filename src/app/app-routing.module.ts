import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {LandingPageComponent} from "./landing-page/landing-page.component";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('src/app/pages/pages.module').then((module) => module.PagesModule),
  },
  {
    path: '**',
    redirectTo: "notfound404",
    pathMatch: "full"

  },
  {
    path : "notfound404",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
