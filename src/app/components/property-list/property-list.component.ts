import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {

  properties: any
  SellRent = 1;
  Today = new Date()
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';
  propertySubscription: Subscription  

  private filteredProperties = new BehaviorSubject<Property[]>([])      //sender
  filteredProperties$ = this.filteredProperties.asObservable()          //receiver
  
  constructor(
    private route: ActivatedRoute, 
    private housingService: HousingService) { }

  ngOnInit(): void {
    this.propertySubscription = this.route.paramMap.pipe(
      switchMap(params => {
        let type = params.get('type')
        return this.housingService.getProperties(type).snapshotChanges().pipe(
          map(properties => 
            properties.map(property => (
              { Id: property.payload.doc.id, ...property.payload.doc.data() }
            ))
          )
        )
      })
    ).subscribe(properties => {
      this.properties = properties
      this.filteredProperties.next(properties)
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
