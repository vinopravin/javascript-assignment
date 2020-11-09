import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
	selector: 'app-restaurant-list',
	templateUrl: './restaurant-list.component.html',
	styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
	restaurantList = [];
	selectedLocation: string = '';
	p: number = 1;
	filter = "";
	key: string = 'name';
	reverse: boolean = false;
	hasRestaurants: boolean = true;
	sort(key) {
		this.key = key;
		this.reverse = !this.reverse;
	}
	constructor(private route: ActivatedRoute, 
		private restaurantService: RestaurantService, 
		private location: Location) { }

	ngOnInit(): void {
		this.route.queryParamMap
			.subscribe((params) => {
				let orderObj = { ...params.keys, ...params };
				this.selectedLocation = orderObj['params'].city
				this.restaurantService.getRestaurantsOfLocation(this.selectedLocation).then((result) => {
					this.restaurantList = result;
					if (!this.restaurantList.length) {
						this.hasRestaurants = false;
					}
				})
			})
	}

	goBack() {
		this.location.back();
	}

}
