import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  total: any[]
  userId: string

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth,) { 
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
      case "mysell": { 
        return this.afs.collection<Property>('properties', ref => 
        ref.where('SellRent', '==', 1).where('userId', '==', this.userId))
         break; 
      } 
      case "myrent": { 
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
}
