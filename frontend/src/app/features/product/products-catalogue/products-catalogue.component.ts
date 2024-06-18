import { Component } from '@angular/core';
import {Product} from "../../../shared/models/product";
import {CommonModule} from "@angular/common";
import {ProductComponent} from "../product.component";
import {ProductFiltersComponent} from "../product-filters/product-filters.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-catalogue',
  standalone: true,
  imports: [CommonModule, ProductComponent, ProductFiltersComponent],
  templateUrl: './products-catalogue.component.html',
  styleUrl: './products-catalogue.component.css'
})
export class ProductsCatalogueComponent {

  filteredProducts$!: Observable<Product[]>

  handleFilteredProducts(filteredProducts: Observable<Product[]>): void {
    this.filteredProducts$ = filteredProducts;
  }
}
