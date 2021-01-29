import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserI } from '../models/user-i';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  clientUser: any
  user$: Observable<firebase.User>  

  constructor(
    private notifyService: NotificationsService, 
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { 
      this.user$ = this.afa.authState;
    }

  login( email: string, password: string) {
    this.afa.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.notifyService.error('Error', error)
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/']);
        }
      })
  }

  createUser(user) {
    this.afa.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.clientUser = user;    //this makes user data accessible outside this method
    
        //this piece of code does not work. updateProfile() not working
        // userCredential.user.updateProfile( {
        //   displayName: user.userName
        // });
        
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/login']);
          });
      })
      .catch( error => {
        this.notifyService.error('Error', error)
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`clients/${userCredential.user.uid}`).set({
      // displayName: userCredential.user.displayName,
      email: this.clientUser.email,
      userName: this.clientUser.userName,
      mobile: this.clientUser.mobile
    })
  }

  logout() {
    return this.afa.signOut();
  }


  //switchMap switches from Observable<firebase.User> to Observable<AppUser>
  get appUser$(): Observable<UserI> {
    return this.user$
    .pipe(
      switchMap(user => {
        if (user) return this.afs.doc(`clients/${user.uid}`).valueChanges();
        return of(null);
      })    
    )
  }







  authUser(user: any) {
    let UserArray = [];
    if (localStorage.getItem('Users')) {
      UserArray = JSON.parse(localStorage.getItem('Users'));
    }
    return UserArray.find(p => p.userName === user.userName && p.password === user.password);
  }

  onSuccess(msg) {
    this.notifyService.success('Success', msg)
  }

  onError(msg) {
    this.notifyService.error('Error', msg)
  }
  
}
