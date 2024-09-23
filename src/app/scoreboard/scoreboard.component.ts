import { Component, computed, inject } from '@angular/core';
import { GameService } from '../game.service';
import { interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent {
  private gameService = inject(GameService);

  playerName = this.gameService.playerName;
  moves = this.gameService.moves;
  matchedPairs = computed(() => this.gameService.matchedPairs());
  totalPairs = computed(() => this.gameService.cards().length / 2);
  elapsedTime = this.gameService.elapsedTime;

  constructor() {
    this.startTimer();
  }

  private startTimer(): void {
    interval(1000)
      .pipe(takeUntil(this.gameService.gameOver))
      .subscribe(() => {
        this.gameService.incrementTime();
      });
  }
}