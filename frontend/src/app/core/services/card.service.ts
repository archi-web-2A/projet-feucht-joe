import { Injectable } from '@angular/core';
import { Card } from "../../shared/models/card";

@Injectable()
export class CardService {
  private cards: Card[] = [];

  createCard(newCard: Card): void {
    this.cards.push(newCard);
  }

  getCards(): Card[] {
    return this.cards;
  }

  getCardById(creditCardNumber: number): Card | undefined {
    return this.cards.find(card => card.creditCardNumber === creditCardNumber);
  }

  updateCard(updatedCard: Card): void {
    const index = this.cards.findIndex(card => card.creditCardNumber === updatedCard.creditCardNumber);
    if (index !== -1) {
      this.cards[index] = updatedCard;
    }
  }

  deleteCard(creditCardNumber: number): void {
    const index = this.cards.findIndex(card => card.creditCardNumber === creditCardNumber);
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }
}
