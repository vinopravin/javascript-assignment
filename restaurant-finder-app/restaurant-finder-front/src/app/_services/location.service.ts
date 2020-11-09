import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LocationService {
	BASE_URL = environment.SERVER_URL + 'api/locations';

	locationsList = [];
	statesList = [];
	citiesList = [];

	constructor(private http: HttpClient) { }

	getLocations(): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.get(this.BASE_URL).subscribe(
				(result: any) => {
					this.locationsList = result.data;
					resolve(result.data)
				},
				(err) => {
					reject(err)
				}
			)
		})
	}

	updateLocation(locationDetails): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.put(this.BASE_URL, locationDetails).subscribe(
				(result: any) => {
					this.getLocations();
					resolve(result.data)
				},
				(err) => {
					reject(err)
				}
			)
		})
	}

	removeLocation(locationDetails): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.delete(this.BASE_URL + '/' + locationDetails._id).subscribe(
				(result: any) => {
					this.getLocations();
					resolve(result.data)
				},
				(err) => {
					reject(err)
				}
			)
		})
	}
}
