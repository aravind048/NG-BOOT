import { Component } from '@angular/core';
import { LocationService } from 'src/app/services/location.service'; // Update the path to your location service

export interface Element {
  action: string;
  client: string;
  code: number;
  name: string;
  address: string;
  country: string;
  state: string;
  city: string;
  mobilenos: number;
  email: string;
  gstnos: string;
  pannos: string;
  latitude: number;
  longitude: number;
  contactperson: string;
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  showFilterIcon: boolean;
  isActionTile: boolean;
}

const ELEMENT_DATA: Element[] = [];

interface ApiResponse {
  data: Element[]; // Define the structure of the API response
}

@Component({
  selector: 'app-navbar',
  styleUrls: ['navbar.component.scss'],
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  tableHeadings: any[] = ['action', 'client', 'code', 'name', 'address', 'country', 'state', 'city', 'mobilenos', 'email', 'gstnos', 'pannos', 'latitude', 'longitude', 'contactperson'];
  dataSource: Element[] = []; // Initialize the dataSource with an empty array
  data: Element[] = []; // Initialize the data array

  
  constructor(private _location: LocationService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._location.getData().subscribe((response: ApiResponse) => {
      console.log(",,,,,,",response); // Check the response data in the console

      this.data = response.data; // Assign the fetched data to the 'data' array
    });
  }

  tiles: Tile[] = [
    { text: '', cols: 19, rows: 1, color: 'red', showFilterIcon: true, isActionTile: true },
    { text: '', cols: 1, rows: 1, color: 'blue', showFilterIcon: false, isActionTile: false },
    { text: 'No Rows To Show', cols: 19, rows: 3, color: 'green', showFilterIcon: false, isActionTile: false },
    { text: '', cols: 1, rows: 2, color: 'yellow', showFilterIcon: true, isActionTile: false },
    { text: '', cols: 1, rows: 1, color: 'pink', showFilterIcon: false, isActionTile: false },
  ];
}
