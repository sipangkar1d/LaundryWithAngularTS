import {Component} from '@angular/core';
import './js/main.js';
import './js/bootstrap.min.js';
import './js/ajax-contact.js';
import './js/imagesloaded.pkgd.min.js';
import './js/isotope.pkgd.min.js';
import './js/jquery.easing.min.js';
import './js/jquery.magnific-popup.min.js';
import './js/popper.min.js';
import './js/scrolling-nav.js';
import './js/slick.min.js';
import './js/vendor/modernizr-3.7.1.min.js';
import './js/vendor/jquery-1.12.4.min.js';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css', './css/style.css', './css/bootstrap.min.css', './css/default.css',
    './css/LineIcons.css', './css/magnific-popup.css', './css/slick.css']

})
export class LandingPageComponent {

  constructor(private readonly router: Router) {
  }

  login() {
    console.log("login")
    this.router.navigateByUrl('login').then(value => console.log(value))
  }
}
