import { Injectable } from '@angular/core';
import { Staff } from './staff';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  staffRef:Staff;
  GameRef:Game;
  members:Staff[];

  ToDate(i){
    let parts = i.date.split('-');
    let d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d;
  }
  constructor(private db: AngularFireDatabase) {}
  uList: AngularFireList<any>;
  uRef: AngularFireObject<any>; 

  AddUser(member: Staff){
    this.uList = this.db.list('staff-list');
    this.uList.push({
      name: member.name,
      email: member.email,
      role: member.role,
      password: member.password,
    });
  }
  GetUser(id: string) {
    this.uRef = this.db.object('staff-list/' + id);
    return this.uRef;
  }
  GetUser2(id: string): Staff{ // get local user
    for (let i = 0; i < this.members.length; i++){
      if (this.members[i].$key == id) return this.members[i];
    }
    return undefined;
  }
  GetUsers() {
    this.uList = this.db.list('staff-list');
    return this.uList;
  }  


  AddGame(game: Game){
    this.uList = this.db.list('game-list');
    this.uList.push({
      name: game.name,
      venue: game.venue,
      court: game.court,
      date: game.date,
      time: game.time
    });
  }
  GetGame(id: string) {
    this.uRef = this.db.object('game-list/' + id);
    return this.uRef;
  }
  DeleteGame(id: string) {
    this.db.object('game-list/' + id).remove();
  }
  GetGames() {
    this.uList = this.db.list('game-list');
    return this.uList;
  }  
  UpdateGame(id:string, game: Game){
    this.uRef = this.db.object('game-list/'+id);
    this.uRef.update({
      name: game.name,
      venue: game.venue,
      court: game.court,
      date: game.date,
      time: game.time,
      paidby: game.paidby,
      amount: game.amount
    });
  }
}
