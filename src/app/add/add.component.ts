import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from '../game';
import { SharedService } from '../shared.service';
import { Staff } from '../staff';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private service: SharedService, private formBuilder: FormBuilder, private router: Router) {
    this.addForm = this.formBuilder.group({
      date: null,
      time: null,
      venue: null,
      court: null,
      name: null,
      paidby: null,
      amount: null
    })
  }

  @Input() cof: any;
  date: Date;
  time: Time;
  warn: string = "";
  addForm;

  ngOnInit(): void {
    if (this.service.staffRef == undefined) {
      console.error("Authentication undefined. Quitting!")
      this.router.navigate(['/']);
      return;
    }
    if (this.service.staffRef.role != "Team Manager") {
      console.error("Authorisation returned a negative result! Quitting!")
      this.router.navigate(['/']);
      return;
    }

  }


  onSubmit(data) {
    if (data.time == null || data.date == null) {
      this.warn = "Please enter all fields.";
      return;
    }
    this.addForm.time = data.time;
    this.addForm.date = data.date;
    this.addForm.name = data.name;
    this.addForm.venue = data.venue;
    this.addForm.court = data.court;
    this.service.AddGame(this.addForm as Game);
    this.router.navigate(['/home']);
  }


}