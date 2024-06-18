import {Component, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-search-bar-catalogue',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-search-bar-catalogue.component.html',
  styleUrl: './product-search-bar-catalogue.component.css'
})
export class ProductSearchBarCatalogueComponent {
  @Input() placeholder: string
  @Input() inputIcon: string
  @Input() control!: FormControl;

  constructor() {
    this.placeholder = ''
    this.inputIcon = ''
  }
}
