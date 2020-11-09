import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { MenuService } from '../_services/menu.service';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
	selector: 'app-restaurant-details',
	templateUrl: './restaurant-details.component.html',
	styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
	restaurantId: string;
	restaurantDetails: any;
	menuItems: any = [];
	constructor(private route: ActivatedRoute,
		private restaurantService: RestaurantService,
		private menuService: MenuService,
		private location: Location) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: Params) => {
			this.restaurantId = params.params['restaurantId']
		})
		this.restaurantService.getRestaurant(this.restaurantId)
		.then(async (result) => {
			console.log('step 1', result	)
			this.restaurantDetails = await result;
		}).then(async() => {
			console.log('this.restaurant details')
			this.menuService.getMenu(this.restaurantId).then(async(result) => {
				console.log('step 2')
				this.menuItems = await result;
			})
		})
	}

	goBack() {
		this.location.back();
	}
}
