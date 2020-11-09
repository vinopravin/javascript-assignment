import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/_services/helper.service';
import { LocationService } from 'src/app/_services/location.service';

@Component({
	selector: 'app-locations',
	templateUrl: './locations.component.html',
	styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
	@ViewChild('myModal') myModal: ElementRef;
	@ViewChild('removeModal') removeModal: ElementRef;
	@ViewChild('closeBtn1') closeBtn1: ElementRef;
	@ViewChild('closeBtn2') closeBtn2: ElementRef;

	state: string;
	selectedCity: any = {
		name: '',
		state: ''
	};
	citiesList = []
	locationsList = []
	statesList = []
	selectedAction = ''
	selectedLocationId: string = '';
	constructor(private location: Location,
		public locationService: LocationService,
		public helperService: HelperService) { }

	ngOnInit(): void {
		this.locationService.getLocations().then((locations) => {
			this.locationsList = this.locationService.locationsList;
		});
		this.helperService.getStates().then((states) => {
			this.statesList = this.helperService.statesList;
		})
	}

	openModal(option, locationDetails: any = {}) {
		if (option === 'remove') {
			this.selectedAction = 'Remove';
			this.selectedCity = locationDetails
			this.removeModal.nativeElement.style.display = 'block';
		} else {
			this.myModal.nativeElement.style.display = 'block';
			if (option == 'add') {
				this.selectedAction = 'Add';
				this.state = '';
				this.selectedLocationId = undefined;
				this.selectedCity = {
					_id: undefined,
					name: '',
					state: ''
				};
			} else if (option === 'update') {
				this.selectedAction = 'Update';
				this.state = locationDetails.state;
				this.selectedLocationId = locationDetails._id;
				this.getCities(this.state).then((result) => {
					this.selectedCity = this.citiesList.filter((city) => city.name = locationDetails.name)[0]
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
		this.selectedCity.state = this.state
	}


	addLocation() {
		this.locationService.updateLocation({ _id: this.selectedLocationId, name: this.selectedCity.name, state: this.state })
			.then(() => {
				this.closeModal('')
			})
	}

	removeLocation() {
		this.locationService.removeLocation(this.selectedCity)
			.then(() => {
				this.closeModal('remove')
			})
	}

	goBack() {
		this.location.back()
	}

}
