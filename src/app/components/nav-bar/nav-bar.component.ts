import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser: string;
  sellNum: number
  rentNum: number

  constructor(private authService: AuthService, private hService: HousingService) { }

  ngOnInit(): void {
    this.hService.getSellRentProperties()   //Initial trigger for behaviorSubject
    this.hService.sellRentTotal$.subscribe(properties => {
      if (properties) {
        this.sellNum = properties.filter(p => p.SellRent === 1).length
        this.rentNum = properties.filter(p => p.SellRent === 2).length
      }
    })
  }

  loggedin() {
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
    console.log(this.loggedinUser)
  }

  onLogout() {
    localStorage.removeItem('token');
    this.authService.onSuccess("You are logged out !");
  }

}
