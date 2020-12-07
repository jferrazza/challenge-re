import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../Game';
import { Staff } from '../staff';
import { SharedService } from '../shared.service';
import { Total } from '../total';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  service: SharedService;
  constructor(private shared: SharedService, private router: Router) {
    this.service = this.shared;
    if (this.service.staffRef == undefined)
    {
      console.error("Login not specified. Quitting!")
      this.router.navigate(['/']);
    }
        else
      this.refreshGames();

  }
  CoffeeList: any = [];
  CoffeeListF: any = [];
  CoffeeListP: any = [];
  TotalList: any = [];
  today: Date = new Date();

  ngOnInit(): void {

  }
  deleteGame(id) {
    if (confirm("Are you sure you want to forfeit this date?")) {
      this.service.DeleteGame(id);
      setTimeout(() => {
        this.refreshGames();
      }, 100);
    }
  }
  payGame(id) {
    console.log(id);
    this.service.GameRef = id;
    this.router.navigate(['/pay']);
  }

  refreshGames() {
    let s = this.service.GetGames();

    console.log("Getting list...");

    s.snapshotChanges().subscribe(data => { 
      this.CoffeeList = [];
      this.CoffeeListF = [];
      this.CoffeeListP = [];
      this.TotalList = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CoffeeList.push(a as Game);
      })
      console.log("List received...");
      this.refreshFilters();
    });

    for (let i = 0; i < this.service.members.length; i++) {
      this.TotalList.push({
        member: this.service.members[i],
        amount: 0,
        count: 0
      });
    }


  }
  refreshFilters() {
    console.log("Now filtering list...");
    for (let i = 0; i < this.CoffeeList.length; i++) {
      let ii = this.CoffeeList[i];
      //https://stackoverflow.com/questions/5619202/converting-a-string-to-a-date-in-javascript
      let d = this.service.ToDate(ii);


      let isfuture = d >= this.today;
      if (isfuture) {
        this.CoffeeListF.push(ii);
      }
      else {
        this.CoffeeListP.push(ii);
      }
      if (ii.paidby != null) {
        for (let m = 0; m < this.TotalList.length; m++) {
          let mm = this.TotalList[m];
          if (mm.member.$key == this.service.GetUser2(ii.paidby).$key) {
            mm.amount += ii.amount;
            mm.count += 1;
          }
        }
      }
    }
    console.log("Done filtering out results.");

  }
}
