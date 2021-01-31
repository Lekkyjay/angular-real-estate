import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent implements OnInit {

  properties: any
  SellRent = 1;
  Today = new Date()
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';
  propertySubscription: Subscription  

  constructor(private afa: AngularFireAuth, private housingService: HousingService) { }

  ngOnInit(): void {
    this.propertySubscription = this.afa.authState.pipe(
      switchMap(user => {
        let id = user.uid
        return this.housingService.getMyProperties(id).valueChanges()
      }))
      .subscribe(properties => {
        this.properties = properties
      })       
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

  ngOnDestroy() {
    this.propertySubscription.unsubscribe();
  }

}
