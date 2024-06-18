import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Card} from "../../../models/card";
import {CardService} from "../../../../core/services/card.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];

  cardForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    creditCardNumber: [null, Validators.required],
    ccvNumber: [null, Validators.required],
    expirationYear: [null, Validators.required],
    expirationMonth: [null, Validators.required]
  })
  constructor(private fb: FormBuilder, private cardService: CardService) {
  }

  ngOnInit(): void {
    this.cards = this.cardService.getCards();
  }

  createCard(): void {
    if (this.cardForm.valid) {
      const card: Card = {
        name: this.cardForm.value.name!,
        creditCardNumber: this.cardForm.value.creditCardNumber!,
        ccvNumber: this.cardForm.value.ccvNumber!,
        expirationYear: this.cardForm.value.expirationYear!,
        expirationMonth: this.cardForm.value.expirationMonth!
      };
      this.cardService.createCard(card);
      this.cards = this.cardService.getCards();
      this.cardForm.reset();
    }
  }

  deleteCard(creditCardNumber: number): void {
    this.cardService.deleteCard(creditCardNumber);
    this.cards = this.cardService.getCards();
  }
}
