import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  MinMaxProductValuesComponent
} from "../../shared/components/min-max-product-values/min-max-product-values.component";
import {MultiRangeSliderComponent} from "../../shared/components/multi-range-slider/multi-range-slider.component";
import {
  ProductSearchBarCatalogueComponent
} from "../product/product-search-bar-catalogue/product-search-bar-catalogue.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {
  CustomDisabledInputComponent
} from "../../shared/components/custom-disabled-input/custom-disabled-input.component";
import {Subscription} from "rxjs";
import {User} from "../../shared/models/user";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MinMaxProductValuesComponent,
    MultiRangeSliderComponent,
    ProductSearchBarCatalogueComponent,
    ReactiveFormsModule,
    CustomDisabledInputComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy {
  user!: User;
  userSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userSubscription = this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
