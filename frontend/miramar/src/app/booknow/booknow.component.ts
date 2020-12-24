import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { MainstartService } from '../services/mainstart.service';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.scss']
})
export class BooknowComponent implements OnInit {

  myPhone = "phone"
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Chad, CountryISO.Senegal];
  constructor(private startService: MainstartService,
              private title: Title) {
      this.title.setTitle("Miramar - Reservation")
    }

  ngOnInit(): void {
    this.startService.onStarted();
  }
  
  onSubmitBook(form: Form) {
    
  }

}
