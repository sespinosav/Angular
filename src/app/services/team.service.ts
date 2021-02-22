import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Team } from '../interfaces/team';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const TeamTableHeaders = ['Name', 'Country', 'Players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsDB: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamsDB = this.db.list('/teams', ref => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]> {
    return this.teamsDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }) as Team);
      })
    );
  }
  addTeam(team: Team) {
    return this.teamsDB.push(team);
  }

  deleteTeam(id: string) {
    this.db.list('/teams').remove(id);
  }

  editTeam(newPlayerData: Team) {
    const $key: string = newPlayerData.$key as string;
    delete newPlayerData.$key;
    this.db.list('/teams').update($key, newPlayerData);
  }
}