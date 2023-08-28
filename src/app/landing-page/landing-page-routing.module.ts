import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./landing-page.component";
import {HomeComponent} from "./home/home.component";
import {ServiceComponent} from "./service/service.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {TeamComponent} from "./team/team.component";

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: "full",
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'service',
                component: ServiceComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'team',
                component: TeamComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingPageRoutingModule {
}
