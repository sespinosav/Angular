import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { TeamTableComponent } from './team-table/team-table.component';
import { PlayerService } from './services/player.service';
import { TeamService } from './services/team.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerTableComponent } from './player-table/player-table.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamTableComponent,
    PlayerTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    CommonModule,
    FormsModule
  ],
  providers: [TeamService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
