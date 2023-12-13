import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { SearchComponent } from './search/search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryResolver } from '../country.resolver';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
  },
  {
    path: ':id',
    component: CountryDetailComponent,
    resolve: { country: CountryResolver },
  },
];

@NgModule({
  declarations: [
    CountriesComponent,
    CountryComponent,
    CountryDetailComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CountriesModule {}
