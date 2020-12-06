import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from '../game';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-shout',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  addForm;
  warn: string = "";
  user: string;
  amount: number;
  share: SharedService;
  key: string;
  ngOnInit(): void {

  }
  constructor(private service: SharedService, private formBuilder: FormBuilder, private router: Router) {
    if (this.service.GameRef == undefined) {
      console.error("Game not specified. Quitting!")
      this.router.navigate(['/home']);
    }
    this.addForm = this.formBuilder.group({
      $key: this.service.GameRef.$key,
      date: this.service.GameRef.date,
      time: this.service.GameRef.time,
      venue: this.service.GameRef.venue,
      court: this.service.GameRef.court,
      name: this.service.GameRef.name,
      paidby: null,
      amount: null
    })
    this.share = this.service;
  }

  onSubmit(data) {
    if (this.user == null || data.amount == null) {
      this.warn = "Please enter all fields.";
    }
    console.log(data);
    this.service.UpdateGame(this.service.GameRef.$key, data as Game);
    this.router.navigate(['/home']);
  }
}
