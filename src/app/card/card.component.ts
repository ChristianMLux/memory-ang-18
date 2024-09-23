import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Card } from '../game.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input({ required: true }) card!: Card;
  @Output() cardClick = new EventEmitter<void>();

  onCardClick(): void {
    if (!this.card.matched && !this.card.flipped) {
      this.cardClick.emit();
    }
  }
}