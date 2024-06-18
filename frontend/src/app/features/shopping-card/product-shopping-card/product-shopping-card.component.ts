import {Component, Input} from '@angular/core';
import {Product} from "../../../shared/models/product";
import {Store} from "@ngxs/store";
import {DelProduct} from "../../../shared/actions/product-action";

@Component({
  selector: 'app-product-shopping-card',
  standalone: true,
  imports: [],
  templateUrl: './product-shopping-card.component.html',
  styleUrl: './product-shopping-card.component.css'
})
export class ProductShoppingCardComponent {
  @Input() product!: Product;

  constructor(private store: Store){}

  delProduct() {
    this.store.dispatch(new DelProduct(this.product))
  }
}
