import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/_services/helper.service';
import { RestaurantService } from 'src/app/_services/restaurant.service';

@Component({
	selector: 'app-restaurant-list',
	templateUrl: './restaurant-list.component.html',
	styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
	@ViewChild('myModal') myModal: ElementRef;
	@ViewChild('removeModal') removeModal: ElementRef;
	@ViewChild('closeBtn1') closeBtn1: ElementRef;
	@ViewChild('closeBtn2') closeBtn2: ElementRef;

	state: string;
	selectedCity: any = {
		name: '',
		state: ''
	};
	restaurantDetails = {
		name: '',
		address: {
			street_name: '',
			locality: '',
			city: '',
			state: '',
			country: 'India'
		},
		cuisines: []
	}
	citiesList = []
	restaurantsList = []
	statesList = []
	selectedAction = ''
	selectedRestaurantId: string = '';
	constructor(private location: Location,
		public restaurantService: RestaurantService,
		public helperService: HelperService) { }

	ngOnInit(): void {
		this.restaurantService.getRestaurants().then((locations) => {
			this.restaurantsList = this.restaurantService.restaurantList;
		});
		this.helperService.getStates().then((states) => {
			this.statesList = this.helperService.statesList;
		})
	}

	openModal(option, restaurantDetails: any = {}) {
		if (option === 'remove') {
			this.selectedAction = 'Remove';
			this.restaurantDetails = restaurantDetails
			this.removeModal.nativeElement.style.display = 'block';
		} else {
			this.myModal.nativeElement.style.display = 'block';
			if (option == 'add') {
				this.selectedAction = 'Add';
				this.state = '';
				this.restaurantDetails = {
					name: '',
					address: {
						street_name: '',
						locality: '',
						city: '',
						state: '',
						country: 'India'
					},
					cuisines: []
				}
				this.selectedCity = {
					_id: undefined,
					name: '',
					state: ''
				};
			} else if (option === 'update') {
				this.restaurantDetails = restaurantDetails
				this.selectedAction = 'Update';
				this.state = restaurantDetails.address.state;
				this.getCities(this.state).then((result) => {
					this.selectedCity = this.citiesList.filter((city) => city.name = restaurantDetails.address.city)[0]
				})
			}
		}
	}

	closeModal(option) {
		if (option === 'remove') {
			this.removeModal.nativeElement.style.display = 'none';
		} else {
			this.myModal.nativeElement.style.display = 'none';
		}
	}

	getCities(selectedState): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.helperService.getCities(selectedState).then((result) => {
				this.citiesList = JSON.parse(JSON.stringify(this.helperService.selectedStateCityList));
				resolve('success')
			})
		})
	}

	selectCity(selectedCity) {
		this.selectedCity = selectedCity
		this.restaurantDetails.address.city = selectedCity.name
	}


	addLocation() {
		let temp = String(this.restaurantDetails.cuisines);
		let splitedCuisines = temp.length ? temp.split(",") : []
		this.restaurantDetails.cuisines = splitedCuisines.length ? splitedCuisines : []
		this.restaurantService.updateRestaurant(this.restaurantDetails)
			.then(() => {
				this.closeModal('')
			})
	}

	removeLocation() {
		this.restaurantService.removeRestaurant(this.restaurantDetails)
			.then(() => {
				this.closeModal('remove')
			})
	}

	goBack() {
		this.location.back()
	}
}
