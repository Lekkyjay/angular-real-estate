import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { UserI } from 'src/app/models/user-i';
import { AuthService } from 'src/app/services/auth.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  properties: any
  user: UserI
  imgUrl: string = '/assets/images/user-icon.png'

  constructor(private afa: AngularFireAuth, private authService: AuthService, private housingService: HousingService) { }

  ngOnInit(): void {
    this.authService.appUser$.subscribe(appUser => this.user = appUser)

    this.afa.authState.pipe(
      switchMap(user => {
        let id = user.uid
        return this.housingService.getMyProperties(id).valueChanges()
      }))
      .subscribe(properties => this.properties = properties) 
  }

}
