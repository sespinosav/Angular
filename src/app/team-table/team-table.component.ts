import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Country } from 'src/environments/country';
import { SquadNumber } from 'src/environments/squadNumber';
import { Player } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { TeamService, TeamTableHeaders } from '../services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  public tableHeaders = TeamTableHeaders;
  public teams$: Observable<Team[]>
  constructor(private teamService: TeamService) {
    this.teams$ = this.teamService.getTeams() as Observable<Team[]>;
  }

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams() as Observable<Team[]>;

    const player: Player = {
      name: 'Santiago',
      lastName: 'Espinosa',
      position: SquadNumber.rightMidFielder,
      weight: 68,
      height: 1.66,
      nationality: Country.Colombia,
      leftFooted: false
    }

    const newPlayers: Player[] = [player];
    this.teamService.getTeams().pipe(take(1)).subscribe(teams => {
      if (teams.length === 0) {
        const team: Team = {
          name: 'Atletico Naciona',
          country: Country.Colombia,
          players: newPlayers,
        };
        this.teamService.addTeam(team);
      }
    })
  }

}
