import { Component, Inject, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable, of } from 'rxjs';
import { Country } from '../Country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {


  constructor(private countriesService: CountriesService){}

  countries$:Observable<Country[]> = of([]);

  ngOnInit(): void {
      this.countries$ = this.countriesService.getAllCountries();
  }

}
