import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from '../Country';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private countryService: CountriesService){}
  countryCode: string = this.activatedRoute.snapshot.params['id'];

  country$: Observable<Country> = this.countryService.getCountryByCountryCode(this.countryCode);
  ngOnInit(): void {

  }

}
