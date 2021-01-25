import { Injectable } from '@angular/core';
import { UserI } from '../models/user-i';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: UserI) {
    let users = []
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users')) //Converts [JSON-Obj] to [JS-Obj]
      users = [user, ...users]
    } else {
      users = [user]
    }
    localStorage.setItem('Users', JSON.stringify(users))  //Converts [JS-Obj] to [JSON-Obj]
  }
}
