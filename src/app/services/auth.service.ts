import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private notifyService: NotificationsService) { }

  authUser(user: any) {
    let UserArray = [];
    if (localStorage.getItem('Users')) {
      UserArray = JSON.parse(localStorage.getItem('Users'));
    }
    return UserArray.find(p => p.userName === user.userName && p.password === user.password);
  }

  onSuccess(msg) {
    this.notifyService.success('Success', msg)
  }

  onError(msg) {
    this.notifyService.error('Error', msg)
  }
  
}
