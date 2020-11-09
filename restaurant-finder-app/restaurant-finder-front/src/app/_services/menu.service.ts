import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	BASE_URL = environment.SERVER_URL + 'api/menu';
	menuList = [];

	constructor(private http: HttpClient) { }

	getMenu(restaurantId): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.get(`${this.BASE_URL}/restaurant/${restaurantId}`).subscribe(
				(result) => {
					this.menuList = result['data']
					resolve(result['data'])
				},
				(err) => {
					reject(err);
				}
			)
		})
	}

	updateMenu(itemDetails): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.put(this.BASE_URL, itemDetails).subscribe(
				(result) => {
					this.getMenu(itemDetails.restaurant_id);
					resolve(result)
				},
				(err) => {
					reject(err)
				}
			)
		})
	}

	removeMenu(itemDetail): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.delete(this.BASE_URL + '/' + itemDetail._id).subscribe(
				(result) => {
					this.getMenu(itemDetail.restaurant_id);
					resolve(result)
				},
				(err) => {
					reject(err)
				}
			)
		})
	}
}
