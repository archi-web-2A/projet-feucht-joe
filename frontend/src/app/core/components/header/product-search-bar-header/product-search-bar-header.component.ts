import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../../shared/models/product";
import {Observable, Subject, Subscription, catchError, debounceTime, distinctUntilChanged, of, switchMap, tap} from "rxjs";
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-search-bar-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-search-bar-header.component.html',
  styleUrl: './product-search-bar-header.component.css'
})
export class ProductSearchBarHeaderComponent implements OnInit, OnDestroy {
  private searchTerms = new Subject<string>();
  filteredProducts$!: Observable<Product[]>;
  searchSubscription!: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.filteredProducts$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => term
        ? this.productService.searchProducts(term).pipe(
            tap(products => console.log('Products:', products)), // Produits récupérés tout pipou dans la console :)
            catchError(() => of<Product[]>([]))
          )
        : of<Product[]>([])
      )
    );

    this.searchSubscription = this.filteredProducts$.subscribe();
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target ? target.value : '';
    this.searchTerms.next(value);
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
