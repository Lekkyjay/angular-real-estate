import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserI } from 'src/app/models/user-i';
import { AuthService } from 'src/app/services/auth.service';
import { HousingService } from 'src/app/services/housing.service';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser: string;
  sellNum: number
  rentNum: number
  mySell: number
  myRent: number
  myProps: boolean
  user: UserI
  user$: any
  properties$: any
  currentRoute: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private afa: AngularFireAuth, 
    private authService: AuthService, 
    private housingService: HousingService,
    private hService: HousingService) { 
      // this.activatedRoute.url.subscribe(activeUrl =>{
      //   this.url=window.location.pathname;
      // });

      // router.events.pipe(
      //   filter(event => event instanceof NavigationEnd)
      // ).subscribe(event => {
      //     //  this.currentRoute = event.url;          
      //      console.log(event.url);
      //   });
          
        
        



    }

  ngOnInit(): void {
    this.router.events.subscribe((event:Event) => {
      if(event instanceof NavigationEnd ){
        console.log('event:', event.url);
        (event.url === '/properties/msell' || 
        event.url === '/properties/mrent' ||
        event.url === '/properties/my') ? this.myProps = true : this.myProps = false
      }
    });

    // this.hService.getSellRentProperties()   //Initial trigger for behaviorSubject

    // this.hService.sellRentTotal$.subscribe(properties => {
    //   if (properties) {
    //     this.sellNum = properties.filter(p => p.SellRent === 1).length
    //     this.rentNum = properties.filter(p => p.SellRent === 2).length
    //   }
    // })

    // (window.location.href).split('/').includes('my-properties') ? console.log('yes') : console.log('no')

    // console.log('url:', (window.location.href).split('/'))

    // console.log('activatedRoute:', this.activatedRoute.snapshot.url.join(''))

    this.hService.getAllProperties().valueChanges().subscribe(properties => {
      this.sellNum = properties.filter(p => p.SellRent === 1).length
      this.rentNum = properties.filter(p => p.SellRent === 2).length
    })

    this.user$ = this.authService.appUser$

    this.authService.appUser$.subscribe(appUser => this.user = appUser)

    // this.afa.authState.subscribe(user => {
    //   this.properties$ = this.housingService.getMyProperties(user.uid).valueChanges()
    // })

    this.afa.authState.subscribe(user => {
      this.housingService.getMyProperties(user.uid).valueChanges().subscribe(
        properties => {
          this.mySell = properties.filter(p => p.SellRent === 1).length
          this.myRent = properties.filter(p => p.SellRent === 2).length
        }
      )
    })
    
  }
}
