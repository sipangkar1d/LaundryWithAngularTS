import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {httpGuardGuard} from "./shared/Http-guard/http-guard.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: 'landing-page',
    loadChildren: () =>
      import('src/app/landing-page/landing-page.module').then((module) => module.LandingPageModule),
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
    canActivate: [httpGuardGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
