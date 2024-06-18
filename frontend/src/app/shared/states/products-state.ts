import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ProductStateModel} from "./product-state-model";
import {Injectable} from "@angular/core";
import {AddProduct, DelProduct} from "../actions/product-action";
import {Product} from "../models/product";

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})

@Injectable()
export class ProductsState {
  @Selector()
  static getShoppingProductsLength(state: ProductStateModel) : number {
    return state.products.length;
  }

  @Selector()
  static getShoppingProductsTotalPrice(state: ProductStateModel) : number {
    return state.products.reduce((totalPrice, product) => totalPrice + product.price, 0);
  }

  @Selector()
  static getShoppingProducts(state: ProductStateModel) : Product[] {
    return state.products;
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      products: [...state.products, payload],
    });
  }

  @Action(DelProduct)
  del(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: DelProduct
  ) {
    const state = getState();
    patchState({
      products: state.products.filter(
        (x) => !(payload.name == x.name && payload.kilometers == x.kilometers && payload.buildProductionYear === x.buildProductionYear)
      ),
    });
  }
}
