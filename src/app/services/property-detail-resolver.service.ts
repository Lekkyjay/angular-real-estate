import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from '../models/property';
import { HousingService } from './housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

  constructor(private router: Router,  private housingService: HousingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Property>|Property {
    const propId = route.params['id'];
    return this.housingService.getProperty(+propId).pipe(   //It returns here an Observable of Property if there was no error from API
      catchError(error => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
