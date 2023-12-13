import { Country } from './../Country';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Data,
  Router,
} from '@angular/router';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import {
  combineLatestAll,
  debounceTime,
  map,
  mergeAll,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';

import { CountriesService } from '../countries.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css',
})
export class CountryDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountriesService,
    private router: Router
  ) {}

  country$: Observable<Country> = this.activatedRoute.data.pipe(
    map((data: Data) => data['country'])
  );

  neighbours$: Observable<Country[]> = this.country$.pipe(
    map((country: Country) => country.borders),
    switchMap((neighbouringCountryCodes: string[]) =>
      neighbouringCountryCodes.map((neighbouringCountryCode: string) =>
        this.countryService.getCountryByCountryCode(neighbouringCountryCode)
      )
    ),
    combineLatestAll()
  );

  betterNeighbours$: Observable<Country[]> = this.country$.pipe(
    map(
      (country: Country) =>
        `${
          environment.productionAPI
        }/alpha?codes=${country.borders.join()}&fields=name,cca3`
    ),
    switchMap((newURL: string) => this.countryService.getNeighbours(newURL))
  );

  changeRoute(code: string) {
    console.log(code);
    this.router.navigate([code]);
  }

  ngOnInit(): void {}
}
