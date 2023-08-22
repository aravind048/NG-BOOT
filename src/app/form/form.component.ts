import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service'; // Update the path to your location service
import {MatGridListModule} from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  showFilterIcon: boolean; // Add this property

}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  gstNumber: string = ''; // Holds the GST No.
  panNumber: string = ''; // Holds the PAN No.
  codeValue: string = ''; // Holds the Code
  addressValue: string = ''; // Holds the PAN No.
  nameValue: string = '';
  pincodeValue: string = ''; // Holds the PIN Code
  mobileValue: string = ''; // Holds the PIN Code
  emailValue: string = ''; // Holds the PIN Code
  latitudeValue: string = ''; // Holds the PIN Code
  longitudeValue: string = ''; // Holds the PIN Code
  departmentValue: string = ''; // Holds the PIN Code
  designationValue: string = ''; // Holds the PIN Code
  
  
  countryList: string[] = [];
  stateList: string[] = [];
  cityList: string[] = [];
  currencyList: string[] = [];
  selectedCountry: string = '';
  selectedState: string = '';
  selectedCity: string = '';
  selectedCurrency: string = '';

  tiles: Tile[] = [
    { text: '', cols: 19, rows: 1, color: '#F2F4F4', showFilterIcon: false },
    { text: '', cols: 1, rows: 1, color: 'white', showFilterIcon: false },
    { text: 'No Rows To Show', cols: 19, rows: 3, color: 'white', showFilterIcon: false },
    { text: '', cols: 1, rows: 2, color: 'white', showFilterIcon: true },
    { text: '', cols: 1, rows: 1, color: 'white', showFilterIcon: false },
  ];

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.fetchCountryList();
  }

  fetchCountryList() {
    this.locationService.getCountries().subscribe((countries: string[]) => {
      this.countryList = countries;
    });
  }

  onCountryChange() {
    this.selectedState = ''; // Clear selected state when country changes
    this.selectedCity = ''; // Clear selected city when country changes

    if (this.selectedCountry) {
      this.fetchStateList(this.selectedCountry);
    } else {
      this.stateList = [];
      this.cityList = [];
    }
  }

  fetchStateList(countryId: string) {
    this.locationService.getStates(countryId).subscribe((states: string[]) => {
      this.stateList = states;
    });
  }

  onStateChange() {
    this.selectedCity = ''; // Clear selected city when state changes

    if (this.selectedState) {
      this.fetchCityList(this.selectedState);
    } else {
      this.cityList = [];
    }
  }

  fetchCityList(stateId: string) {
    this.locationService.getCities(stateId).subscribe((cities: string[]) => {
      this.cityList = cities;
    });
  }
}
