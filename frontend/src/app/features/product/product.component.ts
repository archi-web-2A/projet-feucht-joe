import {Component, Input} from '@angular/core';
import {Product} from "../../shared/models/product";
import {Store} from "@ngxs/store";
import {AddProduct} from "../../shared/actions/product-action";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private store: Store){}

  addProduct() {
    this.store.dispatch(new AddProduct(this.product))
  }
}
