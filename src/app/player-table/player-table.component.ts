import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/environments/country';
import { SquadNumber } from 'src/environments/squadNumber';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
  public players$: Observable<Player[]>;
  public hello: string;
  constructor(private playerService: PlayerService) {
    this.hello = "melo";
    this.players$ = this.playerService.getPlayers() as Observable<Player[]>;
  }

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers();
    this.playerService.getPlayers().pipe(take(1)).subscribe(players => {
      if (players.length === 0) {
        const player: Player = {
          name: 'Emmanuel',
          lastName: 'Cartagena',
          position: SquadNumber.stopper,
          weight: 74,
          height: 1.80,
          nationality: Country.Brazil,
          leftFooted: true
        };
        this.playerService.addPlayer(player);
      }
    })
  }
}
