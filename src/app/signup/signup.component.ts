import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signInForm;
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedService) {
    this.signInForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      password2: '',
      role: '',
      warn: ''
    })
  }
  getData: any[];

  ngOnInit(): void {

  }
  onSubmit(data) {
    console.log(data);
    
    if (data.password != data.password2) {
      alert("You password does not match.");
      return;
    }
    if (data.name == "" || data.email == "" || data.password == ""){
      alert("Please fill out all the fields.");
      return;
    }
    this.service.AddUser(data);
    this.router.navigate(['/']);
    

  }

}
