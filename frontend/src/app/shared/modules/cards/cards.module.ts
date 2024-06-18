import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from "./cards/cards.component";
import { CardService } from "../../../core/services/card.service";
import {ProductFiltersComponent} from "../../../features/product/product-filters/product-filters.component";
import { ReactiveFormsModule } from '@angular/forms';
import {CardComponent} from "./card/card.component";
import {CustomInputComponent} from "../../components/custom-input/custom-input.component";


@NgModule({
  declarations: [CardsComponent, CardComponent],
  imports: [
    CommonModule,
    ProductFiltersComponent,
    ReactiveFormsModule,
    CustomInputComponent
  ],
  providers: [CardService],
  exports: []
})
export class CardsModule { }
