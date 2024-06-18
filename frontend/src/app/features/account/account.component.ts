import { Component } from '@angular/core';
import {
  MinMaxProductValuesComponent
} from "../../shared/components/min-max-product-values/min-max-product-values.component";
import {MultiRangeSliderComponent} from "../../shared/components/multi-range-slider/multi-range-slider.component";
import {
  ProductSearchBarCatalogueComponent
} from "../product/product-search-bar-catalogue/product-search-bar-catalogue.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MinMaxProductValuesComponent,
    MultiRangeSliderComponent,
    ProductSearchBarCatalogueComponent,
    ReactiveFormsModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
