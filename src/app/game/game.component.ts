import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from '../game-board/game-board.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, GameBoardComponent, ScoreboardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

}
