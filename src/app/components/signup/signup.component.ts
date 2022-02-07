import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signup = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: [''],
    });
  }

  signUpData() {
    this._http
      .post<any>('http://localhost:4001/users', this.signup.value)
      .subscribe(
        (res) => {
          alert('Sign Up Succesfully');
          this.signup.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('error');
        }
      );
  }
}
