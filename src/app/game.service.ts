import { Injectable, signal, computed, effect } from '@angular/core';
import { Subject } from 'rxjs';

export interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  cards = signal<Card[]>([]);
  moves = signal(0);
  elapsedTime = signal(0);
  gameOver = new Subject<void>();
  playerName = signal<string>('');
  isGameEnded = signal(false);

  flippedCards = signal<Card[]>([]);
  matchedPairs = computed(() => this.cards().filter(card => card.matched).length / 2);
  canFlipCard = computed(() => this.flippedCards().length < 2 && !this.isGameEnded());
  
  totalPairs = computed(() => this.cards().length / 2);

  constructor() {
    this.initializeGame();

    // Effect to check for game over
    effect(() => {
      if (this.matchedPairs() === this.totalPairs() && !this.isGameEnded()) {
        this.endGame();
      }
    }, { allowSignalWrites: true });
  }

  private initializeGame(): void {
    const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const deck = [...values, ...values]
      .map((value, index) => ({ id: index, value, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    
    this.cards.set(deck);
    this.moves.set(0);
    this.elapsedTime.set(0);
    this.flippedCards.set([]);
    this.isGameEnded.set(false);
  }

  flipCard(card: Card): void {
    if (!this.canFlipCard()) {
      return;
    }

    this.cards.update(cards => 
      cards.map(c => c.id === card.id ? { ...c, flipped: true } : c)
    );

    this.flippedCards.update(flipped => [...flipped, card]);

    if (this.flippedCards().length === 2) {
      this.moves.update(m => m + 1);
      this.checkForMatch();
    }
  }

  private checkForMatch(): void {
    const [card1, card2] = this.flippedCards();
    
    if (card1.value === card2.value) {
      this.cards.update(cards => 
        cards.map(c => (c.id === card1.id || c.id === card2.id) ? { ...c, matched: true } : c)
      );
      this.flippedCards.set([]);
    } else {
      setTimeout(() => {
        this.cards.update(cards => 
          cards.map(c => (c.id === card1.id || c.id === card2.id) ? { ...c, flipped: false } : c)
        );
        this.flippedCards.set([]);
      }, 1000);
    }
  }

  setPlayerName(name: string): void {
    this.playerName.set(name);
  }

  incrementTime(): void {
    if (!this.isGameEnded()) {
      this.elapsedTime.update(time => time + 1);
    }
  }

  private endGame(): void {
    this.isGameEnded.set(true);
    this.gameOver.next();
    console.log('Game Over! Total moves:', this.moves(), 'Time:', this.elapsedTime());
  }

  restartGame(): void {
    this.initializeGame();
  }
}