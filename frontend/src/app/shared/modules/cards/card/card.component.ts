import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from "../../../models/card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card!: Card;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.card.creditCardNumber);
  }
}
