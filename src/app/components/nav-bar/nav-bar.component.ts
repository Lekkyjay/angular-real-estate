import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Event, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserI } from 'src/app/models/user-i';
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
  all: number
  mySell: number
  myRent: number
  myAll: number
  myProps: boolean
  user: UserI
  properties: any
  testProperties: any

  constructor(
    private router: Router,
    private afa: AngularFireAuth, 
    private authService: AuthService, 
    private housingService: HousingService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event:Event) => {
      if(event instanceof NavigationEnd ){
        // console.log('event:', event.url);
        (event.url === '/properties/mysell' || 
        event.url === '/properties/myrent' ||
        event.url === '/properties/my') ? this.myProps = true : this.myProps = false
      }
    });

    this.housingService.getAllProperties().valueChanges().subscribe(properties => {
      this.all = properties?.length
      this.sellNum = properties?.filter(p => p.SellRent === 1).length
      this.rentNum = properties?.filter(p => p.SellRent === 2).length
    })

    this.authService.appUser$.subscribe(appUser => this.user = appUser)

    this.afa.authState.pipe(
      switchMap(user => {
        let id = user.uid
        return this.housingService.getMyProperties(id).valueChanges()
      }))
      .subscribe(
        properties => {
          this.myAll = properties.length
          this.mySell = properties.filter(p => p.SellRent === 1).length
          this.myRent = properties.filter(p => p.SellRent === 2).length
        }
      )       
  }
}
