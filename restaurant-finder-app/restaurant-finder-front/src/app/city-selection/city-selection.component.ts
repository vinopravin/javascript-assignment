import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_services/location.service';

@Component({
	selector: 'app-city-selection',
	templateUrl: './city-selection.component.html',
	styleUrls: ['./city-selection.component.css']
})
export class CitySelectionComponent implements OnInit {
	cities = []
	constructor(private locationService: LocationService) { }

	ngOnInit(): void {
		this.locationService.getLocations().then((cities) => {
			this.cities = cities;
		})
	}

}
