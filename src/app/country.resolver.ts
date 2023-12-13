import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CountriesService } from './countries/countries.service';
import { Observable } from 'rxjs';
import { Country } from './countries/Country';

export const CountryResolver: ResolveFn<Observable<Country>> = (
  route,
  state
) => {
  const countryService = inject(CountriesService);
  console.log(route);
  console.log(state);
  return countryService.getCountryByCountryCode(route.params['id']);
};
