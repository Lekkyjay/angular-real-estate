import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    PropertyCardComponent,
    PropertyDetailComponent,
    PropertyListComponent,
    UserLoginComponent,
    UserRegisterComponent,
    NavBarComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
