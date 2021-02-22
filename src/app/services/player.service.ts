import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Player } from '../interfaces/player';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersDB: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDB = this.db.list('/teams', ref => ref.orderByChild('name'))
  }

  getPlayers(): Observable<Player[]> {
    return this.playersDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }) as Player)
      })
    );
  }

  addPlayer(player: Player){
    return this.playersDB.push(player);
  }

  deletePlayer(id: string){
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayerData: Player){
    const $key: string = newPlayerData.$key as string;
    delete(newPlayerData.$key);
    this.db.list('/players').update($key, newPlayerData)
  }
}
