import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import { ProductSearchBarHeaderComponent } from "./product-search-bar-header/product-search-bar-header.component";
import {ProductsState} from "../../../shared/states/products-state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ProductSearchBarHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  isSignForms= false;
  isCards = false;
  isSignupValidation = false;
  isAccount = false;
  isShoppingCard = false;

  constructor(private router: Router) {
    this.checkRoutes();
  }

  @Select(ProductsState.getShoppingProductsLength) shoppingProductsLength$!: Observable<number>;

  onClickHamburgerButton() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkRoutes() {
    this.router.events.subscribe((event) => {
      this.isMenuOpen = false;
      if (event instanceof NavigationEnd) {
        this.isShoppingCard = event.url === '/shopping-card';
        this.isSignForms = event.url === '/sign-forms';
        this.isCards = event.url === '/cards';
        this.isSignupValidation = event.url === '/signup-validation';
        this.isAccount = event.url === '/account';
      }
    });
  }


}
