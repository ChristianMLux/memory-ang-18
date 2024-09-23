import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../game.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private gameService = inject(GameService);

  playerForm = this.fb.group({
    playerName: ['', [Validators.required, Validators.minLength(2)]]
  });

  onSubmit() {
    if (this.playerForm.valid) {
      const playerName = this.playerForm.get('playerName')?.value;
      this.gameService.setPlayerName(playerName as string);
      this.router.navigate(['/play']);
    }
  }
}