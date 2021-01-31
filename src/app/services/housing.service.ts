import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Property } from '../models/property';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  sellRentTotal = new BehaviorSubject<any[]>(null)        //sender
  sellRentTotal$ = this.sellRentTotal.asObservable()      //receiver
  total: any[]
  userId: string

  constructor(private http: HttpClient, private afs: AngularFirestore, private afa: AngularFireAuth,) { 
    this.afa.authState.subscribe(user => this.userId = user.uid)
  }

  createProperty(property: Property, userId: string) {
    let newProperty = Object.assign({}, {userId: userId}, property)
    return this.afs.collection('properties').add(newProperty);
  }

  getAllProperties() {
    return this.afs.collection<Property>('properties')
  }
  
  getProperties(type: string) {
    console.log('I got here:', type)
    switch(type) { 
      case "sell": { 
        return this.afs.collection<Property>('properties', ref => ref.where('SellRent', '==', 1)) 
         break; 
      } 
      case "rent": { 
        return this.afs.collection<Property>('properties', ref => ref.where('SellRent', '==', 2))
         break; 
      } 
      case "msell": { 
        return this.afs.collection<Property>('properties', ref => 
        ref.where('SellRent', '==', 1).where('userId', '==', this.userId))
         break; 
      } 
      case "mrent": { 
        return this.afs.collection<Property>('properties', ref => 
        ref.where('SellRent', '==', 2).where('userId', '==', this.userId))
         break; 
      } 
      case "my": { 
        return this.afs.collection<Property>('properties', ref => ref.where('userId', '==', this.userId))
         break; 
      } 
      default: { 
        return this.afs.collection<Property>('properties')
         break; 
      } 
   } 
  }

  getProperty(id: string) {
    return this.afs.doc(`properties/${id}`).valueChanges()
  }

  getMyProperties(id: string) {
    return this.afs.collection<Property>('properties', ref => ref.where('userId', '==', id))
  }











  //Old code to be deleted at the end of project

  ggetProperty(id: number) {
    return this.getAllPropertiess().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }

  getAllPropertiess(SellRent?: number) {
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
