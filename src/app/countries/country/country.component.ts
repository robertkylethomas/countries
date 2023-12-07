import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../Country';

@Component({
  selector: 'app-country',

  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {

  @Input('country') country: Partial<Country> = {};


  ngOnInit(): void {

  }
}
