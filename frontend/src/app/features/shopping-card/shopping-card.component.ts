import { Component } from '@angular/core';
import {ProductShoppingCardComponent} from "./product-shopping-card/product-shopping-card.component";
import {Select, Store} from "@ngxs/store";
import {ProductsState} from "../../shared/states/products-state";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Product} from "../../shared/models/product";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [
    ProductShoppingCardComponent,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent {
  @Select(ProductsState.getShoppingProductsLength) shoppingProductsLength$!: Observable<number>;
  @Select(ProductsState.getShoppingProductsTotalPrice) shoppingProductsTotalPrice$!: Observable<number>;
  @Select(ProductsState.getShoppingProducts) shoppingProducts$!: Observable<Product[]>;
}
