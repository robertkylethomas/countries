import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, shareReplay, take, takeLast } from 'rxjs';
import { Country } from './Country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countries: Observable<Country[]> = this.httpClient.get(
    environment.productionAPI.concat(
      'all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,cca3'
    )
    // environment.productionAPI.concat('all')
  ) as Observable<Country[]>;

  constructor(private httpClient: HttpClient) {}

  getAllCountries() {
    return this.countries.pipe(
      // map((countries: Country[]) => countries.slice(1,11)),
      map((countries: Country[]) =>
        countries.sort((a, b) =>
          ('' + a.name.common).localeCompare(b.name.common)
        )
      ),
      shareReplay(1)
    );
  }

  getCountryByCountryCode(code: string): Observable<Country> {
    return this.httpClient
      .get<Country[]>(environment.productionAPI.concat(`alpha/${code}`))
      .pipe(map((countries: Country[]) => countries[0])) as Observable<Country>;
  }

  getNeighbours(url: string): Observable<Country[]> {
    return this.httpClient.get(url) as Observable<Country[]>;
  }
}
