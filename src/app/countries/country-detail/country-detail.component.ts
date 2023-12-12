import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import {
  combineLatestAll,
  map,
  mergeAll,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { Country } from '../Country';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css',
})
export class CountryDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountriesService
  ) {}
  countryCode: string = this.activatedRoute.snapshot.params['id'];

  country$: Observable<Country> = this.countryService.getCountryByCountryCode(
    this.countryCode
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

  ngOnInit(): void {}
}
