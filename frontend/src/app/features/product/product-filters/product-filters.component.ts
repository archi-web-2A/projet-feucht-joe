import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MinMaxProductValuesComponent} from "../../../shared/components/min-max-product-values/min-max-product-values.component";
import {MultiRangeSliderComponent} from "../../../shared/components/multi-range-slider/multi-range-slider.component";
import {
  ProductSearchBarCatalogueComponent
} from "../product-search-bar-catalogue/product-search-bar-catalogue.component";
import {combineLatest, map, Observable, startWith} from "rxjs";
import {Product} from "../../../shared/models/product";
import {ProductService} from "../../../core/services/product.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [
    MinMaxProductValuesComponent,
    MultiRangeSliderComponent,
    ProductSearchBarCatalogueComponent,
    ReactiveFormsModule
  ],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.css'
})
export class ProductFiltersComponent implements OnInit {

  @Output() products$ = new EventEmitter<Observable<Product[]>>();

  filters = this.fb.nonNullable.group({
    name: [''],
    brand: [''],
    motorbikeType: [''],
    color: [''],
    minKilometers: null,
    maxKilometers: null,
    minPrice: null,
    maxPrice: null,
    minCubicCentimetre: null,
    maxCubicCentimetre: null,
    minBuildProductionYear: null,
    maxBuildProductionYear: null,
    licenseTypeA2: true,
    licenseTypeA: true
  })

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.products$.emit(this.getProfiles());
  }

  getProfiles(): Observable<Product[]> {
    const products$ = this.productService.getProducts();
    const search$ = combineLatest([
      this.filters.controls.name.valueChanges.pipe(startWith('')),
      this.filters.controls.brand.valueChanges.pipe(startWith('')),
      this.filters.controls.motorbikeType.valueChanges.pipe(startWith('')),
      this.filters.controls.color.valueChanges.pipe(startWith('')),
      this.filters.controls.minKilometers.valueChanges.pipe(startWith(0)),
      this.filters.controls.maxKilometers.valueChanges.pipe(startWith(200000)),
      this.filters.controls.minPrice.valueChanges.pipe(startWith(0)),
      this.filters.controls.maxPrice.valueChanges.pipe(startWith(200000)),
      this.filters.controls.minCubicCentimetre.valueChanges.pipe(startWith(0)),
      this.filters.controls.maxCubicCentimetre.valueChanges.pipe(startWith(200000)),
      this.filters.controls.minBuildProductionYear.valueChanges.pipe(startWith(0)),
      this.filters.controls.maxBuildProductionYear.valueChanges.pipe(startWith(200000)),
      this.filters.controls.licenseTypeA2.valueChanges.pipe(startWith(true)),
      this.filters.controls.licenseTypeA.valueChanges.pipe(startWith(true)),
    ])

    return combineLatest([products$, search$])
      .pipe(
        map(([products, [name, brand, motorbikeType, color, minKilometers, maxKilometers, minPrice, maxPrice, minCubicCentimetre, maxCubicCentimetre, minBuildProductionYear, maxBuildProductionYear, licenseTypeA2, licenseTypeA]]) => products.filter(product => {
          const isNameMatching = product.name.toLowerCase().includes(name.toLowerCase())
          const isBrandMatching = product.brand.toLowerCase().includes(brand.toLowerCase())
          const isMotorbikeTypeMatching = product.motorbikeType.toLowerCase().includes(motorbikeType.toLowerCase())
          const isColorMatching = product.color.toLowerCase().includes(color.toLowerCase())
          const isMinKilometersMatching = (!minKilometers || product.kilometers >= minKilometers)
          const isMaxKilometersMatching = (!maxKilometers || product.kilometers <= maxKilometers)
          const isMinPriceMatching = (!minPrice || product.price >= minPrice)
          const isMaxPriceMatching =  (!maxPrice || product.price <= maxPrice)
          const isMinCubicCentimetreMatching = (!minCubicCentimetre || product.cubicCentimetre >= minCubicCentimetre)
          const isMaxCubicCentimetreMatching = (!maxCubicCentimetre || product.cubicCentimetre <= maxCubicCentimetre)
          const isMinBuildProductionYearMatching =  (!minBuildProductionYear || product.buildProductionYear >= minBuildProductionYear)
          const isMaxBuildProductionYearMatching = (!maxBuildProductionYear || product.buildProductionYear <= maxBuildProductionYear)
          const isLicenseTypeA2Matching = licenseTypeA2 ? product.licenceType === 'A2' : false;
          const isLicenseTypeAMatching = licenseTypeA ? product.licenceType === 'A' : false;

          return isNameMatching && isBrandMatching && isMotorbikeTypeMatching && isColorMatching && isMinKilometersMatching &&
            isMaxKilometersMatching && isMinPriceMatching && isMaxPriceMatching && isMinCubicCentimetreMatching && isMaxCubicCentimetreMatching
            && isMinBuildProductionYearMatching && isMaxBuildProductionYearMatching && (isLicenseTypeA2Matching || isLicenseTypeAMatching);
        }))
      )
  }
}
