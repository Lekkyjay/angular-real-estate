import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(frm: NgForm) {
    this.authService.login(frm.value.email, frm.value.password);
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value); //returns authenticated user
    if (token) {
      localStorage.setItem('token', token.userName);
      this.authService.onSuccess('Login Successful');
      this.router.navigate(['/']);
    } else {
      this.authService.onError('User id or password is wrong');
    }
  }

}
