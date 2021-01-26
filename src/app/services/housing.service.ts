import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Property } from '../models/property';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  sellRentTotal = new BehaviorSubject<any[]>(null)
  sellRentTotal$ = this.sellRentTotal.asObservable()
  total: any[]

  constructor(private http: HttpClient) { }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }

  getAllProperties(SellRent?: number) {
    return this.http.get('/assets/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<any> = []
        const localProperties = JSON.parse(localStorage.getItem('newProp'));

        if (localProperties) {
          for (const id in localProperties) {
            if (SellRent) {
              if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
                propertiesArray.push(localProperties[id]);                
              }
            } else {
              propertiesArray.push(localProperties[id]);              
            }
            
          }
        }

        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id])              
            }
          } else {
            propertiesArray.push(data[id])            
          }
        }
        return propertiesArray
      })
    )
  }

  getSellRentProperties() {
    this.http.get('/assets/properties.json').pipe(
      map(data => {
        const allPropertiesArray: Array<any> = []
        const localProperties = JSON.parse(localStorage.getItem('newProp'));

        if (localProperties) {
          for (const id in localProperties) {
            allPropertiesArray.push(localProperties[id]);
          }
        }

        for (const id in data) {
          allPropertiesArray.push(data[id])
        }
        return allPropertiesArray
      })
    ).subscribe(allProperties => this.sellRentTotal.next(allProperties))
  }

  addProperty(property: Property) {
    let newProp = [property];

    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
    this.getSellRentProperties();
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
