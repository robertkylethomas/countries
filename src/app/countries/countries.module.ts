import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

const routes: Routes = [
  {
    path: '', component: CountriesComponent,
  },{
    path: ':id', component: CountryDetailComponent
  }
]

@NgModule({
  declarations: [
    CountriesComponent,
    CountryComponent,
    CountryDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CountriesModule { }
