import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { Property } from '../models/property';
import { HousingService } from './housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

  constructor(private router: Router,  private housingService: HousingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Property>|Property {
    const propId = route.params['id'];

    //returns an Observable of Property or redirects to home if there was any error from API
    return this.housingService.getProperty(propId).pipe(  
      take(1),    //takes 1 response then completes the observable from angularFire
      catchError(error => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
