import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { PropertyDetailResolverService } from './services/property-detail-resolver.service';

const routes: Routes = [
  {path: '', component: PropertyListComponent},
  {path: 'properties/my', component: MyPropertiesComponent},
  {path: 'properties/:type', component: PropertyListComponent},
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'property-detail/:id', component: PropertyDetailComponent 
        /*  resolve: {prp: PropertyDetailResolverService} */
        },
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: PropertyListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
