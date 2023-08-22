import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://68.178.166.216/api/API/BillToPartyMaster';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getStates(countryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/states?countryId=${countryId}`);
  }

  getCities(stateId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cities?stateId=${stateId}`);
  }

  getData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/GetData`, { RowId: 0 });
  }

  saveData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/SaveData`, data);
  }
}
