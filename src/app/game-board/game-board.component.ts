import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { GameService, Card } from '../game.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [NgIf, NgFor, CardComponent],
  template: `
    <div class="game-board">
      @for (card of cards(); track card.id) {
        <app-card 
          [card]="card" 
          (cardClick)="onCardClick(card)"
        ></app-card>
      }
    </div>
    @if (isGameEnded()) {
      <div class="game-over">
        <h2>Congratulations!</h2>
        <p>You completed the game in {{ moves() }} moves and {{ elapsedTime() }} seconds.</p>
        <button (click)="restartGame()">Play Again</button>
      </div>
    }
  `,
  styles: [`
    .game-board {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      max-width: 600px;
      margin: 0 auto;
    }
    .game-over {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      text-align: center;
    }
  `]
})
export class GameBoardComponent {
  private gameService = inject(GameService);
  cards = this.gameService.cards;
  isGameEnded = this.gameService.isGameEnded;
  moves = this.gameService.moves;
  elapsedTime = this.gameService.elapsedTime;

  onCardClick(card: Card): void {
    this.gameService.flipCard(card);
  }

  restartGame(): void {
    this.gameService.restartGame();
  }
}