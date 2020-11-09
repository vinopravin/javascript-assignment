import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HelperService {
	BASE_URL = environment.SERVER_URL + 'api/service';
	statesList = []
	selectedStateCityList = [];
	constructor(private http: HttpClient) { }

	getStates(): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.get(this.BASE_URL + '/states').subscribe(
				(result: any) => {
					this.statesList = result.data;
					resolve(result.data)
				},
				(err) => {
					reject(err)
				}
			)
		})
	}
	
	getCities(state): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.get(this.BASE_URL + '/cities/' + state).subscribe(
				(result: any) => {
					this.selectedStateCityList = result.data
					resolve(result.data)
				},
				(err) => {
					reject(err)
				}
			)
		})
	}
}
