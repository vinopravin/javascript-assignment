import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { async } from '@angular/core/testing';

@Injectable({
	providedIn: 'root'
})
export class RestaurantService {
	BASE_URL = environment.SERVER_URL + 'api/restaurants';
	restaurantList = [];
	selectedRestaurant: any;

	constructor(private http: HttpClient) { }

	getRestaurants(): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.get(this.BASE_URL).subscribe(
				(result) => {
					console.log('resule --------------',result)
					this.restaurantList = result['data']
					resolve(result['data']);
				},
				(err) => reject(err)
			)
		})
	}

	getRestaurantsOfLocation(location): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.get(this.BASE_URL + '/city/' + location).subscribe(
				(result) => {
					this.restaurantList = result['data']
					resolve(result['data']);
				},
				(err) => reject(err)
			)
		})
	}

	getRestaurant(restaurantId): Promise<any> {
		return new Promise(async (resolve, reject) => {
			if(this.restaurantList && this.restaurantList.length > 0) {
				console.log('here 1')
				this.selectedRestaurant = this.restaurantList.filter((restaurant) => {
					if (restaurant._id == restaurantId) {
						return restaurant
					}
				})[0]
			} else {
				await this.getRestaurants().then((result)=>{
					this.selectedRestaurant = this.restaurantList.filter((restaurant) => {
						if (restaurant._id == restaurantId) {
							return restaurant
						}
					})[0]
				})
			}
			resolve(this.selectedRestaurant)
		})
	}

	updateRestaurant(restaurantDetail): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.put(this.BASE_URL, restaurantDetail).subscribe(
				(result: any) => {
					this.getRestaurants();
					resolve(result)
				},
				(err) => {
					reject(err)
				}
			)
		})
	}

	removeRestaurant(restaurantdetail): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.http.delete(this.BASE_URL + '/' + restaurantdetail._id).subscribe(
				(result) => {
					this.getRestaurants();
					resolve(result);
				},
				(err) => {
					reject(err)
				})
		})
	}
}
