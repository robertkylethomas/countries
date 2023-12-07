import { tap } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable, of, map, mergeMap, distinct, toArray, mergeAll } from 'rxjs';
import { Country } from '../Country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {


  constructor(private countriesService: CountriesService){}

  countries$:Observable<Country[]> = of([]);
  filteredCountries$: Observable<Country[]> = this.countries$;

  ngOnInit(): void {
      this.countries$ = this.countriesService.getAllCountries();
      console.log('these are teh regions')

  }

  getFilteredCountries(event: string){

    this.filteredCountries$ = this.countries$.pipe(
      map((countries: Country[]) => {
        return countries.filter((country: Country) => country.name.common.toLowerCase().includes(event))
      }),

    )
  }

  filterByRegion(event: any){
    console.log(event)

    this.filteredCountries$ = this.countries$.pipe(
      map((countries: Country[]) => countries.filter((country: Country) => country.region.toLowerCase() === event.toLowerCase())),
      tap(res => console.log(res))
    )
  }

}
