import {Component} from '@angular/core';
import {ProductsCatalogueComponent} from "../product/products-catalogue/products-catalogue.component";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    ProductsCatalogueComponent,
    RouterLink,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  scrollToCatalogue() {
    const element = document.getElementById('productsCatalogue');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
}
