import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Staff } from '../staff';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedService) {
    this.signInForm = this.formBuilder.group({
      username: '',
      password: '',
      warn: ''
    })
  }
  members: Staff[];
  ngOnInit(): void {

    let s = this.service.GetUsers();
    this.members = [];
    this.service.members = [];
    s.snapshotChanges().subscribe(data => {
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.members.push(a as Staff);
        this.service.members.push(a as Staff);
      })
    })


  }
  onSubmit(data) {
    for (let i = 0; i < this.members.length; i++) {
      let user = this.members[i];
      if (user.email == data.username && user.password == data.password) {
        this.service.staffRef = user;
        this.router.navigate(['home']);
        return;
      }
    }

    this.signInForm.warn = "Your email or password is incorrect. Try again";

  }
}

