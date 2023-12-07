import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, debounceTime, startWith } from 'rxjs/operators'
@Component({
  selector: 'app-search',

  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  search: FormControl = new FormControl();
  select: FormControl = new FormControl();

  @Output() changeSearchText: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeSearchRegion: EventEmitter<string> = new EventEmitter<string>();


  ngOnInit(){
    this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      tap(res => this.changeSearchText.emit(res))
    ).subscribe();


    this.select.valueChanges.pipe(
      startWith(''),
      tap(res => this.changeSearchRegion.emit(res)),
    ).subscribe();
  }

}
